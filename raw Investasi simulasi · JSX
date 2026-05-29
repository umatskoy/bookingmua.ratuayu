import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts";

const formatRupiah = (value) => {
  if (value >= 1_000_000_000) return `Rp ${(value / 1_000_000_000).toFixed(2)} M`;
  if (value >= 1_000_000) return `Rp ${(value / 1_000_000).toFixed(1)} jt`;
  return `Rp ${value.toLocaleString("id-ID")}`;
};

const formatRupiahFull = (value) =>
  `Rp ${value.toLocaleString("id-ID")}`;

function generateData(monthlyDeposit, annualReturn, years) {
  const monthlyRate = annualReturn / 100 / 12;
  const data = [];
  let balance = 0;
  let totalDeposited = 0;

  for (let month = 1; month <= years * 12; month++) {
    balance = balance * (1 + monthlyRate) + monthlyDeposit;
    totalDeposited += monthlyDeposit;
    if (month % 12 === 0) {
      const year = month / 12;
      data.push({
        year: `Thn ${year}`,
        yearNum: year,
        nilai: Math.round(balance),
        modal: totalDeposited,
        bunga: Math.round(balance - totalDeposited),
      });
    }
  }
  return data;
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "rgba(10,15,30,0.97)",
        border: "1px solid rgba(99,209,168,0.3)",
        borderRadius: 12,
        padding: "14px 18px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        fontFamily: "'DM Mono', monospace",
      }}>
        <p style={{ color: "#63d1a8", fontWeight: 700, margin: "0 0 8px", fontSize: 13 }}>{label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.color, margin: "3px 0", fontSize: 12 }}>
            {p.name}: {formatRupiahFull(p.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

function StatCard({ label, value, color, sub }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: `1px solid ${color}33`,
      borderRadius: 14,
      padding: "18px 20px",
      flex: 1,
      minWidth: 140,
    }}>
      <div style={{ color: "#8899aa", fontSize: 11, fontFamily: "'DM Mono', monospace", letterSpacing: 1, marginBottom: 6, textTransform: "uppercase" }}>{label}</div>
      <div style={{ color, fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: 18, lineHeight: 1.2 }}>{value}</div>
      {sub && <div style={{ color: "#556677", fontSize: 11, marginTop: 4, fontFamily: "'DM Mono', monospace" }}>{sub}</div>}
    </div>
  );
}

