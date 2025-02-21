# README pentru Aplicația Mobilă "Tourism App"

## Descriere
Aplicația "Tourism App" este o aplicație mobilă dezvoltată folosind Framework7 și Apache Cordova, care permite utilizatorilor să exploreze trasee turistice, să se conecteze cu afaceri locale și să obțină informații utile despre destinații.

## Cerințe
- **Node.js** (versiune LTS recomandată)
- **npm** (inclus cu Node.js)
- **Apache Cordova** (instalat global)
- **Java Development Kit (JDK)** (versiune 8 sau mai recentă)
- **Android Studio** (pentru a gestiona SDK-urile Android)

## Instalare

1. **Clonează repository-ul:**
   ```bash
   git clone <repository-url>
   cd tourism-app
   ```

2. **Instalează dependențele:**
   ```bash
   npm install
   ```

3. **Instalează Cordova (dacă nu este deja instalat):**
   ```bash
   npm install -g cordova
   ```

4. **Adaugă platforma Android:**
   ```bash
   cordova platform add android
   ```

## Rularea aplicației

### În browser
Pentru a rula aplicația în browser, folosește comanda:
```bash
npm start
```

### Pe dispozitiv Android
Pentru a construi și rula aplicația pe un dispozitiv Android conectat, folosește comanda:
```bash
npm run cordova-android
```

## Construirea APK-ului

Pentru a construi un fișier APK pentru aplicația ta, folosește următoarea comandă:
```bash
cordova build android
```

### Configurarea pentru build
Asigură-te că ai configurat corect următoarele în fișierul `config.xml`:

- **Permisiuni**: Asigură-te că aplicația are permisiunile necesare pentru a accesa internetul și alte resurse.
- **Network Security Config**: Dacă folosești HTTP, asigură-te că ai configurat `network_security_config.xml` pentru a permite cererile necriptate.

## Testare
Pentru a testa aplicația pe un emulator sau pe un dispozitiv fizic, asigură-te că ai activat debugging-ul USB pe dispozitivul tău Android.

## Contribuții
Dacă dorești să contribui la acest proiect, te rugăm să deschizi un pull request sau să raportezi problemele întâmpinate.
