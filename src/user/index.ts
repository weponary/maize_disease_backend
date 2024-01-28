import sequelize from "../config/dbSetup";
import User from "./user";
import UserService, { IUserService } from "./userService";

const userReposiratory  = sequelize.getRepository(User)

const userService: IUserService = new UserService(userReposiratory)

export default userService;