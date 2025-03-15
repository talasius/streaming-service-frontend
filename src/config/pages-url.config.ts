class PAGES_CONFIG {
	private readonly home = '/';
	private readonly auth = '/account';
	private readonly root = '/dashboard';
	private readonly streams = '/streams';

	public HOME = this.home;

	public ACCOUNT = this.auth;
	public LOGIN = `${this.auth}/login`;
	public REGISTER = `${this.auth}/create`;
	public FORGOT_PASSWORD = `${this.auth}/recovery`;

	public DASHBOARD = this.root;
	public SETTINGS = `${this.root}/settings`;

	public STREAMS = this.streams;

	public SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL as string;
	public MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL as string;
}

export const PAGES = new PAGES_CONFIG();
