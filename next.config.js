/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	compiler: {
		styledComponents: true,
	},
	// redirects: async () => {}
	webpack: (config, { isServer }) => {
		if (!isServer) {
			config.resolve.fallback = {
				...config.resolve.fallback,
				fs: false,
			};
		}

		return config;
	},
};

module.exports = nextConfig;
