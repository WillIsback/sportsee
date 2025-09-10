/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
  serverActions: {
    allowedOrigins: [
        '17qfp5j4-8000.uks1.devtunnels.ms',
        'localhost:3000',
        '*.devtunnels.ms',
        '17qfp5j4-3000.uks1.devtunnels.ms'
    ],
  },
},
};

export default nextConfig;
