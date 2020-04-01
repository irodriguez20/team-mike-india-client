class TokenService {
  TOKEN_KEY = "token";
  USER_NAME = "userName";
  USER_ID = "userId";
  token = null;
  userName = null;
  userID = null;
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
  storeUserID(userID) {
    this.userID = userID;
    window.localStorage.setItem(this.USER_ID, userID);
  }
  findUser() {
    this.userName = window.localStorage.getItem(this.USER_NAME);
  }
  findUserID() {
    this.userID = window.localStorage.getItem(this.USER_ID);
  }
  hasAuthToken() {
    return !!this.findToken();
  }
  remove() {
    this.token = null;
    this.userName = null;
    this.userID = null;
    window.localStorage.removeItem(this.TOKEN_KEY);
    window.localStorage.removeItem(this.USER_NAME);
    window.localStorage.removeItem(this.USER_ID);
  }
}
export const tokenService = new TokenService();
