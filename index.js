import express from 'express';
import doLogin from './handler/login';
import doSignup from './handler/signup';
import doAdminStuffs from './handler/admin/query';
import doGetMapData from './handler/mapData';
import doGetProfile from './handler/profile';
import doGetUserDetails from './handler/details/user';
import { checkToken } from './middleware/token';
import { encrypt, decrypt } from './cryptoNode/exports';
import cryptoConst from './cryptoNode/config/constants';

const path = require('path');
const bodyParser = require('body-parser')
const csrf = require('csurf')
const cookieParser = require('cookie-parser')
const useragent = require('express-useragent');
const csrfProtection = csrf({ cookie: true })
// create application/json parser
const jsonParser = bodyParser.json();

const { key, iv } = cryptoConst;
console.log("key", key, iv)
const d = encrypt("ajaykrjha93@gmail.com", key, iv)
console.log(d);
const k = Buffer.from(d.key, 'hex');
const i = Buffer.from(d.iv, 'hex');
const dt = d.encryptedData;
const e = decrypt(dt, k, i);
console.log("e")
console.log(e)

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const PORT = process.env.PORT || 5000
const app = express();
app.use(express.static(path.join(__dirname, 'public')))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Expose-Headers", "*")
  next();
});

app.use(useragent.express());

// app.use(cookieParser())

// app.use(csrf());

app.get('/test', (req, res) => {
  res.send('hello world')
});

app.post('/login', jsonParser, (req, res) => {
  return doLogin(req, res)
})

app.post('/signup', jsonParser, (req, res) => {
  return doSignup(req, res)
})

app.get('/mapdata', jsonParser, (req, res) => {
  return doGetMapData(req, res)
})

app.post('/doAdminStuffs', jsonParser, (req, res) => {
  return doAdminStuffs(req, res)
})

app.post('/profile/:id', jsonParser, (req, res) => {
  return doGetProfile(req, res);
})

app.post('/userDetails', jsonParser, checkToken, (req, res) => {
  return  doGetUserDetails(req, res);
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))