export default function App() {
  const [monthly, setMonthly] = useState(1_000_000);
  const [rate, setRate] = useState(5);
  const [activeTab, setActiveTab] = useState("chart");

  const data10 = generateData(monthly, rate, 10);
  const data20 = generateData(monthly, rate, 20);
  const last10 = data10[data10.length - 1];
  const last20 = data20[data20.length - 1];

  const combinedData = data20.map((d) => {
    const d10 = data10.find((x) => x.yearNum === d.yearNum);
    return {
      ...d,
      nilai10: d10 ? d10.nilai : null,
      nilai20: d.nilai,
      modal10: d10 ? d10.modal : null,
      modal20: d.modal,
    };
  });

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@700;800&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#070c18",
      color: "#e8f0fe",
      fontFamily: "'DM Mono', monospace",
      padding: "0 0 60px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* bg glow */}
      <div style={{
        position: "fixed", top: -200, left: -200, width: 600, height: 600,
        background: "radial-gradient(circle, rgba(99,209,168,0.07) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{
        position: "fixed", bottom: -200, right: -100, width: 500, height: 500,
        background: "radial-gradient(circle, rgba(99,140,255,0.06) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", padding: "0 20px" }}>

        {/* Header */}
        <div style={{ paddingTop: 48, paddingBottom: 32, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: 11, letterSpacing: 3, color: "#63d1a8", marginBottom: 10, textTransform: "uppercase" }}>
            ◈ Kalkulator Investasi
          </div>
          <h1 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 32,
            margin: 0, background: "linear-gradient(135deg, #e8f0fe, #63d1a8)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            lineHeight: 1.2,
          }}>
            Simulasi Investasi<br />Bulanan
          </h1>
          <p style={{ color: "#556677", fontSize: 12, marginTop: 12, lineHeight: 1.7 }}>
            Lihat kekuatan compound interest — investasi konsisten setiap bulan<br />selama 10 & 20 tahun.
          </p>
        </div>

        {/* Controls */}
        <div style={{
          marginTop: 28, display: "flex", flexWrap: "wrap", gap: 16,
          background: "rgba(255,255,255,0.025)", borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.07)", padding: "20px 22px",
        }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <label style={{ fontSize: 11, color: "#63d1a8", letterSpacing: 1, display: "block", marginBottom: 8 }}>
              INVESTASI BULANAN
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input
                type="range" min={100000} max={10000000} step={100000}
                value={monthly}
                onChange={e => setMonthly(Number(e.target.value))}
                style={{ flex: 1, accentColor: "#63d1a8", cursor: "pointer" }}
              />
              <span style={{ color: "#e8f0fe", fontSize: 13, minWidth: 80, textAlign: "right" }}>
                {formatRupiah(monthly)}
              </span>
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <label style={{ fontSize: 11, color: "#638cff", letterSpacing: 1, display: "block", marginBottom: 8 }}>
              RETURN TAHUNAN
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input
                type="range" min={1} max={20} step={0.5}
                value={rate}
                onChange={e => setRate(Number(e.target.value))}
                style={{ flex: 1, accentColor: "#638cff", cursor: "pointer" }}
              />
              <span style={{ color: "#e8f0fe", fontSize: 13, minWidth: 40, textAlign: "right" }}>
                {rate}%
              </span>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div style={{ marginTop: 24 }}>
          <div style={{ fontSize: 11, color: "#556677", letterSpacing: 2, marginBottom: 12, textTransform: "uppercase" }}>
            — Ringkasan Hasil
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 10 }}>
            <StatCard label="Nilai Akhir 10 Thn" value={formatRupiah(last10?.nilai)} color="#63d1a8"
              sub={`Modal: ${formatRupiah(last10?.modal)}`} />
            <StatCard label="Keuntungan 10 Thn" value={formatRupiah(last10?.bunga)} color="#63d1a8"
              sub={`${((last10?.bunga / last10?.modal) * 100).toFixed(1)}% dari modal`} />
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <StatCard label="Nilai Akhir 20 Thn" value={formatRupiah(last20?.nilai)} color="#638cff"
              sub={`Modal: ${formatRupiah(last20?.modal)}`} />
            <StatCard label="Keuntungan 20 Thn" value={formatRupiah(last20?.bunga)} color="#638cff"
              sub={`${((last20?.bunga / last20?.modal) * 100).toFixed(1)}% dari modal`} />
          </div>
        </div>

        {/* Tabs */}
        <div style={{ marginTop: 32, display: "flex", gap: 4, borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: 0 }}>
          {[["chart", "Grafik Pertumbuhan"], ["table", "Tabel Rinci"]].map(([key, label]) => (
            <button key={key} onClick={() => setActiveTab(key)} style={{
              background: activeTab === key ? "rgba(99,209,168,0.12)" : "transparent",
              border: "none", borderBottom: activeTab === key ? "2px solid #63d1a8" : "2px solid transparent",
              color: activeTab === key ? "#63d1a8" : "#556677",
              fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: 1,
              padding: "10px 18px", cursor: "pointer", transition: "all 0.2s",
            }}>{label}</button>
          ))}
        </div>

        {activeTab === "chart" && (
          <div style={{ marginTop: 24 }}>
            <div style={{
              background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 16, padding: "24px 12px 12px",
            }}>
              <div style={{ fontSize: 12, color: "#8899aa", marginBottom: 16, paddingLeft: 12 }}>
                Nilai Portofolio vs Modal yang Disetorkan
              </div>
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={combinedData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <defs>
                    <linearGradient id="g10" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#63d1a8" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#63d1a8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="g20" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#638cff" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#638cff" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gm" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ffb347" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#ffb347" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="year" tick={{ fill: "#556677", fontSize: 10, fontFamily: "'DM Mono'" }} tickLine={false} />
                  <YAxis tickFormatter={v => formatRupiah(v)} tick={{ fill: "#556677", fontSize: 9, fontFamily: "'DM Mono'" }} tickLine={false} axisLine={false} width={80} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 11, fontFamily: "'DM Mono'", color: "#8899aa", paddingTop: 12 }} />
                  <Area type="monotone" dataKey="modal20" name="Modal Disetor" stroke="#ffb347" strokeWidth={1.5} fill="url(#gm)" strokeDasharray="4 3" dot={false} />
                  <Area type="monotone" dataKey="nilai10" name="Nilai 10 Thn" stroke="#63d1a8" strokeWidth={2} fill="url(#g10)" dot={false} connectNulls={false} />
                  <Area type="monotone" dataKey="nilai20" name="Nilai 20 Thn" stroke="#638cff" strokeWidth={2} fill="url(#g20)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Insight box */}
            <div style={{
              marginTop: 16, background: "rgba(99,140,255,0.06)",
              border: "1px solid rgba(99,140,255,0.2)", borderRadius: 12, padding: "14px 18px",
            }}>
              <div style={{ fontSize: 11, color: "#638cff", letterSpacing: 1, marginBottom: 6 }}>💡 INSIGHT</div>
              <p style={{ margin: 0, fontSize: 12, color: "#8899aa", lineHeight: 1.8 }}>
                Dengan menginvestasikan <span style={{ color: "#e8f0fe" }}>{formatRupiah(monthly)}/bulan</span> selama{" "}
                <span style={{ color: "#638cff" }}>20 tahun</span>, nilai akhir Anda{" "}
                <span style={{ color: "#63d1a8" }}>{((last20?.nilai / last10?.nilai) || 0).toFixed(1)}× lebih besar</span>{" "}
                dibanding 10 tahun — padahal modal yang disetor hanya 2× lipat. Inilah kekuatan <em>compound interest</em>.
              </p>
            </div>
          </div>
        )}

        {activeTab === "table" && (
          <div style={{ marginTop: 24, overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 4px", fontSize: 11 }}>
              <thead>
                <tr>
                  {["Tahun", "Modal Disetor", "Nilai 10 Thn", "Bunga 10 Thn", "Nilai 20 Thn", "Bunga 20 Thn"].map(h => (
                    <th key={h} style={{
                      color: "#556677", fontWeight: 500, letterSpacing: 1, textAlign: "right",
                      padding: "8px 12px", fontSize: 10, textTransform: "uppercase",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data20.map((row, i) => {
                  const r10 = data10[i];
                  const isHalf = row.yearNum === 10;
                  return (
                    <tr key={row.year} style={{
                      background: isHalf ? "rgba(99,209,168,0.05)" : i % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent",
                    }}>
                      <td style={{ color: isHalf ? "#63d1a8" : "#8899aa", padding: "8px 12px", borderRadius: "8px 0 0 8px", fontWeight: isHalf ? 700 : 400 }}>{row.year}</td>
                      <td style={{ color: "#ffb347", padding: "8px 12px", textAlign: "right" }}>{formatRupiah(row.modal)}</td>
                      <td style={{ color: r10 ? "#63d1a8" : "#333", padding: "8px 12px", textAlign: "right" }}>{r10 ? formatRupiah(r10.nilai) : "—"}</td>
                      <td style={{ color: r10 ? "#4aaa88" : "#333", padding: "8px 12px", textAlign: "right" }}>{r10 ? formatRupiah(r10.bunga) : "—"}</td>
                      <td style={{ color: "#638cff", padding: "8px 12px", textAlign: "right" }}>{formatRupiah(row.nilai)}</td>
                      <td style={{ color: "#4a6ecc", padding: "8px 12px", borderRadius: "0 8px 8px 0", textAlign: "right" }}>{formatRupiah(row.bunga)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}
