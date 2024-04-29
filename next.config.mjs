/** @type {import('next').NextConfig} */
const nextConfig = {
  // add image remote pattern
  // https://images.ctfassets.net/
  images: {
    remotePatterns: [{ hostname: "images.ctfassets.net", protocol: "https"}],
  },
};

export default nextConfig;
