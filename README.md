# ✈️ Akıllı Seyahat Planlama Sistemi

Bu proje, "Sistem Analizi ve Tasarımı" dersi kapsamında geliştirilmiş, web tabanlı ve tam yığın (full-stack) bir CRUD uygulamasıdır. Kullanıcıların seyahat planlarını (şehir, tarih, durum ve bütçe) kaydedebilecekleri, listeleyebilecekleri, güncelleyebilecekleri ve silebilecekleri bir sistem sunar.

## 🚀 Kullanılan Teknolojiler
* *Frontend:* Vanilla Javascript, HTML5, CSS3 (SPA mimarisi)
* *Backend:* Node.js, Express.js
* *Veritabanı:* SQLite3
* *Test:* Jest
* *API Dokümantasyonu:* Swagger UI

## 📋 Proje Gereksinimlerinin Karşılanması
* Tek Sayfa Uygulaması (SPA) olarak sayfa yenilenmeden asenkron çalışır.
* İş mantığı (Business Logic) route'lardan ayrılarak seyahatController.js katmanında modüler olarak yazılmıştır.
* Veritabanı olarak yerel ve hafif bir çözüm olan SQLite kullanılmıştır.
* Tam CRUD (Create, Read, Update, Delete) işlemleri mevcuttur.
* *Ek Özellik:* Sistemde anlık çalışan "Şehre Göre Arama/Filtreleme" özelliği bulunmaktadır.
* İş mantığı fonksiyonları Jest ile test edilmiştir.
* Frontend ve Backend taraflı veri doğrulaması (Validation) yapılmıştır.

## ⚙️ Kurulum ve Çalıştırma Adımları

Sistemi kendi bilgisayarınızda (yeniden üretmek) çalıştırmak için aşağıdaki adımları izleyin:

1. *Projeyi İndirin:* Dosyaları bilgisayarınıza çıkartın ve terminal (komut satırı) üzerinden proje klasörüne gidin.
2. *Bağımlılıkları Yükleyin:* Sistem için gerekli paketleri kurmak üzere terminale şu komutu girin:
   ```bash
   npm install
3. *Sunucuyu Başlatın:* Arka yüzü ve veritabanını ayaklandırmak için şu komutu çalıştırın:
     node index.js
4. *Uygulamayı Açın:* Tarayıcınızı açın ve adres çubuğuna şunu yazın: http://localhost:3000  

## 🔌 API Kullanımı ve Endpoint'ler

Uygulamanın RESTful API dokümantasyonuna interaktif olarak erişmek ve test etmek için sunucu çalışırken şu adrese gidebilirsiniz:
👉 http://localhost:3000/api-docs 

​ *Manuel API İstekleri (Endpoint'ler):*
* ​*GET /api/seyahatler :* Tüm kayıtlı seyahatleri getirir. (Arama yapmak için ?arama=şehiradı parametresi eklenebilir).
* ​*POST /api/seyahatler :*  Yeni seyahat ekler. (JSON formatında sehir, tarih, durum, butce bekler).
* ​*PUT /api/seyahatler/ :id:* Belirtilen ID'ye sahip seyahati günceller.
* *​DELETE /api/seyahatler/:id :* Belirtilen ID'ye sahip seyahati siler.

## 🧪 Testlerin Çalıştırılması
​İş mantığı katmanını test etmek için projede Jest kullanılmıştır. Testleri çalıştırmak için terminale şu komutu girmeniz yeterlidir:
```bash
 npm testt
