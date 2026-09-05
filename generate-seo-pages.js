const fs = require('fs');
const path = require('path');

// Temel Site Bilgileri
const BASE_URL = 'https://autodetay.com.tr';
const PHONE_DISPLAY = '0535 944 25 15';
const PHONE_CLEAN = '905359442515';
const ADDRESS = 'Hacı Abdi, 14780 Göynük / Bolu';

// Hedef İlçeler ve Bilgileri
const districts = [
    { name: 'Taraklı', slug: 'tarakli', distance: 'yaklaşık 25-30 dakika' },
    { name: 'Mudurnu', slug: 'mudurnu', distance: 'yaklaşık 35-40 dakika' },
    { name: 'Nallıhan', slug: 'nallihan', distance: 'yaklaşık 45-50 dakika' },
    { name: 'Gölpazarı', slug: 'golpazari', distance: 'yaklaşık 40-45 dakika' },
    { name: 'Geyve', slug: 'geyve', distance: 'yaklaşık 50 dakika' }
];

// Hizmetler ve Özel SEO İçerikleri
const services = {
    'direksiyon-kilifi': {
        titlePart: 'Dikme Direksiyon Kılıfı & Deri Kaplama',
        descPart: 'elde dikim özel kalıp direksiyon kılıfı kaplama ve montajı. Soyulmuş direksiyonlara orijinal görünüm.',
        h1Part: 'Elde Dikim Direksiyon Kılıfı Kaplama',
        intro: 'Aracınızın soyulan, kayganlaşan veya yıpranan direksiyon simidini sökmeden; özel kalıplarla, kaliteli deri ve iplik seçenekleriyle fabrikasyon standartlarında elde dikiyoruz.',
        features: [
            'Araca özel birebir kalıp, kaba görünmeyen ince dikiş',
            'Direksiyon kollarını saran estetik ve orijinal görünüm',
            'Kaymayı önleyen, sürüş konforunu artıran yüksek kavrama',
            'Yaklaşık 45-60 dakikalık titiz el işçiliği ile hızlı teslimat'
        ]
    },
    'oto-koltuk-kilifi': {
        titlePart: 'Oto Koltuk Kılıfı Satış & Montaj',
        descPart: 'araca tam uyumlu ortopedik oto koltuk kılıfı satışı ve potluk yapmayan profesyonel montaj.',
        h1Part: 'Oto Koltuk Kılıfı Satış ve Profesyonel Montaj Hizmeti',
        intro: 'Aracınızın orijinal koltuk döşemelerini yıpranmaya karşı korumak veya eskiyen döşemelerinizi yenilemek için terletmeyen, kaliteli kumaş ve deri kılıf çözümleri sunuyoruz.',
        features: [
            'Kayma ve bollaşma yapmayan, koltuğu saran gergin montaj',
            'Hava yastığı (Airbag) uyumlu güvenli dikiş teknolojisi',
            'Terletmeyen, silinebilir ve leke tutmayan kumaş alternatifleri',
            'Ortopedik sünger destekleriyle ekstra sürüş rahatlığı'
        ]
    },
    'oto-kuafor': {
        titlePart: 'Detaylı Oto Kuaför & İç Temizlik',
        descPart: 'profesyonel oto kuaför, koltuk yıkama, tavan taban temizliği ve plastik koruma bakımı.',
        h1Part: 'Detaylı Oto Kuaför ve Araç İç Dezenfeksiyon',
        intro: 'Zamanla araç içinde oluşan lekeleri, kötü kokuları ve biriken bakterileri profesyonel temizlik ürünleri ve özel vakum makineleriyle derinlemesine temizliyoruz.',
        features: [
            'Koltukların kumaşına zarar vermeyen derinlemesine ıslak/kuru vakumlama',
            'Sarkma riski yaratmayan hassas tavan döşemesi temizliği',
            'Taban halısı derin kum, çamur ve leke arındırma',
            'Torpido ve plastik aksamlara özel UV koruyucu, besleyici bakım'
        ]
    },
    'buharli-arac-yikama': {
        titlePart: 'Buharlı Araç Yıkama & Hijyen',
        descPart: 'yüksek sıcaklıkta buharla motor, klima ızgaraları ve iç mekan antibakteriyel araç temizliği.',
        h1Part: 'Buharlı Araç Yıkama ve Detaylı Hijyen Uygulaması',
        intro: '150 dereceye varan basınçlı kuru ve ıslak buhar gücüyle aracınızın en derin kıvrımlarında kimyasalsız, kusursuz bir dezenfeksiyon ve temizlik sağlıyoruz.',
        features: [
            'Klima kanallarındaki bakteri, küf ve kötü koku kaynaklarının buharla yok edilmesi',
            'Su birikmesi yapmadan elektronik aksama zarar vermeyen güvenli motor temizliği',
            'Kapı fitilleri, bagaj kanalları ve petek aralarında sıfır kir',
            'Kumaş ve döşemeleri aşırı ıslatmadan hızlı kuruma avantajı'
        ]
    }
};

let generatedUrls = [`${BASE_URL}/`];

