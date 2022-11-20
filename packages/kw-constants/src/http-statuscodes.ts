enum HttpStatusCodes {
	STATUS100CONTINUE = 100,
	STATUS200OK = 200,
	STATUS204NO_CONTENT = 204,
	STATUS301MOVED_PERMANENTLY = 301,
	STATUS302MOVED_TEMPORARILY = 302,
	STATUS400BAD_REQUEST = 400,
	STATUS401UNAUTHORIZED = 401,
	STATUS403FORBIDDEN = 403,
	STATUS404NOT_FOUND = 404,
	STATUS500INTERNAL_SERVER_ERROR = 500,
	STATUS502BAD_GATEWAY = 502,
	STATUS503SERVICE_UNAVAILABLE = 503,
	STATUS504GATEWAY_TIMEOUT = 504,
}

export default HttpStatusCodes;
