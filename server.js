const express = require('express');
const app = express();
const http = require('http');
exports.dotenv = require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const globalRoutes = require('./router/global')
const bodyParser = require('body-parser')

const port = process.env.PORT;
const hostname = process.env.HOST_NAME
const path = require('path')
const httpServer = http.createServer(app)

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));



app.use('/static', express.static(path.join(__dirname, 'uploads')));


app.use(cors());
app.use(helmet());
app.disable('x-powered-by');


app.use('/', globalRoutes)


httpServer.listen(port, hostname,  ()=>{
    console.log(`listening on http://${hostname}:${port}`);
})
