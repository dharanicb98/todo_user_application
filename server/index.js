const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const {connectDB} = require('./db')
const routes = require('./routes')

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


(async () => {
    try{
       await connectDB();

        routes.setUpRoutes(app);

        app.listen(5000, () => {
            console.log('server is running at port 5000');
        })

    }
    catch (e) {
        console.log('you have an error', e);
        process.exit(1);
    }
})();
