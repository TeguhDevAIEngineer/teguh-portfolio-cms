import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Gemini AI content helper
  app.post("/api/gemini/helper", async (req, res) => {
    try {
      const { prompt, type, currentText } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: "Prompt/topik wajib diisi." });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey === "") {
        console.log("No valid GEMINI_API_KEY found, returning simulated layout.");
        return res.json({
          text: `[Dibuat oleh AI Pembantu - Simulasi]\n\nBerikut adalah draf tulisan profesional yang siap dipublikasikan:\n\n### **Pengembangan Portofolio Digital dengan Arsitektur Minimalis**\n\nDalam lanskap digital modern, kehadiran portofolio yang bersih dan cepat adalah kunci utama untuk memikat klien potensial. Karya ini mengutamakan kecepatan performa yang optimal dan estetika visual "clean minimalis" tanpa ornamen berlebih.\n\n#### **Mengapa Memilih Pendekatan Ini?**\n* **Fokus pada Konten**: Desain yang sederhana menonjolkan esensi proyek kreatif dan kode Anda secara langsung.\n* **Kecepatan Akses Tinggi**: Meminimalisir pemakaian elemen berat sehingga optimal diakses dari seluler/desktop.\n* **Kemudahan Navigasi**: Alur halaman yang intuitif memberikan pengalaman menyenangkan bagi pengunjung profesional.\n\n*Draft asisten selesai dirancang. Konfigurasikan GEMINI_API_KEY Anda untuk hasil dinamis yang lebih spesifik!*`
        });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const systemInstruction = `Kamu adalah asisten penulis cerdas berbahasa Indonesia untuk Teguh Rahayu, S1 Teknik Informatika ahli Sistem Informasi Berbasis Web, Pengelolaan Database, dan IT Support. ` +
        (type === "blog" 
          ? "Bantu menulis artikel blog bertema teknik komputer, tips IT, pengembangan web, koding, database, atau pengenalan karir programmer. Format output harus berupa tulisan Markdown tanpa judul pendahulu yang tidak relevan." 
          : "Bantu merumuskan deskripsi proyek koding portofolio agar berisikan masalah, solusi, teknologi, dan tautan jika perlu dalam format point-point Markdown yang sangat terstruktur dan persuasif bagi calon klien.");

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Konteks/Topik: ${prompt}\n\nTeks saat ini: ${currentText || ""}\n\nBuat deskripsi/artikel berkualitas tinggi dan kembalikan hanya kontennya dalam Markdown:`,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: error.message || "Gagal menghubungi AI Assistant" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
