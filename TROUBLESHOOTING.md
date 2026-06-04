# Troubleshooting Guide

## Error: "fetch failed" - ENOTFOUND api-inference.huggingface.co

### Penyebab
Error ini terjadi karena aplikasi tidak bisa mengakses API Hugging Face. Kemungkinan penyebabnya:

1. **Koneksi Internet Bermasalah**
2. **Firewall/Proxy Memblokir Akses**
3. **DNS tidak bisa resolve domain Hugging Face**
4. **VPN atau Network Security memblokir akses**

### Solusi

#### Solusi 1: Gunakan Mock Mode (Paling Mudah)

Set `MOCK_MODE=true` di file `.env.local`:

```env
HUGGINGFACE_API_KEY=your-token-here
MOCK_MODE=true
```

Restart server:
```bash
npm run dev
```

Aplikasi akan menggunakan data demo tanpa memanggil API.

#### Solusi 2: Cek Koneksi Internet

Test koneksi ke Hugging Face:

```bash
# Windows (CMD)
ping api-inference.huggingface.co

# Windows (PowerShell)
Test-Connection api-inference.huggingface.co
```

Jika ping gagal, coba:
1. Restart router/modem
2. Ganti DNS ke Google DNS (8.8.8.8) atau Cloudflare (1.1.1.1)
3. Disable VPN sementara

#### Solusi 3: Bypass Firewall/Proxy

Jika Anda di jaringan kantor/sekolah:

1. **Coba dengan Mobile Hotspot**
   - Gunakan koneksi dari HP Anda
   - Bypass network restrictions

2. **Tambahkan ke Whitelist Firewall**
   - Domain: `api-inference.huggingface.co`
   - Port: 443 (HTTPS)

3. **Gunakan VPN**
   - Jika network memblokir Hugging Face
   - Coba VPN seperti ProtonVPN (free tier)

#### Solusi 4: Ganti DNS

**Windows:**

1. Buka Control Panel > Network and Sharing Center
2. Click "Change adapter settings"
3. Right-click network adapter > Properties
4. Select "Internet Protocol Version 4 (TCP/IPv4)"
5. Click "Properties"
6. Select "Use the following DNS server addresses":
   - Preferred: `8.8.8.8` (Google DNS)
   - Alternate: `8.8.4.4`
7. Click OK dan restart

**Atau via CMD (Admin):**

```bash
netsh interface ip set dns "Wi-Fi" static 8.8.8.8
netsh interface ip add dns "Wi-Fi" 8.8.4.4 index=2
```

#### Solusi 5: Clear DNS Cache

```bash
# Windows
ipconfig /flushdns
```

#### Solusi 6: Pakai API Token yang Benar

Pastikan API token Hugging Face valid:

1. Login ke https://huggingface.co/
2. Pergi ke https://huggingface.co/settings/tokens
3. Buat token baru dengan permission "Read"
4. Copy dan paste ke `.env.local`:

```env
HUGGINGFACE_API_KEY=hf_xxxxxxxxxxxxxxxxxxxxx
MOCK_MODE=false
```

#### Solusi 7: Auto-Fallback (Sudah Diimplementasikan)

Aplikasi sekarang sudah memiliki auto-fallback:
- Jika koneksi gagal, otomatis gunakan mock data
- User akan melihat pesan: "Using demo data due to network connectivity issues"

## Error: "Model is loading"

### Penyebab
Model Hugging Face sedang cold start (loading pertama kali).

### Solusi
1. Tunggu 10-30 detik
2. Coba lagi request yang sama
3. Model akan stay warm setelah first request

## Error: "Rate limit exceeded"

### Penyebab
Anda sudah mencapai limit free tier Hugging Face (~1000 requests/hari).

### Solusi
1. **Tunggu 24 jam** sampai reset
2. **Upgrade ke Hugging Face Pro** ($9/bulan)
3. **Gunakan Mock Mode** sementara:
   ```env
   MOCK_MODE=true
   ```

