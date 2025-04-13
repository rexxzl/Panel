const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Membaca data login dari file JSON
const userConfig = JSON.parse(fs.readFileSync('./config/user.json', 'utf8'));

// Halaman login
app.get('/login', (req, res) => {
  res.render('login');
});

// Proses login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === userConfig.username && password === userConfig.password) {
    res.redirect('/');
  } else {
    res.send('Invalid login credentials');
  }
});

// Halaman utama (panel)
app.get('/', (req, res) => {
  res.render('index');
});

// Menjalankan server
app.listen(port, () => {
  console.log(`ZakyPanel running on http://localhost:${port}`);
});
