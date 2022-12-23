/* eslint-disable turbo/no-undeclared-env-vars */
export default () => ({
	node_env: process.env.NODE_ENV,
	port: process.env.PORT,
	db_url: process.env.DB_URL,
	jwt: {
		token_secret: process.env.JWT_TOKEN_SECRET,
		token_expiration_time: process.env.JWT_TOKEN_EXPIRATION_TIME,
	},
	passport: {
		google: {
			client_id: process.env.GOOGLE_CLIENT_ID,
			client_secret: process.env.GOOGLE_CLIENT_SECRET,
			callback_url: process.env.GOOGLE_CALLBACK_URL,
		},
	},
});
