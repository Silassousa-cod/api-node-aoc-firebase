const admin = require('firebase-admin');
const serviceAccount = {
  "type": "service_account",
  "project_id": "api-node-aoc",
  "private_key_id": "AIzaSyB7CfN5o_r4HMJow_ACqjYBLHqv8b9kxMM",
  "private_key": "teste123",
  "client_email": "teste@teste.com",
  "client_id": "teste",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/your-client-email"
};
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'postgres://kqsxvymi:GYyrzinplD1d3hKaOZosIH95F0eus3el@isabelle.db.elephantsql.com/kqsxvymi'
});

const express = require('express');
const app = express();

// Rotas públicas
app.get('/public', (req, res) => {
  res.json({ message: 'Rota pública' });
});

// Rotas protegidas
app.get('/protected', isAuthenticated, (req, res) => {
  res.json({ message: 'Rota protegida' });
  if (req.isAdmin) {
    res.json({ message: 'Você é um administrador' });
  }
});

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
