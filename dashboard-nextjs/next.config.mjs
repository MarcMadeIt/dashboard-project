
/** @type {import('next').NextConfig} */

import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const nextConfig = {
    webpack: (config) => {
        // Alias '@' to the root directory
        config.resolve.alias['@'] = path.resolve(__dirname);

        return config;
    },
};

export default nextConfig;