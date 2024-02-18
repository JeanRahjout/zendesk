const bodyParser = require("body-parser");
const cors = require('cors');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
hideText = require('hide-text');
const timestamp = require('unix-timestamp');
var jwt = require('jsonwebtoken');


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
    const request = req.query;
    console.log(request);

    let payload = {
        kid: request.kid,
        name: request.name,
        email: request.email,
        external_id: request.external_id,
        verified_email: request.verified,
        validity_token: request.validity_token,
        iat: Math.floor(new Date().getTime() / 1000),
        jti: uuidv4(),
    };
    let secret = request.secret;
    let timeHuman = payload.iat;

  
    let verifiedOrnot = request.verified;
    let getValidity = request.validity_token;

    let iatIssuedat = payload.iat;
    console.log(iatIssuedat);

    // let epoch_3min = Math.floor(+new Date() / 1000) + 179;

    let date = new Date(timeHuman * 1000);
    // let myDate = date.toLocaleString();

    let epochValid = setValidity();
    let dateValid = new Date(epochValid * 1000);

    function verifiedBool() {
      switch(verifiedOrnot) {
        case (verifiedOrnot = 'true'):
            return true;
            break;
            case (verifiedOrnot = 'false'):
              return false;
            break;
        default:
        }
    }

    function setValidity() {
      switch(getValidity) {
            case (getValidity = 'five'):
              let iatTest = iatIssuedat + 300000;
              console.log('this one!')
            return iatIssuedat += 5 * 60;
            case (getValidity = 'ten'):
              return iatIssuedat += 10 * 60;
            case (getValidity = 'fifteen'):
              return iatIssuedat += 15 * 60;
            case (getValidity = 'twenty'):
              return iatIssuedat + 20 * 60;
        default:
        }
    }


    let payload_res = {
        name: request.name,
        email: request.email,
        verified_email: verifiedBool(),
        external_id: request.external_id,
        exp: setValidity(),
        scope: "user"
        // iat: Math.floor(new Date().getTime() / 1000)
    };
    console.log(payload_res)

    let token = jwt.sign(payload_res, secret,  { header: { kid: request.kid }, noTimestamp: true });
    let secretHidden = hideText(secret, { placeholder: '•', showLeft: 6, showRight: 0, trim: 0 })
    let resFull = {
        jwt: token,
        issued_at: date,
        valid_until: dateValid,
        payload: payload_res,
        secret: secretHidden
    }

    res.send(resFull);
  });

module.exports = app;