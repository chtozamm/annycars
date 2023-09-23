/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.img.avito.st',
            },
            {
                protocol: 'https',
                hostname: 'avatars.mds.yandex.net',
            },
            {
                protocol: 'https',
                hostname: 'yastatic.net',
            },
        ],
    }
}

module.exports = nextConfig