## Error: "Invalid API key" atau "Unauthorized"

### Penyebab
API token tidak valid atau expired.

### Solusi
1. Cek `.env.local` - pastikan ada `HUGGINGFACE_API_KEY`
2. Token harus diawali dengan `hf_`
3. Buat token baru di https://huggingface.co/settings/tokens
4. Restart development server setelah update token

## Error: Slow Response / Timeout

### Penyebab
- Model masih loading (cold start)
- Network lambat
- Hugging Face API overloaded

### Solusi
1. **Increase timeout di code** (optional)
2. **Gunakan model yang lebih kecil**:
   ```typescript
   const MODEL_ID = 'microsoft/phi-2' // Lebih cepat
   ```
3. **Pakai Mock Mode** untuk testing cepat

## Error: "npm audit" vulnerabilities

### Penyebab
Dependencies memiliki known vulnerabilities.

### Solusi (Optional)
```bash
npm audit fix
# Atau
npm audit fix --force  # Hati-hati: bisa breaking changes
```

**Note**: Ini warning biasa dan tidak mempengaruhi development.

## Network Configuration untuk Corporate Environment

Jika di jaringan kantor yang strict:

### 1. Request IT untuk Whitelist

Domain yang perlu diwhitelist:
```
api-inference.huggingface.co
huggingface.co
cdn-lfs.huggingface.co
```

Port:
```
443 (HTTPS)
```

### 2. Proxy Configuration

Jika perlu proxy, tambahkan di environment:

```env
# .env.local
HTTP_PROXY=http://proxy.company.com:8080
HTTPS_PROXY=http://proxy.company.com:8080
NO_PROXY=localhost,127.0.0.1
```

### 3. Self-Signed Certificate Issues

Jika masalah dengan SSL:

```bash
# Sementara (not recommended for production)
set NODE_TLS_REJECT_UNAUTHORIZED=0
npm run dev
```

## Quick Test Checklist

✅ Checklist debug cepat:

1. [ ] Cek file `.env.local` ada dan terisi
2. [ ] API token dimulai dengan `hf_`
3. [ ] Restart dev server setelah update env
4. [ ] Coba ping `api-inference.huggingface.co`
5. [ ] Coba set `MOCK_MODE=true` dulu
6. [ ] Cek console browser dan terminal untuk error details
7. [ ] Pastikan Node.js version 18+

## Masih Error?

### Debug Mode

Tambahkan logging di `pages/api/generate.ts`:

```typescript
console.log('HUGGINGFACE_API_KEY exists:', !!process.env.HUGGINGFACE_API_KEY)
console.log('MOCK_MODE:', MOCK_MODE)
console.log('MODEL_ID:', MODEL_ID)
```

### Test API Token Manual

Test token via curl:

```bash
curl https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2 \
  -H "Authorization: Bearer hf_xxxxx"
```

Ganti `hf_xxxxx` dengan token Anda.

## Alternative: Ganti ke Model Lain

Jika Mistral 7B bermasalah, coba model lain di `pages/api/generate.ts`:

```typescript
// Model alternatives:
const MODEL_ID = 'google/flan-t5-large'  // Lebih stabil
// const MODEL_ID = 'microsoft/phi-2'     // Lebih cepat
// const MODEL_ID = 'tiiuae/falcon-7b-instruct'  // Alternative
```

## Rekomendasi untuk Production

Untuk production deployment:

1. **Gunakan Hugging Face Pro** ($9/bulan) - higher rate limits
2. **Deploy model sendiri** di Hugging Face Inference Endpoints
3. **Atau gunakan OpenAI** (lebih stabil tapi berbayar)
4. **Implement retry logic** dengan exponential backoff
5. **Cache responses** untuk transcript yang sama

## Contact Support

Jika masih error setelah semua solusi di atas:

1. Cek Hugging Face Status: https://status.huggingface.co/
2. Forum: https://discuss.huggingface.co/
3. GitHub Issues: Report di repository ini
