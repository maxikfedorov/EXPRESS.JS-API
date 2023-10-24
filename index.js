const express = require('express');
const connectDB = require('./database/dbConnect');
const dataController = require('./controllers/dataController');
const userController = require('./controllers/userController')
const productController = require('./controllers/productController')
const orderController = require('./controllers/orderController')
const reviewController = require('./controllers/reviewController')

const app = express();

app.use(express.json()); // Для обработки JSON-данных в теле запроса

// Подключение к MongoDB
connectDB();

// Использование контроллера данных для всех запросов к /data
app.use('/data', dataController);
app.use('/user', userController);
app.use('/product', productController);
app.use('/order', orderController);
app.use('/review', reviewController);

// Запуск сервера
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Сервер запущен на порту ${port}`));
