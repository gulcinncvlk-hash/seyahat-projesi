const express = require('express');
const jwt = require('jsonwebtoken'); // Yeni Eklendi
const app = express();
const port = 3000;

const seyahatController = require('./src/seyahatController');
const authController = require('./src/authController'); // Yeni Eklendi
const { swaggerUi, swaggerDocument } = require('./src/swagger');

app.use(express.json()); 
app.use(express.static('public'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// --- KİMLİK DOĞRULAMA (AUTH) ENDPOINT'LERİ ---
app.post('/api/register', authController.register);
app.post('/api/login', authController.login);

// --- GÜVENLİK DUVARI (MIDDLEWARE) ---
// Bu fonksiyon, kullanıcının dijital kimlik kartını (Token) kontrol eder
const tokenKontrol = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN" formatını ayrıştırır

    if (token == null) return res.status(401).json({ hata: "İşlem yapmak için giriş yapmalısınız." });

    jwt.verify(token, authController.SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ hata: "Geçersiz veya süresi dolmuş oturum." });
        
        req.user = user; // Kimliği doğrulanan kullanıcının ID'sini sisteme tanıtıyoruz
        next(); // Güvenlik duvarını geçişine izin ver
    });
};

// --- REST API ENDPOINT'LERİ (TAM CRUD) ---
// YENİ: Artık bu işlemlere sadece 'tokenKontrol' aşamasını geçenler ulaşabilir
app.post('/api/seyahatler', tokenKontrol, seyahatController.seyahatEkle);       
app.get('/api/seyahatler', tokenKontrol, seyahatController.seyahatleriGetir);   
app.put('/api/seyahatler/:id', tokenKontrol, seyahatController.seyahatGuncelle);
app.delete('/api/seyahatler/:id', tokenKontrol, seyahatController.seyahatSil);  

app.listen(port, () => {
    console.log('Sunucu http://localhost:${port} adresinde basladi...');
});