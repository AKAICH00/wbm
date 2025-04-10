/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.ctfassets.net'],
  },
  // Add server configuration to fix HTTP 431 errors with Clerk
  experimental: {
    serverComponentsExternalPackages: ['@clerk/backend'],
  },
  // Increase header size limit
  httpAgentOptions: {
    keepAlive: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Connection',
            value: 'keep-alive',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
