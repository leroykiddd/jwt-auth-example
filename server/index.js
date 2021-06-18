const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')


const app = express()
const PORT = 8000;


const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Started on port ${PORT}`))
    } catch (error) {
        console.log(error);
    }
}


start()