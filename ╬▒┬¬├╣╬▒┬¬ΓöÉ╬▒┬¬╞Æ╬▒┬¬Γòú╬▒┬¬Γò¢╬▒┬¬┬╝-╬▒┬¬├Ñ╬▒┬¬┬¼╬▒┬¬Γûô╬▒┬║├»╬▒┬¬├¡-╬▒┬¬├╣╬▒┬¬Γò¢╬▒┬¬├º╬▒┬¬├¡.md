# গিটহাবে আপলোড করার গাইড (বাংলা)

এই ফোল্ডারটাই আপনার রিপো। মোট সাইজ **প্রায় ৪ MB**, ৪৪টি ফাইল — GitHub-এর সব লিমিটের অনেক নিচে
(প্রতি ফাইল সর্বোচ্চ ২৫ MB ওয়েব আপলোডে, ১০০ MB git-এ; একবারে ১০০ ফাইল)।

> ⚠️ **জীপ ফাইলটা গিটহাবে আপলোড করবেন না** — GitHub জীপ খোলে না, শুধু ফাইলটা পড়ে থাকবে।
> আগে **আনজিপ** করুন, তারপর ভেতরের ফাইলগুলো আপলোড করুন।

---

## উপায় ১ — ওয়েবসাইট থেকে (সবচেয়ে সহজ)

1. GitHub-এ নতুন রিপো তৈরি করুন (Public) — README/ gitignore কিছু যোগ করবেন না।
2. রিপোতে ঢুকে **Add file ▸ Upload files**।
3. আনজিপ করা ফোল্ডারের **ভেতরের সব ফাইল ও ফোল্ডার** সিলেক্ট করে ড্র্যাগ করুন
   (`index.html`, `assets` ফোল্ডার, `README.md`, `.nojekyll`, `robots.txt`, `sitemap.xml`, `screenshots`)।
   - `.gitignore` / `.nojekyll` মাঝে মাঝে হাইডেন-ফাইল বলে দেখা যায় না; না উঠলেও সমস্যা নেই।
4. নিচে **Commit changes** চাপুন।
5. **Settings ▸ Pages ▸ Source: Deploy from a branch ▸ Branch: `main` / `/ (root)` ▸ Save**।
   এক-দুই মিনিট পর সাইট লাইভ: `https://<user>.github.io/<repo>/`

---

## উপায় ২ — কমান্ড লাইন (সবচেয়ে নিশ্চিত)

```bash
cd <আনজিপ-করা-ফোল্ডার>
git init
git add .
git commit -m "Solar Shop home page — hero with team-photo slider"
git branch -M main
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
```

তারপর Settings ▸ Pages থেকে একইভাবে চালু করুন।

---

## সাধারণ সমস্যা

| সমস্যা | কারণ / সমাধান |
|---|---|
| “Yowza, that’s a big file” | ওয়েব আপলোডে ২৫ MB-র বেশি ফাইল। এই প্যাকেজে সবচেয়ে বড় ফাইল ~৩৪০ KB, তাই হবে না। |
| ছবি/ফন্ট দেখা যাচ্ছে না | `assets` ফোল্ডার পুরোটা আপলোড হয়নি। ফোল্ডার ধরে ড্র্যাগ করুন। |
| সাইট ৪০৪ দেখাচ্ছে | Pages-এ Branch `main` আর ফোল্ডার `/ (root)` সিলেক্ট করা হয়নি। |
| পুরনো ভার্সন দেখাচ্ছে | ১–২ মিনিট অপেক্ষা করুন, বা `Ctrl+Shift+R` দিয়ে রিফ্রেশ করুন। |
| কাস্টম ডোমেইন | `CNAME.sample` → `CNAME` রিনেম করে ভেতরে ডোমেইন লিখুন, তারপর Pages-এ ডোমেইন সেট করুন। |
