class PAGES_CONFIG {
	private readonly auth = '/account';
	private readonly root = '/dashboard';

	public ACCOUNT = this.auth;
	public LOGIN = `${this.auth}/login`;
	public REGISTER = `${this.auth}/create`;
	public FORGOT_PASSWORD = `${this.auth}/recovery`;

	public HOME = this.root;
	public SETTINGS = `${this.root}/settings`;
}

export const PAGES = new PAGES_CONFIG();
