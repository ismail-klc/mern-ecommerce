const express = require('express')
const app = express()
const env = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const path =require('path')

env.config()
const adminAuthRoute = require('./routes/admin/auth')
const categoryRoute = require('./routes/category')
const productRoute = require('./routes/product')

// mongoose
mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).then(() => {
    console.log('Connected to mongodb')
})

// routes
app.use(cors())
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use(express.json())
app.use('/api', adminAuthRoute)
app.use('/api', categoryRoute)
app.use('/api', productRoute)


app.listen(process.env.PORT || 3000, () => {
    console.log(`The app is listening on ${process.env.PORT} port!`)
})