// HTML Şablon Fonksiyonu
function generateHtml(dist, servKey, serv) {
    const slug = `${dist.slug}-${servKey}.html`;
    const canonical = `${BASE_URL}/${slug}`;
    const pageTitle = `${dist.name} ${serv.titlePart} | Auto Detay Göynük`;
    const metaDesc = `${dist.name} ve çevresi için ${serv.descPart} Göynük Auto Detay atölyemizde randevulu hizmet. Tel: ${PHONE_DISPLAY}`;
    const whatsappMsg = encodeURIComponent(`Merhaba, ${dist.name}'den yazıyorum. ${serv.h1Part} için bilgi ve randevu almak istiyorum.`);

    return `<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pageTitle}</title>
    <meta name="description" content="${metaDesc}">
    <link rel="canonical" href="${canonical}">
    <meta property="og:title" content="${pageTitle}">
    <meta property="og:description" content="${metaDesc}">
    <meta property="og:type" content="article">
    <meta property="og:url" content="${canonical}">

    <!-- Schema.org Yerel İşletme Verisi -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "AutoRepair",
      "name": "Auto Detay Göynük",
      "description": "${metaDesc}",
      "telephone": "${PHONE_DISPLAY}",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Hacı Abdi",
        "addressLocality": "Göynük",
        "addressRegion": "Bolu",
        "postalCode": "14780",
        "addressCountry": "TR"
      },
      "areaServed": "${dist.name}"
    }
    </script>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; line-height: 1.6; color: #222; margin: 0; padding: 0; background: #f8f9fa; }
        .container { max-width: 800px; margin: 0 auto; background: #fff; padding: 30px 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
        .header { border-bottom: 2px solid #e9ecef; padding-bottom: 20px; margin-bottom: 25px; }
        .badge { display: inline-block; background: #007bff; color: #fff; padding: 4px 10px; border-radius: 4px; font-size: 13px; font-weight: bold; margin-bottom: 10px; }
        h1 { font-size: 24px; color: #111; margin: 0 0 10px 0; }
        h2 { font-size: 20px; color: #222; margin-top: 30px; }
        p { margin: 10px 0; color: #444; }
        ul { padding-left: 20px; }
        li { margin-bottom: 8px; color: #333; }
        .cta-box { background: #e8f5e9; border: 1px solid #c8e6c9; border-radius: 8px; padding: 25px; text-align: center; margin-top: 35px; }
        .whatsapp-btn { display: inline-block; background: #25d366; color: #fff; text-decoration: none; padding: 14px 28px; border-radius: 6px; font-weight: bold; font-size: 16px; margin-top: 15px; }
        .whatsapp-btn:hover { background: #1ebc59; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e9ecef; font-size: 13px; color: #777; text-align: center; }
        .footer a { color: #007bff; text-decoration: none; }
    </style>
</head>
<body>

<div class="container">
    <div class="header">
        <span class="badge">${dist.name} Bölgesi Hizmet Sayfası</span>
        <h1>${dist.name} ${serv.h1Part}</h1>
        <p>${serv.intro}</p>
    </div>

    <h2>Uygulama ve Hizmet Standartlarımız</h2>
    <ul>
        ${serv.features.map(f => `<li>${f}</li>`).join('\n        ')}
    </ul>

    <h2>${dist.name}'den Atölyemize Ulaşım & Randevu</h2>
    <p>İşletmemiz Bolu Göynük merkezinde yer almakta olup, <strong>${dist.name}</strong>'den araçla ${dist.distance} mesafededir.</p>
    <p>Tüm işlemlerimiz bekleme yaşamamanız adına titizlikle ve <strong>randevulu</strong> olarak gerçekleştirilir.</p>

    <div class="cta-box">
        <h3 style="margin:0 0 10px 0; color:#2e7d32;">Fiyat ve Uygunluk Bilgisi Alın</h3>
        <p style="margin:0;">Aracınızın marka/modelini belirterek doğrudan WhatsApp üzerinden güncel fiyat alabilirsiniz.</p>
        <a href="https://wa.me/${PHONE_CLEAN}?text=${whatsappMsg}" class="whatsapp-btn" target="_blank" rel="noopener">
            WhatsApp ile Bilgi / Randevu Al
        </a>
        <p style="margin-top:15px; font-size:14px; color:#555;">Telefon: <strong>${PHONE_DISPLAY}</strong></p>
    </div>

    <div class="footer">
        <p><strong>Auto Detay</strong> - ${ADDRESS}</p>
        <p><a href="/">Ana Sayfaya Dön</a></p>
    </div>
</div>

</body>
</html>`;
}

// Dosyaları Üret
districts.forEach(dist => {
    Object.keys(services).forEach(servKey => {
        const serv = services[servKey];
        const fileName = `${dist.slug}-${servKey}.html`;
        const htmlContent = generateHtml(dist, servKey, serv);
        
        fs.writeFileSync(path.join(__dirname, fileName), htmlContent, 'utf8');
        generatedUrls.push(`${BASE_URL}/${fileName}`);
        console.log(`Oluşturuldu: ${fileName}`);
    });
});

// sitemap.xml Üret
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${generatedUrls.map(url => `  <url>
    <loc>${url}</loc>
    <priority>${url === BASE_URL + '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemapContent, 'utf8');
console.log('sitemap.xml başarıyla oluşturuldu!');
