const { seyahatEkle } = require('./seyahatController');

// Gerçek veritabanını bozmamak için veritabanını "taklit" ediyoruz (Mocking)
jest.mock('./database', () => ({
    run: jest.fn(function(query, params, callback) {
        // İşlem başarılı olmuş gibi id:1 döndürüyoruz
        callback.call({ lastID: 1, changes: 1 }, null); 
    }),
    all: jest.fn()
}));

describe('Seyahat Controller İş Mantığı Testleri', () => {
    
    // 1. BAŞARILI DURUM TESTİ
    it('Geçerli verilerle yeni bir seyahat başarıyla eklenmeli', () => {
        // Sistemi kandırmak için sahte bir kullanıcı isteği (req) hazırlıyoruz
        const req = {
            body: { sehir: 'Ankara', tarih: '2026-10-29', durum: 'Planlanıyor', butce: 2000 }
        };
        
        // Sistemin vereceği cevabı yakalamak için sahte bir cevap nesnesi (res) hazırlıyoruz
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        // Fonksiyonumuzu çalıştırıyoruz
        seyahatEkle(req, res);

        // Beklentilerimiz (Assertions)
        expect(res.status).toHaveBeenCalledWith(201); // 201 Created kodu dönmeli
        expect(res.json).toHaveBeenCalledWith({ id: 1, mesaj: "Seyahat başarıyla eklendi!" });
    });

    // 2. HATALI DURUM TESTİ
    it('Şehir veya tarih eksik gönderilirse 400 hata kodu vermeli', () => {
        // Şehir ve tarihin olmadığı hatalı bir istek
        const req = { 
            body: { durum: 'Planlanıyor', butce: 5000 } 
        };
        
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        seyahatEkle(req, res);

        // Beklentilerimiz
        expect(res.status).toHaveBeenCalledWith(400); // 400 Bad Request kodu dönmeli
        expect(res.json).toHaveBeenCalledWith({ hata: "Şehir ve tarih zorunludur!" });
    });
});