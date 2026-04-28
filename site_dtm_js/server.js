const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Template engine EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ========================
// MIDDLEWARES (sempre antes das rotas)
// ========================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'tdm_secret_key_2025',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// ========================
// ROTAS ESTÁTICAS
// ========================
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/sobre', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'sobre.html'));
});

// ========================
// ROTAS DINÂMICAS (sempre depois dos middlewares)
// ========================
app.use('/catalogo', require('./routes/catalogo'));
app.use('/tabuleiro', require('./routes/tabuleiro'));
app.use('/', require('./routes/auth'));

// ========================
// INICIAR SERVIDOR
// ========================
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});