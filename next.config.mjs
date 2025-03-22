let userConfig = undefined;
try {
    userConfig = await
    import ("./v0-user-next.config");
} catch (e) {
    // Ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        unoptimized: true,
    },
    experimental: {
        webpackBuildWorker: true,
        parallelServerBuildTraces: true,
        parallelServerCompiles: true,
    },
    env: {
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    },
};

// Merge userConfig with nextConfig
if (userConfig) {
    for (const key in userConfig) {
        if (typeof nextConfig[key] === "object" && !Array.isArray(nextConfig[key])) {
            nextConfig[key] = {...nextConfig[key], ...userConfig[key] };
        } else {
            nextConfig[key] = userConfig[key];
        }
    }
}

export default nextConfig;