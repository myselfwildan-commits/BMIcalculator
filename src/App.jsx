import { useMemo, useState } from "react";
import {
  Activity,
  ArrowRight,
  Check,
  HeartPulse,
  Info,
  RotateCcw,
  Sparkles,
} from "lucide-react";

const categories = [
  {
    key: "underweight",
    label: "Underweight",
    range: "< 18,5",
    color: "#48a6ef",
    soft: "#e8f4ff",
    image: "/characters/underweight.png",
    description: "BMI berada di bawah rentang dewasa yang umum digunakan.",
    tip: "Pertimbangkan untuk berdiskusi dengan tenaga kesehatan jika kamu punya kekhawatiran tentang nutrisi atau berat badan.",
  },
  {
    key: "normal",
    label: "Normal",
    range: "18,5 – 24,9",
    color: "#65b94b",
    soft: "#edf8e9",
    image: "/characters/normal.png",
    description: "BMI berada dalam rentang dewasa yang umum digunakan.",
    tip: "Terus rawat kesehatan dengan kebiasaan yang seimbang, tidur cukup, dan aktivitas yang terasa nyaman.",
  },
  {
    key: "overweight",
    label: "Overweight",
    range: "25 – 29,9",
    color: "#f39a32",
    soft: "#fff3e3",
    image: "/characters/overweight.png",
    description: "BMI berada di atas rentang dewasa yang umum digunakan.",
    tip: "BMI hanyalah salah satu indikator. Jika ingin memahami hasilnya, tenaga kesehatan dapat mempertimbangkan faktor lain juga.",
  },
  {
    key: "obesity",
    label: "Obesitas",
    range: "≥ 30",
    color: "#ed6665",
    soft: "#fff0ef",
    image: "/characters/obesity.png",
    description: "BMI berada pada rentang obesitas menurut klasifikasi dewasa.",
    tip: "Hasil ini bukan diagnosis. Tenaga kesehatan dapat membantu menilai kesehatan secara menyeluruh tanpa menghakimi.",
  },
];

// Lebar setiap kategori berdasarkan skala BMI 0–40.
const scaleWidths = {
  underweight: 46.25,
  normal: 16.25,
  overweight: 12.5,
  obesity: 25,
};

function getCategory(bmi) {
  if (bmi < 18.5) return categories[0];
  if (bmi < 25) return categories[1];
  if (bmi < 30) return categories[2];
  return categories[3];
}

// Diagram BMI yang sudah diperbaiki.
function BmiScale({ bmi, category }) {
  // Skala diagram menggunakan BMI 0 sampai 40.
  // Posisi indikator mengikuti angka BMI sebenarnya.
  const markerPosition = Math.max(1, Math.min(99, (bmi / 40) * 100));

  return (
    <div className="scale-wrap">
      <div
        className="scale-marker"
        style={{
          left: `${markerPosition}%`,
          "--marker-color": category.color,
        }}
      >
        <span>{bmi.toFixed(1).replace(".", ",")}</span>
        <i />
      </div>

      <div
        className="scale-bar"
        role="img"
        aria-label={`BMI ${bmi.toFixed(1)}, kategori ${category.label}`}
      >
        <span
          className="scale-under"
          style={{ width: `${scaleWidths.underweight}%` }}
        />

        <span
          className="scale-normal"
          style={{ width: `${scaleWidths.normal}%` }}
        />

        <span
          className="scale-over"
          style={{ width: `${scaleWidths.overweight}%` }}
        />

        <span
          className="scale-obese"
          style={{ width: `${scaleWidths.obesity}%` }}
        />
      </div>

      <div className="scale-labels">
        <span style={{ width: `${scaleWidths.underweight}%` }}>Under</span>

        <span style={{ width: `${scaleWidths.normal}%` }}>Normal</span>

        <span style={{ width: `${scaleWidths.overweight}%` }}>Over</span>

        <span style={{ width: `${scaleWidths.obesity}%` }}>Obesitas</span>
      </div>
    </div>
  );
}

