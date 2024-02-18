const bodyParser = require("body-parser");
const cors = require('cors');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jwt-simple');
hideText = require('hide-text');
const timestamp = require('unix-timestamp');


const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
  });

app.use('/', function(req, res) {
    let request = req.query;
    console.log(request);

    let payload = checkExtid(request);

    function checkExtid(request) {
      if(request.external_id != '') {
            let payload_withExt = {
              name: request.name,
              email: request.email,
              external_id: request.external_id,
              iat: Math.floor(new Date().getTime() / 1000),
              jti: uuidv4(),
          };
          return payload_withExt;
        }
        else {
          let payload_noExt = {
            name: request.name,
            email: request.email,
            iat: Math.floor(new Date().getTime() / 1000),
            jti: uuidv4(),
          };
          return payload_noExt;
        }
      } 

    console.log(payload)

    let secret = request.secret;
    let timeHuman = payload.iat;

    // let epoch_3min = Math.floor(+new Date() / 1000) + 179;

    let date = new Date(timeHuman * 1000);
    // let myDate = date.toLocaleString();

    let token = jwt.encode(payload, secret);
    let secretHidden = hideText(secret, { placeholder: '•', showLeft: 6, showRight: 0, trim: 0 })
    let resFull = {
        jwt: token,
        issued_at: date,
        payload: payload,
        secret: secretHidden
    }

    res.send(resFull);
  });

module.exports = app;