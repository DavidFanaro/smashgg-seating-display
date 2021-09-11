const config = {
	mode: "jit",
	purge: [
		"./src/**/*.{html,js,svelte,ts}",
	],
	theme: {
		fontFamily:{
			'mono': ['ui-monospace', 'SFMono-Regular']

		},
		extend: {
		},
	},
	plugins: [],
};

module.exports = config;
