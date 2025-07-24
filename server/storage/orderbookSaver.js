// import { dirname } from 'path';
// import { fileURLToPath } from 'url';
// import path from 'path';
// import fs from 'fs';
// import ordersHeatmapParcer from '../helpers/ordersHeatmapParcer.js';

// // Получаем текущую директорию файла
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// // Путь к лог-файлу
// const logPath = path.join(__dirname, 'heatMapFolder', 'orders.log');

// // Создаём поток записи в файл (файл создастся, если не существует)
// const logStream = fs.createWriteStream(logPath, { flags: 'a' });

// // Обработка ошибок записи
// logStream.on('error', (err) => {
//   console.error('Ошибка записи в файл:', err);
// });

// // Экспортируемая функция для сохранения ордера

// export default function orderbookSaver(order) {
//     const ordersHeatMap = ordersHeatmapParcer(order)
//     const data = JSON.stringify(ordersHeatMap) + '\n';
//     const ok = logStream.write(data);

//     // Если буфер записи переполнен, ждём освобождения
//     if (!ok) {
//         logStream.once('drain', () => {
//         console.log('Буфер записи очищен, можно писать дальше');
//         });
//     }
// }
