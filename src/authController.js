const db = require('./database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Token oluşturmak için gizli bir anahtar (Gerçek projelerde .env dosyasında saklanır)
const SECRET_KEY = 'super_gizli_proje_anahtari';

// 1. Yeni Kullanıcı Kayıt (Register) İşlemi
const register = async (req, res) => {
    const { kullanici_adi, sifre } = req.body;
    
    if (!kullanici_adi || !sifre) {
        return res.status(400).json({ error: 'Kullanıcı adı ve şifre zorunludur.' });
    }

    try {
        // Şifreyi veritabanına açıkça kaydetmemek için güvenli hale getiriyoruz (Hashed)
        const hashedPassword = await bcrypt.hash(sifre, 10);
        
        db.run('INSERT INTO kullanicilar (kullanici_adi, sifre) VALUES (?, ?)', [kullanici_adi, hashedPassword], function(err) {
            if (err) {
                return res.status(400).json({ error: 'Bu kullanıcı adı zaten alınmış veya bir hata oluştu.' });
            }
            res.status(201).json({ message: 'Kullanıcı başarıyla oluşturuldu.' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Sunucu hatası oluştu.' });
    }
};

// 2. Kullanıcı Giriş (Login) İşlemi
const login = (req, res) => {
    const { kullanici_adi, sifre } = req.body;
    
    db.get('SELECT * FROM kullanicilar WHERE kullanici_adi = ?', [kullanici_adi], async (err, user) => {
        if (err) return res.status(500).json({ error: 'Veritabanı hatası.' });
        
        // Kullanıcı veritabanında var mı?
        if (!user) return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });

        // Girilen şifre ile veritabanındaki şifrelenmiş şifre uyuşuyor mu?
        const isMatch = await bcrypt.compare(sifre, user.sifre);
        if (!isMatch) return res.status(401).json({ error: 'Hatalı şifre girdiniz.' });

        // Giriş başarılıysa JWT (Dijital Kimlik Kartı) oluşturuyoruz
        // Bu token'ın içine kimin giriş yaptığını (id ve kullanici_adi) şifreliyoruz
        const token = jwt.sign({ id: user.id, kullanici_adi: user.kullanici_adi }, SECRET_KEY, { expiresIn: '2h' });
        
        res.json({ message: 'Giriş başarılı!', token });
    });
};

module.exports = { register, login, SECRET_KEY };