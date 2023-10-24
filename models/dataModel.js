const mongoose = require('mongoose');

// Создание схемы данных
const dataSchema = new mongoose.Schema({
    name: String,
    value: Number
});

// Создание модели данных на основе схемы
const Data = mongoose.model('Data', dataSchema);

module.exports = Data;
