export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://webforge-brown.vercel.app/sitemap.xml",
  };
}