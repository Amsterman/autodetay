const fs = require('fs');
const path = require('path');

const districts = ['tarakli', 'mudurnu', 'nallihan', 'golpazari', 'geyve'];
const services = ['direksiyon-kilifi', 'oto-koltuk-kilifi', 'oto-kuafor', 'buharli-arac-yikama'];

// 20 HTML dosyasını sil
districts.forEach(dist => {
    services.forEach(serv => {
        const file = path.join(__dirname, `${dist}-${serv}.html`);
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
            console.log(`Silindi: ${file}`);
        }
    });
});

// Eski scripti ve revert scriptini temizleme listesine al
['generate-seo-pages.js', 'revert.js'].forEach(script => {
    const file = path.join(__dirname, script);
    if (fs.existsSync(file)) {
        fs.unlinkSync(file);
        console.log(`Silindi: ${file}`);
    }
});
