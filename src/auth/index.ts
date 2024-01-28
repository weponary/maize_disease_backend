import userService from "../user";
import AuthService from "./authService";
import JwtHelperClass from "../utils/helper/jwtHelper";

const jwthelper = new JwtHelperClass();
const authService = new AuthService(userService, jwthelper);

export default authService;
