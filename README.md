# Forma — BMI Calculator

Kalkulator BMI sederhana berbasis React, Vite, Tailwind CSS, dan karakter PNG transparan yang disediakan.

## Menjalankan project

```bash
npm install
npm run dev
```

## Build untuk production / Vercel

```bash
npm run build
```

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

## Struktur folder

```text
bmi-glass-calculator/
├── public/
│   └── characters/
│       ├── underweight.png
│       ├── normal.png
│       ├── overweight.png
│       └── obesity.png
├── src/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## Catatan penggunaan BMI

Klasifikasi yang ditampilkan mengikuti rentang BMI dewasa dan hanya digunakan untuk usia 20 tahun ke atas. Untuk usia di bawah 20 tahun, interpretasi BMI memerlukan kurva BMI-menurut-usia dan mempertimbangkan jenis kelamin. BMI merupakan alat skrining, bukan diagnosis medis.
