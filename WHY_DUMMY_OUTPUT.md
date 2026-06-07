# ⚠️ Why Am I Getting Dummy/Demo Output?

## 🔍 Problem

User/Reviewer melihat output yang **DUMMY** atau **DEMO data**, bukan hasil AI generation yang real.

Output akan ada text seperti:
```
PRODUCT REQUIREMENTS DOCUMENT (DEMO MODE)
...
Note: This is a demo/mock output. For production use, connect a valid API key.
```

---

## 🎯 Root Cause

Aplikasi running dalam **MOCK MODE** karena **Environment Variable tidak di-set** di Vercel deployment!

### Kondisi MOCK MODE:

```typescript
const MOCK_MODE = process.env.MOCK_MODE === 'true' || !process.env.HUGGINGFACE_API_KEY
```

MOCK_MODE akan aktif jika:
1. ✅ `MOCK_MODE=true` di-set explicitly, ATAU
2. ❌ **`HUGGINGFACE_API_KEY` tidak ada/kosong** ← INI MASALAHNYA!

---

## ✅ SOLUTION: Set Environment Variable di Vercel

### Step-by-Step Fix:

#### 1. **Login ke Vercel Dashboard**
   ```
   https://vercel.com/dashboard
   ```

#### 2. **Pilih Project Anda**
   - Cari project: `ai-generator`
   - Click untuk masuk ke project settings

#### 3. **Go to Environment Variables**
   - Click tab **"Settings"**
   - Scroll atau click **"Environment Variables"** di sidebar

#### 4. **Add HUGGINGFACE_API_KEY** ⚠️ PENTING!

   Click **"Add New"**:
   
   ```
   Key: HUGGINGFACE_API_KEY
   Value: hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
   
   **Environments to select:**
   - ✅ **Production**
   - ✅ **Preview**
   - ✅ **Development**
   
   Select **ALL THREE** environments!

#### 5. **Get Hugging Face Token** (jika belum punya)

   a. Login: https://huggingface.co/
   
   b. Go to tokens: https://huggingface.co/settings/tokens
   
   c. Click **"New token"**:
      - Name: `ai-generator-production`
      - Role: **Read**
   
   d. Click **"Generate token"**
   
   e. **Copy token** (starts with `hf_`)

#### 6. **Redeploy** ⚠️ CRITICAL!

   Setelah add environment variable, MUST redeploy:
   
   **Option A: Via Dashboard**
   - Go to **"Deployments"** tab
   - Click **"..."** (3 dots) pada latest deployment
   - Click **"Redeploy"**
   
   **Option B: Trigger New Deployment**
   - Push new commit ke GitHub
   - Atau click "Redeploy" di dashboard

#### 7. **Verify**

   a. Check logs:
      - Deployments → Latest → Click to see logs
      - Look for: `Using real API: true`
   
   b. Test aplikasi:
      - Generate PRD dengan transcript
      - Output **TIDAK boleh** ada text "DEMO MODE"
      - Output harus hasil AI generation yang relevan

---

## 🔍 How to Check Current Status

### Via Vercel Dashboard:

1. **Check Environment Variables**
   ```
   Settings → Environment Variables
   ```
   Pastikan ada: `HUGGINGFACE_API_KEY` untuk Production, Preview, Development

2. **Check Function Logs**
   ```
   Deployments → Click latest → Function Logs
   ```
   
   Look for:
   ```
   === API Configuration ===
   MOCK_MODE: false           ← Should be FALSE!
   HUGGINGFACE_API_KEY exists: true   ← Should be TRUE!
   Using real API: true       ← Should be TRUE!
   ```
   
   If you see:
   ```
   MOCK_MODE: true            ← BAD!
   HUGGINGFACE_API_KEY exists: false  ← BAD!
   Using real API: false      ← BAD!
   ```
   → Environment variable TIDAK di-set!

### Via Application Test:

1. Generate PRD with any transcript
2. Check output:
   - ❌ **Has "DEMO MODE"** = Environment variable not set
   - ✅ **Real AI content** = Working correctly

---

## 📋 Checklist Before Submitting to Reviewer

- [ ] ✅ Hugging Face account created
- [ ] ✅ API token generated (starts with `hf_`)
- [ ] ✅ Environment variable `HUGGINGFACE_API_KEY` added di Vercel
- [ ] ✅ Variable set for ALL environments (Production, Preview, Development)
- [ ] ✅ Redeployed after adding variable
- [ ] ✅ Tested: Output is REAL AI generation (not demo data)
- [ ] ✅ Logs show: `MOCK_MODE: false` and `Using real API: true`

---

## 🚨 Common Mistakes

### ❌ Mistake 1: Added Variable but Didn't Redeploy

**Symptom**: Variable exists in settings, but app still shows demo data

**Fix**: MUST redeploy after adding/changing environment variables!

### ❌ Mistake 2: Only Set for Production Environment

**Symptom**: Works in production, but preview deployments show demo data

**Fix**: Select ALL environments when adding variable (Production, Preview, Development)

### ❌ Mistake 3: Wrong Variable Name

**Symptom**: Variable set, but app still in demo mode

**Fix**: Variable name MUST be exactly: `HUGGINGFACE_API_KEY` (case-sensitive!)

### ❌ Mistake 4: Set MOCK_MODE=true

**Symptom**: API key is set, but still demo data

**Fix**: Remove `MOCK_MODE` variable, or set it to `false`

### ❌ Mistake 5: Token Invalid or Expired

**Symptom**: Error in logs about unauthorized or invalid token

**Fix**: Generate new token at https://huggingface.co/settings/tokens

---

## 🎯 Quick Fix Commands

### If Using Vercel CLI:

```bash
# Add environment variable
vercel env add HUGGINGFACE_API_KEY production
# Paste your token: hf_xxxxx

