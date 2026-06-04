# Hugging Face Setup Guide

Aplikasi ini telah diganti dari OpenAI ke **Hugging Face Mistral 7B Instruct**.

## Langkah Setup

### 1. Dapatkan API Key Hugging Face

1. Kunjungi [Hugging Face](https://huggingface.co/)
2. Buat akun atau login jika sudah punya
3. Pergi ke [Settings > Access Tokens](https://huggingface.co/settings/tokens)
4. Klik **"New token"**
5. Pilih **"Read"** permission (cukup untuk inference)
6. Beri nama token (misalnya: "ai-generator-app")
7. Copy token yang dihasilkan

### 2. Konfigurasi Environment Variable

Buka file `.env.local` dan update:

```env
HUGGINGFACE_API_KEY=hf_xxxxxxxxxxxxxxxxxxxxxxxxx
MOCK_MODE=false
```

Ganti `hf_xxxxxxxxxxxxxxxxxxxxxxxxx` dengan API key Anda.

### 3. Install Dependencies

Jalankan perintah berikut untuk menginstall package Hugging Face:

```bash
npm install
```

Atau jika menggunakan yarn:

```bash
yarn install
```

### 4. Jalankan Aplikasi

```bash
npm run dev
```

Aplikasi akan berjalan di http://localhost:3000

## Model yang Digunakan

- **Model**: `mistralai/Mistral-7B-Instruct-v0.2`
- **Provider**: Hugging Face Inference API
- **Tipe**: Text Generation
- **Parameter**:
  - `max_new_tokens`: 1000-1500
  - `temperature`: 0.7
  - `top_p`: 0.95

## Keuntungan Menggunakan Hugging Face

1. **Gratis**: Hugging Face menyediakan free tier yang cukup generous
2. **Open Source**: Mistral 7B adalah model open source
3. **Privacy**: Data tidak digunakan untuk training
4. **Performance**: Mistral 7B memiliki performa yang baik untuk ukurannya

## Batasan & Catatan

- Rate limit pada free tier: ~1000 requests/hari
- Response time mungkin lebih lambat dibanding OpenAI
- Kualitas output bisa berbeda dengan GPT-3.5
- Untuk production, pertimbangkan upgrade ke Hugging Face Pro

## Troubleshooting

### Error: "Model is loading"

Jika model sedang loading (cold start), tunggu beberapa detik dan coba lagi.

### Error: "Invalid API key"

Pastikan API key sudah benar dan memiliki permission "Read".

### Error: "Rate limit exceeded"

Anda telah mencapai limit API. Tunggu beberapa saat atau upgrade ke Pro.

### Error: "fetch failed" atau Network Error

**Aplikasi sekarang memiliki auto-fallback!**

Jika terjadi network error (firewall, proxy, DNS issues):
- Aplikasi otomatis fallback ke Mock Mode
- Anda tetap bisa melihat demo output
- Pesan warning akan muncul: "Using demo data due to network connectivity issues"

**Solusi Permanent:**
1. Set `MOCK_MODE=true` di `.env.local` untuk selalu pakai demo data
2. Cek koneksi internet dan firewall settings
3. Ganti DNS ke Google DNS (8.8.8.8) atau Cloudflare (1.1.1.1)
4. Jika di corporate network, request IT untuk whitelist `api-inference.huggingface.co`

📖 **Lihat [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) untuk solusi detail.**

## Mode Testing (Mock Mode)

Untuk testing tanpa menggunakan API credits:

```env
MOCK_MODE=true
```

Ini akan menggunakan data demo tanpa memanggil Hugging Face API.

## Alternatif Model

Anda bisa mengganti model di `pages/api/generate.ts`:

```typescript
// Ganti MODEL_ID dengan model lain:
const MODEL_ID = 'mistralai/Mistral-7B-Instruct-v0.2' // Current
// const MODEL_ID = 'meta-llama/Llama-2-7b-chat-hf' // Alternative
// const MODEL_ID = 'HuggingFaceH4/zephyr-7b-beta' // Alternative
```

## Dokumentasi Resmi

- [Hugging Face Inference API](https://huggingface.co/docs/api-inference/index)
- [Mistral 7B Model Card](https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.2)
- [@huggingface/inference Package](https://www.npmjs.com/package/@huggingface/inference)
