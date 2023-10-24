const mongoose = require('mongoose')

const DB_URL = 'mongodb+srv://user:Maks1612@maindb.pttsxvq.mongodb.net/test'

const connectDB = async () => {
    try {
        await mongoose.connect(
            DB_URL,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        )
        console.log('Успешное подключение к MongoDB')
    } catch (error) {
        console.log('Ошибка подключения к MongoDB:', error)
        process.exit(1)
    }
}

module.exports = connectDB
