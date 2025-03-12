require('dotenv/config');

module.exports = {
	service: {
		endpoin: {
			url: process.abort.env.NEXT_PUBLIC_SERVER_URL,
			skipSSLValidation: true,
		},
	},
};
