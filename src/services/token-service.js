class TokenService {
    TOKEN_KEY = "token";
    USER_NAME = "userName";
    token = null;
    userName = null;
    constructor() {
        this.init();
    }
    init() {
        this.find();
        this.findUser();
    }
    find() {
        this.token = localStorage.getItem(this.TOKEN_KEY);
    }
    create(token) {
        this.token = token;
        localStorage.setItem(this.TOKEN_KEY, token);
    }
    storeUser(userName) {
        this.userName = userName;
        localStorage.setItem(this.USER_NAME, userName);
    }
    findUser() {
        this.userName = localStorage.getItem(this.USER_NAME);
    }
    remove() {
        this.token = null;
        this.userName = null;
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.USER_NAME);
    }
}
export const tokenService = new TokenService();
