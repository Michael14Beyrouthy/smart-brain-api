const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
  client: 'pg',
  connection: {
    host : 'dpg-cl6jr3a073pc73aiplmg-a.ohio-postgres.render.com', //same as localhost
    port: 5432,
    user : 'postgres_mdr6_user',
    password : 'DAjSdpGTzk92ndm1F7sKocZDIIsR0QBN',
    database : 'postgres_mdr6'
  }
});

// db('users').where('name', '').del().then(data => {
//   console.log(data);
// })

db.select('*').from('users').then(data => {
  console.log(data);
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.listen(3000, () => {
  console.log('app is running on port 3000');
})

app.get('/', (req, res) => {res.send('its working exclamation mark!!!')})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

app.put('/image', (req, res) => { image.handleImage(req, res, db) })
