/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "loremflickr.com"],
    loader: "imgix",
    loaderFile: "./imgix-loader.ts",
  },
};

module.exports = nextConfig;

// module.exports = {
//   reactStrictMode: true,
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "res.cloudinary.com",
//         port: "",
//         pathname: "/account123/**",
//       },
//     ],
//   },
// };
