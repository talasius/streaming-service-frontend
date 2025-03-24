class PAGES_CONFIG {
	private readonly home = '/';
	private readonly auth = '/account';
	private readonly dashboard = '/dashboard';
	private readonly streams = '/streams';

	//Root routes
	public HOME = this.home;
	public CATEGORIES = `${this.home}/categories`;

	//Account routes
	public ACCOUNT = this.auth;
	public LOGIN = `${this.auth}/login`;
	public REGISTER = `${this.auth}/create`;
	public FORGOT_PASSWORD = `${this.auth}/recovery`;
	public DEACTIVATE = `${this.auth}/deactivate`;

	//Dashboard routes
	public DASHBOARD = this.dashboard;
	public SETTINGS = `${this.dashboard}/settings`;
	public KEYS = `${this.dashboard}/keys`;
	public CHAT = `${this.dashboard}/chat`;
	public FOLLOWERS = `${this.dashboard}/followers`;
	public SPONSORS = `${this.dashboard}/sponsors`;
	public PLANS = `${this.dashboard}/plans`;
	public TRANSACTIONS = `${this.dashboard}/transactions`;

	//Stream routes
	public STREAMS = this.streams;

	public SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL as string;
	public MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL as string;
}

export const PAGES = new PAGES_CONFIG();

