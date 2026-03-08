# 🎨 Panduan Generate Icon PWA

Script ini akan mengubah logo/gambar kamu menjadi icon PWA dengan berbagai ukuran.

## 📋 Persiapan

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Siapkan logo kamu:**
   - Format yang didukung: PNG, JPG, JPEG, SVG, WEBP
   - Rekomendasi: Gunakan gambar persegi (1:1 ratio)
   - Ukuran minimal: 512x512px untuk hasil terbaik
   - Background transparan (PNG) untuk hasil optimal

## 🚀 Cara Menggunakan

### Metode 1: Langsung dengan path file
```bash
node generate-icons.js logo.png
```

### Metode 2: Menggunakan npm script
```bash
npm run generate-icons logo.png
```

### Contoh dengan berbagai format:
```bash
# PNG
node generate-icons.js my-logo.png

# JPG
node generate-icons.js my-logo.jpg

# SVG
node generate-icons.js my-logo.svg

# Dari folder lain
node generate-icons.js assets/logo.png

# Path lengkap
node generate-icons.js C:/Users/YourName/Desktop/logo.png
```

## 📦 Output

Script akan generate icon dengan ukuran:
- 72x72px
- 96x96px
- 128x128px
- 144x144px
- 152x152px
- 192x192px
- 384x384px
- 512x512px

Semua icon akan disimpan di folder: `public/icons/`

## ✨ Fitur

- ✅ Otomatis resize ke semua ukuran yang dibutuhkan PWA
- ✅ Maintain aspect ratio (tidak distorsi)
- ✅ Background transparan
- ✅ Format PNG output
- ✅ Support berbagai format input

## 🔧 Troubleshooting

### Error: "Sharp is not installed"
```bash
npm install sharp
```

### Error: "Logo file not found"
- Pastikan path file benar
- Gunakan path relatif atau absolute
- Cek nama file dan ekstensi

### Logo terpotong atau terdistorsi
- Gunakan gambar persegi (1:1 ratio)
- Ukuran minimal 512x512px
- Pastikan logo tidak terlalu dekat dengan edge

## 💡 Tips

1. **Logo dengan background:**
   - Jika logo kamu punya background, pastikan backgroundnya bagus karena akan terlihat di icon

2. **Logo transparan:**
   - Gunakan PNG dengan background transparan untuk hasil terbaik
   - Background akan otomatis transparan di icon

3. **Logo dengan teks:**
   - Pastikan teks masih terbaca di ukuran kecil (72x72px)
   - Test di berbagai ukuran

4. **Warna:**
   - Gunakan warna yang kontras
   - Hindari warna terlalu terang atau gelap

## 📱 Setelah Generate

Setelah icon di-generate, icon akan otomatis digunakan oleh PWA kamu. Tidak perlu update manifest.json karena sudah dikonfigurasi.

Test PWA kamu di:
- Chrome DevTools > Application > Manifest
- Lighthouse > PWA audit
