const express = require('express');
const app = express();
const port = 3000;

const seyahatController = require('./src/seyahatController');
// Swagger dokümantasyonunu projeye dahil ediyoruz
const { swaggerUi, swaggerDocument } = require('./src/swagger');

app.use(express.json()); 

// YENİ EKLENEN KOD: 'public' klasöründeki görsel arayüz (HTML) dosyalarını tarayıcıya açar
app.use(express.static('public'));
// Swagger arayüzünün çalışacağı web adresini belirliyoruz
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// --- REST API ENDPOINT'LERİ (TAM CRUD) ---
app.post('/api/seyahatler', seyahatController.seyahatEkle);       // C - Oluştur
app.get('/api/seyahatler', seyahatController.seyahatleriGetir);   // R - Oku
app.put('/api/seyahatler/:id', seyahatController.seyahatGuncelle);// U - Güncelle
app.delete('/api/seyahatler/:id', seyahatController.seyahatSil);  // D - Sil

app.listen(port, () => {
    console.log('Sunucu http://localhost:${port} adresinde basladi...');
});