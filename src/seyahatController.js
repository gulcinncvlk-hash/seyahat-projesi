const db = require('./database');

const seyahatleriGetir = (req, res) => {
    const aramaMetni = req.query.arama;
    let sorgu = "SELECT * FROM seyahatler";
    let parametreler = [];

    // Tırnak bozulmalarını engellemek için + işaretiyle güvenli birleştirme yapıyoruz
    if (aramaMetni) {
        sorgu += " WHERE sehir LIKE ?";
        parametreler.push('%' + aramaMetni + '%');
    }

    db.all(sorgu, parametreler, (err, rows) => {
        if (err) return res.status(500).json({ hata: err.message });
        res.json(rows);
    });
};

const seyahatEkle = (req, res) => {
    const { sehir, tarih, durum, butce } = req.body;
    if (!sehir || !tarih) return res.status(400).json({ hata: "Şehir ve tarih zorunludur!" });

    const sorgu = "INSERT INTO seyahatler (sehir, tarih, durum, butce) VALUES (?, ?, ?, ?)";
    db.run(sorgu, [sehir, tarih, durum || 'Planlanıyor', butce || 0], function(err) {
        if (err) return res.status(500).json({ hata: err.message });
        res.status(201).json({ id: this.lastID, mesaj: "Seyahat başarıyla eklendi!" });
    });
};

const seyahatGuncelle = (req, res) => {
    const id = req.params.id;
    const { sehir, tarih, durum, butce } = req.body;

    const sorgu = "UPDATE seyahatler SET sehir = ?, tarih = ?, durum = ?, butce = ? WHERE id = ?";
    db.run(sorgu, [sehir, tarih, durum, butce, id], function(err) {
        if (err) return res.status(500).json({ hata: err.message });
        if (this.changes === 0) return res.status(404).json({ hata: "Güncellenecek seyahat bulunamadı." });
        res.json({ mesaj: "Seyahat güncellendi!" });
    });
};

const seyahatSil = (req, res) => {
    const id = req.params.id;
    const sorgu = "DELETE FROM seyahatler WHERE id = ?";
    db.run(sorgu, id, function(err) {
        if (err) return res.status(500).json({ hata: err.message });
        if (this.changes === 0) return res.status(404).json({ hata: "Silinecek seyahat bulunamadı." });
        res.json({ mesaj: "Seyahat silindi!" });
    });
};

module.exports = { seyahatleriGetir, seyahatEkle, seyahatGuncelle, seyahatSil };