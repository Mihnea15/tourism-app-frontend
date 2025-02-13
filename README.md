# Tourism-app

O aplicație mobilă pentru turism care ajută utilizatorii să descopere trasee montane, obiective turistice și afaceri locale. Aplicația oferă o hartă interactivă cu trasee marcate, puncte de interes și informații detaliate despre fiecare locație.

## Caracteristici

- Autentificare și profil utilizator
- Hartă interactivă cu:
  - Trasee montane marcate
  - Puncte de interes (panorame, zone de popas, vârfuri etc.)
  - Afaceri locale cu detalii și link-uri către Google
- Selectare oraș și filtrare afaceri
- Sistem de favorite
- Interfață intuitivă și responsive
- Suport pentru moduri de vizualizare hartă (stradal, satelit, teren)

## Tehnologii Folosite

- Framework7 - Framework UI pentru aplicații mobile
- Cordova - Pentru build-ul nativ
- Leaflet.js - Pentru hărți interactive
- PHP/Yii2 - Backend
- MySQL - Bază de date

## Cerințe Sistem

- Node.js (v14 sau mai recent)
- npm (v6 sau mai recent)
- Cordova CLI
- Android Studio (pentru build Android)
- Xcode (pentru build iOS)
- XAMPP/WAMP/MAMP (pentru backend)

## Instalare

### 1. Clonare Repository
```bash
git clone https://github.com/your-username/tourism-app.git
cd tourism-app
```

### 2. Instalare Dependințe Frontend
```bash
cd frontend
npm install
```

### 3. Instalare Dependințe Backend
```bash
cd backend
composer install
```

### 4. Configurare Bază de Date
- Creați o bază de date MySQL
- Copiați `backend/config/db.example.php` în `backend/config/db.php`
- Actualizați credențialele în `db.php`
- Rulați migrările:
```bash
cd backend
php yii migrate
```

### 5. Configurare Environment
- Copiați `.env.example` în `.env`
- Actualizați variabilele de mediu după necesități

## Rulare Aplicație

### Development Server
```bash
# În directorul frontend
npm start
```

### Build pentru Android
```bash
# În directorul frontend
npm run build-cordova
npm run build-cordova-android
```

### Build pentru iOS
```bash
# În directorul frontend
npm run build-cordova
npm run build-cordova-ios
```

## Structura Proiectului

```
tourism-app/
├── frontend/               # Aplicația Framework7
│   ├── www/               # Codul sursă frontend
│   ├── cordova/           # Configurări Cordova
│   └── package.json       # Dependințe frontend
├── backend/               # API Yii2
│   ├── config/           # Configurări backend
│   ├── controllers/      # Controllere API
│   ├── models/           # Modele date
│   └── composer.json     # Dependințe backend
└── README.md
```

## API Endpoints

- `GET /api-city` - Lista orașelor și afacerilor
- `POST /api-login` - Autentificare utilizator
- `GET /api-business/{id}` - Detalii afacere
- `GET /api-trails` - Lista trasee montane

## Contribuție

1. Fork repository
2. Creați un branch nou (`git checkout -b feature/AmazingFeature`)
3. Commit modificările (`git commit -m 'Add some AmazingFeature'`)
4. Push către branch (`git push origin feature/AmazingFeature`)
5. Deschideți un Pull Request

## Licență

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Your Name - your.email@example.com
Project Link: https://github.com/your-username/tourism-app

## Acknowledgments

* [Framework7](https://framework7.io/)
* [Leaflet](https://leafletjs.com/)
* [OpenStreetMap](https://www.openstreetmap.org/)
* [Yii2](https://www.yiiframework.com/)