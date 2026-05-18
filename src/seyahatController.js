const db = require('./database');

const seyahatleriGetir = (req, res) => {
    const aramaMetni = req.query.arama;
    const kullaniciId = req.user.id; // Güvenlik duvarından gelen kullanıcının ID'si

    // Sadece giriş yapan kullanıcının verilerini getiren SQL sorgusu
    let sorgu = "SELECT * FROM seyahatler WHERE kullanici_id = ?";
    let parametreler = [kullaniciId];

    if (aramaMetni) {
        sorgu += " AND sehir LIKE ?";
        parametreler.push('%' + aramaMetni + '%');
    }

    db.all(sorgu, parametreler, (err, rows) => {
        if (err) return res.status(500).json({ hata: err.message });
        res.json(rows);
    });
};

const seyahatEkle = (req, res) => {
    const { sehir, tarih, durum, butce } = req.body;
    const kullaniciId = req.user.id; // Seyahati ekleyen kullanıcının ID'si

    if (!sehir || !tarih) return res.status(400).json({ hata: "Şehir ve tarih zorunludur!" });

    // Veritabanına kaydederken kullanici_id sütununu da dolduruyoruz
    const sorgu = "INSERT INTO seyahatler (sehir, tarih, durum, butce, kullanici_id) VALUES (?, ?, ?, ?, ?)";
    db.run(sorgu, [sehir, tarih, durum || 'Planlanıyor', butce || 0, kullaniciId], function(err) {
        if (err) return res.status(500).json({ hata: err.message });
        res.status(201).json({ id: this.lastID, mesaj: "Seyahat başarıyla eklendi!" });
    });
};

const seyahatGuncelle = (req, res) => {
    const id = req.params.id;
    const { sehir, tarih, durum, butce } = req.body;
    const kullaniciId = req.user.id; 

    // AND kullanici_id = ? ifadesi, başkasının verisini güncellemeyi engeller
    const sorgu = "UPDATE seyahatler SET sehir = ?, tarih = ?, durum = ?, butce = ? WHERE id = ? AND kullanici_id = ?";
    db.run(sorgu, [sehir, tarih, durum, butce, id, kullaniciId], function(err) {
        if (err) return res.status(500).json({ hata: err.message });
        if (this.changes === 0) return res.status(404).json({ hata: "Güncellenecek seyahat bulunamadı veya yetkiniz yok." });
        res.json({ mesaj: "Seyahat güncellendi!" });
    });
};

const seyahatSil = (req, res) => {
    const id = req.params.id;
    const kullaniciId = req.user.id; 

    // AND kullanici_id = ? ifadesi, başkasının verisini silmeyi engeller
    const sorgu = "DELETE FROM seyahatler WHERE id = ? AND kullanici_id = ?";
    db.run(sorgu, [id, kullaniciId], function(err) {
        if (err) return res.status(500).json({ hata: err.message });
        if (this.changes === 0) return res.status(404).json({ hata: "Silinecek seyahat bulunamadı veya yetkiniz yok." });
        res.json({ mesaj: "Seyahat silindi!" });
    });
};

module.exports = { seyahatleriGetir, seyahatEkle, seyahatGuncelle, seyahatSil };