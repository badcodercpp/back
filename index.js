import express from 'express';
import doLogin from './handler/login';
import doSignup from './handler/signup';
import doAdminStuffs from './handler/admin/query';
const path = require('path');
const bodyParser = require('body-parser')

// create application/json parser
const jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const PORT = process.env.PORT || 5000
const app = express();
app.use(express.static(path.join(__dirname, 'public')))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/test', (req, res) => {
  res.send('hello world')
});

app.get('/login', jsonParser, (req, res) => {
  return doLogin(req, res)
})

app.get('/signup', jsonParser, (req, res) => {
  return doSignup(req, res)
})

app.get('/mapdata', jsonParser, (req, res) => {
  return doGetMapData(req, res)
})

app.post('/doAdminStuffs', jsonParser, (req, res) => {
  return doAdminStuffs(req, res)
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))