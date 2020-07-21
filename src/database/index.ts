import mongoose from 'mongoose'
import config from './config.json'

async () => {
    try {
        await mongoose.connect(config.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true
        })
        console.log('Connected to database!')
        return
    } catch (error) {
        console.error(error)
        return
    }
}