const sqlite3 = require('sqlite3').verbose();

// Veritabanı bağlantısını oluştur (seyahatler.sqlite adında bir dosya yaratacak)
const db = new sqlite3.Database('./seyahatler.sqlite', (err) => {
    if (err) {
        console.error('Veritabanına bağlanırken hata oluştu:', err.message);
    } else {
        console.log('SQLite veritabanına başarıyla bağlanıldı.');
        
        // Akıllı Seyahat Planlama sistemimizin verilerini tutacak tabloyu oluşturuyoruz
        db.run(`CREATE TABLE IF NOT EXISTS seyahatler (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            sehir TEXT NOT NULL,
            tarih TEXT NOT NULL,
            durum TEXT DEFAULT 'Planlanıyor',
            butce REAL
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