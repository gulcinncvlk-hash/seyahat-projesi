const sqlite3 = require('sqlite3').verbose();

// Veritabanı bağlantısını oluştur (seyahatler.sqlite adında bir dosya yaratacak)
const db = new sqlite3.Database('./seyahatler.sqlite', (err) => {
    if (err) {
        console.error('Veritabanına bağlanırken hata oluştu:', err.message);
    } else {
        console.log('SQLite veritabanına başarıyla bağlanıldı.');

        // 1. KULLANICILAR TABLOSU (Yeni Eklendi)
        db.run(`CREATE TABLE IF NOT EXISTS kullanicilar (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            kullanici_adi TEXT UNIQUE NOT NULL,
            sifre TEXT NOT NULL
        )`, (err) => {
            if (err) {
                console.error('Kullanıcılar tablosu oluşturulurken hata:', err.message);
            } else {
                console.log('Kullanıcılar tablosu başarıyla hazırlandı.');
            }
        });

        // 2. SEYAHATLER TABLOSU (kullanici_id eklendi)
        db.run(`CREATE TABLE IF NOT EXISTS seyahatler (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            sehir TEXT NOT NULL,
            tarih TEXT NOT NULL,
            durum TEXT DEFAULT 'Planlanıyor',
            butce REAL,
            kullanici_id INTEGER,
            FOREIGN KEY(kullanici_id) REFERENCES kullanicilar(id)
        )`, (err) => {
            if (err) {
                console.error('Tablo oluşturulurken hata:', err.message);
            } else {
                console.log('Seyahatler tablosu başarıyla hazırlandı.');
            }
        });
    }
});

// Bu dosyayı projenin diğer yerlerinde kullanabilmek için dışa aktarıyoruz
module.exports = db;