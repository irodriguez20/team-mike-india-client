class TokenService {
    TOKEN_KEY = "token";
    USER_NAME = "userName";
    token = null;
    userName = null;
    constructor() {
        this.init();
    }
    init() {
        this.findToken();
        this.findUser();
    }
    findToken() {
        this.token = window.localStorage.getItem(this.TOKEN_KEY);
    }
    create(token) {
        this.token = token;
        window.localStorage.setItem(this.TOKEN_KEY, token);
    }
    storeUser(userName) {
        this.userName = userName;
        window.localStorage.setItem(this.USER_NAME, userName);
    }
    findUser() {
        this.userName = window.localStorage.getItem(this.USER_NAME);
    }
    hasAuthToken() {
        return !!this.findToken()
    }
    remove() {
        this.token = null;
        this.userName = null;
        window.localStorage.removeItem(this.TOKEN_KEY);
        window.localStorage.removeItem(this.USER_NAME);
    }
}
export const tokenService = new TokenService();
