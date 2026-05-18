# ✈️ Akıllı Seyahat Planlama Sistemi

Bu proje, Sistem Analizi ve Tasarımı dersi kapsamında geliştirilmiş, çok kullanıcılı ve güvenli bir seyahat bütçe takip uygulamasıdır.

## 🚀 Yeni Eklenen Özellikler (Güncelleme)
Hocamızın son duyurusu ve talepleri doğrultusunda projeye şu mimariler entegre edilmiştir:
* *JWT (JSON Web Token) Güvenliği:* Sisteme izinsiz erişimler kapatılmış, API uçları (endpoints) koruma altına alınmıştır.
* *Kullanıcı Kayıt/Giriş Sistemi (Auth):* bcryptjs ile şifreler kriptolanarak veritabanına kaydedilmektedir. SPA mimarisinden bağımsız login.html ve register.html sayfaları tasarlanmıştır.
* *Kullanıcı Veri İzolasyonu:* Her kullanıcı (user1, user2 vb.) sadece kendi eklediği seyahat verilerini görebilir, düzenleyebilir ve silebilir. Başkasının verisine erişim veritabanı seviyesinde (kullanici_id ile) engellenmiştir.

## 🛠️ Temel Özellikler (Core Features)
* *Tam CRUD İşlemleri:* Seyahat ekleme, listeleme, güncelleme ve silme.
* *Özet Panosu (Dashboard):* Toplam seyahat sayısı, tamamlanan seyahatler ve toplam bütçe anlık hesaplanır.
* *Arama ve Filtreleme:* Şehir adına göre anlık filtreleme yapılabilir.
* *API Dokümantasyonu:* Swagger UI ile tüm endpoint'ler dökümante edilmiştir (/api-docs).

## 💻 Kullanılan Teknolojiler
* *Backend:* Node.js, Express.js
* *Veritabanı:* SQLite3
* *Güvenlik:* jsonwebtoken (JWT), bcryptjs
* *Frontend:* HTML5, CSS3, JavaScript (Fetch API)

## ⚙️ Kurulum ve Çalıştırma

1. Projeyi bilgisayarınıza indirin veya klonlayın.
2. Terminali açın ve gerekli paketleri yüklemek için şu komutu 
girin:
   ```bash
   npm install

3. Sunucuyu başlatın:
node index.js
4. Tarayıcınızdan 
http://localhost:3000 adresine gidin.

5.  Test Etmek İçin: Sistem sizi otomatik olarak giriş sayfasına yönlendirecektir. Lütfen önce "Kayıt Ol" sekmesinden yeni bir hesap oluşturun ve ardından giriş yaparak sistemi kullanmaya başlayın.
 