vercel env add HUGGINGFACE_API_KEY preview
# Paste your token: hf_xxxxx

vercel env add HUGGINGFACE_API_KEY development
# Paste your token: hf_xxxxx

# Redeploy
vercel --prod
```

---

## 🆘 Still Getting Demo Output?

### Debug Steps:

1. **Check Vercel Dashboard logs**:
   ```
   Deployments → Latest → Runtime Logs
   ```
   
   Look for the startup log:
   ```
   === API Configuration ===
   MOCK_MODE: false or true?
   HUGGINGFACE_API_KEY exists: true or false?
   ```

2. **Verify Token is Valid**:
   Test token dengan curl:
   ```bash
   curl https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2 \
     -H "Authorization: Bearer hf_xxxxx"
   ```
   
   Should return 200 OK or model info (not 401 Unauthorized)

3. **Check Browser Console**:
   Open browser DevTools → Network tab → XHR
   Check response from `/api/generate`
   Look for `_debug` field:
   ```json
   {
     "_debug": {
       "mockMode": false,  ← Should be false
       "hasApiKey": true   ← Should be true
     }
   }
   ```

---

## ✅ Success Indicators

Aplikasi bekerja dengan benar jika:

✅ **Logs show**:
```
=== API Configuration ===
MOCK_MODE: false
HUGGINGFACE_API_KEY exists: true
HUGGINGFACE_API_KEY length: 37 (or similar)
Using real API: true
=========================
```

✅ **Output shows**:
- Real AI-generated content based on transcript
- NO "DEMO MODE" warning
- NO "Note: This is a demo/mock output" text
- Content is specific to the input transcript

✅ **First request might be slow** (20-30 seconds) due to model cold start - this is normal!

---

## 📚 Related Documentation

- [HUGGINGFACE_SETUP.md](./HUGGINGFACE_SETUP.md) - Full Hugging Face setup
- [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md) - Deployment guide
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - General troubleshooting

---

## 🎉 Summary

**Problem**: Output is dummy/demo data
**Cause**: `HUGGINGFACE_API_KEY` not set in Vercel environment variables
**Solution**: Add `HUGGINGFACE_API_KEY` in Vercel Dashboard → Settings → Environment Variables → Redeploy

**Time to fix**: 2-3 minutes
**Impact**: Changes from demo data to real AI generation

---

**Remember**: Environment variables MUST be set in Vercel Dashboard AND you MUST redeploy for changes to take effect!
