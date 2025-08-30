const WebSocket = require('ws');
const { format } = require('date-fns');
const fs = require('fs-extra');
const path = require('path');
const axios = require('axios'); // Для получения списка пар

// Конфигурация
const config = {
  depth: '50', // Глубина стакана (10, 50, 100, 200, 500)
  logInterval: 60000, // Интервал записи в файл (в миллисекундах)
  outputDir: './orderbook_logs', // Директория для логов
  maxConnections: 5, // Максимальное количество одновременных WebSocket соединений (лимит Bybit)
};

// Глобальные переменные
const orderbooks = {}; // { symbol: { bids: [], asks: [], lastUpdateId: number } }
const lastLogTimes = {};
let allSymbols = [];

// Создаем директорию для логов
fs.ensureDirSync(config.outputDir);

// Функция для получения списка всех торговых пар
async function getAllSymbols() {
  try {
    const response = await axios.get('https://api.bybit.com/v5/market/instruments-info?category=linear');
    const symbols = response.data.result.list
      .filter(instrument => instrument.status === 'Trading')
      .map(instrument => instrument.symbol);
      console.log(response.data.result.list)
    return symbols;
  } catch (error) {
    console.error('Error fetching symbols:', error);
    return [];
  }
}

// Функция для получения текущей даты и времени
function getFormattedDateTime() {
  return format(new Date(), 'yyyy-MM-dd_HH-mm-ss');
}

// Функция для записи стакана в файл
function logOrderbookToFile(symbol) {
  const timestamp = Date.now();
  const dateTime = getFormattedDateTime();
  const fileName = `orderbook_${symbol}_${dateTime}.json`;
  const filePath = path.join(config.outputDir, fileName);

  if (!orderbooks[symbol]) return;

  const logData = {
    timestamp,
    datetime: new Date(timestamp).toISOString(),
    symbol,
    bids: orderbooks[symbol].bids,
    asks: orderbooks[symbol].asks,
  };

  fs.writeJson(filePath, logData)
    .then(() => {
      console.log(`Orderbook for ${symbol} saved to ${fileName}`);
    })
    .catch(err => {
      console.error(`Error saving orderbook for ${symbol}:`, err);
    });
}

// Функция для обработки сообщений WebSocket
function handleWebSocketMessage(data) {
  try {
    const message = JSON.parse(data);

    if (message.topic && message.topic.startsWith(`orderbook.${config.depth}.`)) {
      const symbol = message.topic.split('.')[2];
      const update = message.data;
      
      if (!orderbooks[symbol]) {
        orderbooks[symbol] = { bids: [], asks: [], lastUpdateId: 0 };
      }
      
      // Проверка последовательности обновлений
      if (update.u <= orderbooks[symbol].lastUpdateId) {
        return;
      }
      
      orderbooks[symbol].lastUpdateId = update.u;
      orderbooks[symbol].bids = update.b;
      orderbooks[symbol].asks = update.a;

      // Периодическая запись в файл
      const now = Date.now();
      if (!lastLogTimes[symbol] || now - lastLogTimes[symbol] >= config.logInterval) {
        logOrderbookToFile(symbol);
        lastLogTimes[symbol] = now;
      }
    }
  } catch (err) {
    console.error('Error processing message:', err);
  }
}

// Функция для подключения к WebSocket и подписки на пары
function createWebSocketConnection(symbols) {
  const wsUrl = `wss://stream.bybit.com/v5/public/linear`;
  const ws = new WebSocket(wsUrl);

  ws.on('open', () => {
    console.log(`WebSocket connected. Subscribing to ${symbols.length} symbols`);
    
    // Разбиваем подписки на батчи (Bybit имеет лимиты)
    const batchSize = 10; // Максимальное количество пар в одной подписке
    for (let i = 0; i < symbols.length; i += batchSize) {
      const batch = symbols.slice(i, i + batchSize);
      const subscribeMessage = {
        op: 'subscribe',
        args: batch.map(symbol => `orderbook.${config.depth}.${symbol}`),
      };
      
      setTimeout(() => {
        ws.send(JSON.stringify(subscribeMessage));
      }, 1000 * (i / batchSize)); // Распределяем подписки во времени
    }
  });

  ws.on('message', handleWebSocketMessage);

  ws.on('close', () => {
    console.log('WebSocket disconnected. Reconnecting...');
    setTimeout(() => createWebSocketConnection(symbols), 5000);
  });

  ws.on('error', (err) => {
    console.error('WebSocket error:', err);
    ws.close();
  });

  return ws;
}

// Основная функция
async function main() {
  console.log('Fetching all trading symbols from Bybit...');
  allSymbols = await getAllSymbols();
  
  if (allSymbols.length === 0) {
    console.error('No symbols found. Exiting.');
    process.exit(1);
  }
  
  console.log(`Found ${allSymbols.length} trading symbols. Starting orderbook logging...`);
  
  // Создаем несколько соединений для распределения нагрузки
  const symbolsPerConnection = Math.ceil(allSymbols.length / config.maxConnections);
  for (let i = 0; i < config.maxConnections; i++) {
    const start = i * symbolsPerConnection;
    const end = start + symbolsPerConnection;
    const symbolsBatch = allSymbols.slice(start, end);
    
    if (symbolsBatch.length > 0) {
      createWebSocketConnection(symbolsBatch);
    }
  }
}

// Запускаем и обрабатываем завершение
main();

process.on('SIGINT', () => {
  console.log('Shutting down...');
  // Сохраняем все стаканы перед выходом
  Object.keys(orderbooks).forEach(symbol => {
    logOrderbookToFile(symbol);
  });
  setTimeout(() => process.exit(), 1000);
});