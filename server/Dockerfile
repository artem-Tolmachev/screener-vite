# Используем официальный Node.js образ
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы
COPY . .

# Указываем порт, на котором работает твой сервер (если Express, скорее всего 3000)
EXPOSE 5000

# Запускаем приложение
CMD ["node", "index.js"]

