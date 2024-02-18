const express = require('express');
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();

// Middleware

app.use(bodyParser.json());
app.use(cors());

const jwt_sso = require('./routes/jwt_sso.js');
const jwt_messaging = require('./routes/jwt_messaging.js');

app.use('/api/jwt_sso', jwt_sso);
app.use('/api/jwt_messaging', jwt_messaging);

// Handle production
if (process.env.NODE_ENV === 'production') {
    //static folder
    app.use(express.static(__dirname + '/public'));
    // Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.envPORT || 8080;

app.listen(port, () => console.log(`Server started on port ${port}`));