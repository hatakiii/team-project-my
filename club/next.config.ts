import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Энд бусад тохиргоогоо бичиж болно
};

// Хөгжүүлэлтийн үед Cloudflare-ийн орчныг идэвхжүүлэх
if (process.env.NODE_ENV === "development") {
  // await-гүйгээр шууд дуудаж үзнэ.
  // Хэрэв заавал await шаардлагатай гэвэл IIFE (Immediate Invoked Function Expression) ашиглана.
  (async () => {
    await setupDevPlatform();
  })().catch((err) => console.error(err));
}

export default nextConfig;