export default function App() {
  const [weight, setWeight] = useState("65");
  const [height, setHeight] = useState("170");
  const [age, setAge] = useState("24");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const category = useMemo(
    () => (result && result.age >= 20 ? getCategory(result.bmi) : null),
    [result],
  );

  function handleSubmit(event) {
    event.preventDefault();

    const kg = Number(weight);
    const cm = Number(height);
    const years = Number(age);

    if (
      !kg ||
      !cm ||
      !years ||
      kg <= 0 ||
      cm <= 0 ||
      years <= 0 ||
      years > 120
    ) {
      setError("Masukkan berat, tinggi, dan usia dengan angka yang valid.");
      setResult(null);
      return;
    }

    if (kg > 500 || cm > 260) {
      setError("Periksa kembali angka berat atau tinggi yang dimasukkan.");
      setResult(null);
      return;
    }

    setError("");

    const bmi = kg / (cm / 100) ** 2;

    setResult({
      bmi,
      age: years,
    });
  }

  function resetForm() {
    setWeight("");
    setHeight("");
    setAge("");
    setResult(null);
    setError("");
  }

  return (
    <div className="app-shell">
      {/* NAVBAR */}
      <nav className="navbar">
        <a className="brand" href="#" aria-label="Forma home">
          <span className="brand-mark">
            <Activity size={19} strokeWidth={2.6} />
          </span>

          <span>
            forma<span className="brand-dot">.</span>
          </span>
        </a>

        <div className="nav-right">
          <span className="nav-caption">
            <span className="live-dot" />
            HEALTH TOOLS
          </span>

          <a href="#about" className="nav-link">
            Tentang BMI
          </a>
        </div>
      </nav>

      <main className="main-content">
        {/* INTRO */}
        <section className="intro">
          <div className="eyebrow">
            <Sparkles size={14} />
            YOUR PERSONAL HEALTH CHECK
          </div>

          <h1>
            Kenali angka,
            <br />
            <em>pahami kesehatan.</em>
          </h1>

          <p>
            Kalkulator BMI sederhana untuk membantu memahami indeks massa tubuh
            sebagai salah satu gambaran kesehatan.
          </p>
        </section>

        {/* WORKSPACE */}
        <section className="workspace">
          {/* FORM */}
          <div className="form-card glass-card">
            <div className="card-heading">
              <div>
                <span className="step-label">01 / DATA DIRI</span>

                <h2>Hitung BMI kamu</h2>

                <p>Isi data berikut untuk melihat hasil perhitungan.</p>
              </div>

              <div className="heading-icon">
                <HeartPulse size={22} />
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="field-grid">
                <label className="field">
                  <span>
                    Berat badan <small>KG</small>
                  </span>

                  <div className="input-wrap">
                    <input
                      type="number"
                      inputMode="decimal"
                      min="1"
                      max="500"
                      step="0.1"
                      placeholder="Contoh: 65"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      required
                    />

                    <b>kg</b>
                  </div>
                </label>

                <label className="field">
                  <span>
                    Tinggi badan <small>CM</small>
                  </span>

                  <div className="input-wrap">
                    <input
                      type="number"
                      inputMode="decimal"
                      min="1"
                      max="260"
                      step="0.1"
                      placeholder="Contoh: 170"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      required
                    />

                    <b>cm</b>
                  </div>
                </label>
              </div>

              <label className="field age-field">
                <span>Usia</span>

                <div className="input-wrap">
                  <input
                    type="number"
                    inputMode="numeric"
                    min="1"
                    max="120"
                    placeholder="Masukkan usia"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                  />

                  <b>tahun</b>
                </div>
              </label>

              {error && (
                <p className="error-message" role="alert">
                  {error}
                </p>
              )}

              <div className="form-actions">
                <button className="calculate-button" type="submit">
                  Hitung BMI
                  <ArrowRight size={17} />
                </button>

                <button
                  className="reset-button"
                  type="button"
                  onClick={resetForm}
                  aria-label="Reset form"
                >
                  <RotateCcw size={17} />
                  Reset
                </button>
              </div>
            </form>

            <div className="privacy-note">
              <Info size={14} />
              Data hanya diproses di browser ini.
            </div>
          </div>

          {/* RESULT */}
          <div
            className={`result-card glass-card ${result ? "has-result" : ""}`}
          >
            {!result ? (
              <div className="empty-state">
                <div className="empty-orbit">
                  <div className="empty-icon">
                    <Activity size={34} />
                  </div>
                </div>

                <span className="step-label">02 / HASIL ANALISIS</span>

                <h2>Hasilmu akan muncul di sini</h2>

                <p>
                  Lengkapi data di samping, lalu tekan tombol{" "}
                  <strong>Hitung BMI</strong>.
                </p>

                <div className="empty-chips">
                  <span>Simple</span>
                  <span>Private</span>
                  <span>Instant</span>
                </div>
              </div>
            ) : (
              <div className="result-content">
                <div className="result-topline">
                  <span className="step-label">02 / HASIL ANALISIS</span>

                  <span className="result-check">
                    <Check size={13} />
                    SELESAI
                  </span>
                </div>

                <div className="result-main">
                  <div className="result-number">
                    <span>BODY MASS INDEX</span>

                    <strong>{result.bmi.toFixed(1).replace(".", ",")}</strong>

                    <small>kg/m²</small>
                  </div>

                  {category ? (
                    <div
                      className="character-frame"
                      style={{
                        "--category-color": category.color,
                        "--category-soft": category.soft,
                      }}
                    >
                      <img
                        src={category.image}
                        alt={`Ilustrasi karakter kategori ${category.label}`}
                      />
                    </div>
                  ) : (
                    <div className="age-illustration">
                      <HeartPulse size={54} />
                      <span>
                        Health
                        <br />
                        first
                      </span>
                    </div>
                  )}
                </div>

                {category ? (
                  <>
                    <div className="category-line">
                      <div
                        className="category-dot"
                        style={{
                          background: category.color,
                        }}
                      />

                      <div>
                        <span>KATEGORI BMI DEWASA</span>

                        <h2 style={{ color: category.color }}>
                          {category.label}
                        </h2>
                      </div>

                      <span className="category-range">{category.range}</span>
                    </div>

                    {/* DIAGRAM BMI */}
                    <BmiScale bmi={result.bmi} category={category} />

                    <p className="result-description">{category.description}</p>

                    <div
                      className="insight-box"
                      style={{ background: category.soft }}
                    >
                      <Info
                        size={17}
                        style={{
                          color: category.color,
                          flexShrink: 0,
                        }}
                      />

                      <p>{category.tip}</p>
                    </div>
                  </>
                ) : (
                  <div className="teen-note">
                    <span className="teen-badge">USIA DI BAWAH 20 TAHUN</span>

                    <h2>BMI perlu konteks pertumbuhan</h2>

                    <p>
                      Untuk anak dan remaja, kategori BMI tidak menggunakan
                      batas dewasa. Hasil perlu dibandingkan dengan kurva
                      BMI-menurut-usia yang mempertimbangkan usia dan jenis
                      kelamin.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* CATEGORY GUIDE */}
        <section className="category-section">
          <div className="section-title">
            <div>
              <span className="step-label">PANDUAN SINGKAT</span>

              <h2>Empat rentang BMI dewasa</h2>
            </div>

            <span className="adult-note">Khusus usia 20 tahun ke atas</span>
          </div>

          <div className="category-grid">
            {categories.map((item, index) => (
              <div
                className="category-tile"
                key={item.key}
                style={{
                  "--tile-color": item.color,
                  "--tile-soft": item.soft,
                }}
              >
                <span className="tile-number">0{index + 1}</span>

                <span className="tile-color" />

                <div>
                  <h3>{item.label}</h3>
                  <p>{item.range}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section className="about-section" id="about">
          <div className="about-icon">
            <Info size={20} />
          </div>

          <div>
            <h3>Catatan penting</h3>

            <p>
              BMI adalah alat skrining, bukan diagnosis dan bukan penilaian
              lengkap atas kesehatan seseorang. BMI tidak membedakan massa otot
              dan lemak, serta dapat kurang sesuai untuk kondisi tertentu.
              Gunakan hasil sebagai informasi awal, bukan label tentang diri
              atau tubuhmu.
            </p>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer>
        <span>
          forma<span className="brand-dot">.</span>
        </span>

        <p>Made for a healthier understanding of you.</p>

        <span>© 2026</span>
      </footer>
    </div>
  );
}
