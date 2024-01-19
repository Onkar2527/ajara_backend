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


// const tokentest = require('./services/list_api/api').getJWTToken

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));



app.use('/static', express.static(path.join(__dirname, 'uploads')));

app.use('/', (req, res, next) => {
    let supportKey = req.headers['supportkey'];
    console.log("Requested Method : -", req.method, req.url, "public Ip :", req.connection.remoteAddress, "supportkey : ", supportKey);
    next();
})


app.use(cors({
    origin: "*"
}));
app.use(helmet());
app.disable('x-powered-by');


app.use('/', globalRoutes)


httpServer.listen(port, hostname, async () => {
    console.log(`Server listening on http://${hostname}:${port}`);
    // let token = await tokentest();
    // console.log("token", token);
})
