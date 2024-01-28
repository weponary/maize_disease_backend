import { hashPassword } from "../user/userBusiness";
import { IUserService } from "../user/userService";
import genrateToken from "../utils/helper/genereteToken";
import bycrypt from "bcryptjs";
import IJwtHelperClass from "../utils/helper/jwtHelper";
import { IPayloadUser } from "../types/custom";

export interface IAuthService {
  verifyAccount(token: string): Promise<[affectedCount: number]>;
}

class AuthService implements IAuthService {
  private _userService;
  private _jwtHelper;
  constructor(
    protected userService: IUserService,
    protected jwtHelper: IJwtHelperClass
  ) {
    this._userService = userService;
    this._jwtHelper = jwtHelper;
  }

  async verifyAccount(token: string) {
    const checkUser = await this._userService.getUser("verifyToken", token);
    if (!checkUser) {
      throw {
        code: 404,
        message: "User Not Found",
      };
    }
    if (checkUser.verified) {
      throw {
        code: 403,
        message: "Already Verified !!!",
      };
    }
    const verifyemail = await this._userService.updateUser(
      Number(checkUser.id),
      {
        verified: true,
      }
    );
    return verifyemail;
  }

  async forgetPassword(email: string) {
    const checkUser = await this._userService.getUser("email", email);
    if (!checkUser) {
      throw {
        code: 404,
        message: "User not found ",
      };
    }
    const token = genrateToken();
    const setResetToken = await this._userService.updateUser(
      Number(checkUser.id),
      { resetPasswordToken: token }
    );
    return { checkUser, token };
  }
  async changePassword(token: string, password: string) {
    const checkUser = await this._userService.getUser(
      "resetPasswordToken",
      token
    );
    if (!checkUser) {
      throw {
        message: "User not found",
        code: 404,
      };
    }
    const hashedPassword = await hashPassword(password);
    const updatePassword = await this._userService.updateUser(
      Number(checkUser.id),
      {
        password: hashedPassword,
        resetPasswordToken: null,
      }
    );
    return updatePassword;
  }

  async login(data: any) {
    const checkUser = await this._userService.getUser("email", data.email);

    console.log("email", checkUser);

    if (!checkUser) {
      throw {
        message: "User not Found",
        code: 404,
      };
    }
    if (!checkUser.verified) {
      throw {
        code: 403,
        message: "Please verify your account",
      };
    }
    const checkPassword = await bycrypt.compare(
      data.password,
      checkUser.password
    );
    if (!checkPassword) {
      throw {
        message: "Invalid Credential",
        code: 403,
      };
    }
    const payload: IPayloadUser = {
      id: checkUser.id,
      email: checkUser.email,
      role: checkUser.role,
    };
    const generteAccessToken = this._jwtHelper.createJwtTokens(payload);
    return { ...checkUser, accessToken: generteAccessToken.accessToken };
  }
  async adminLogin(data: any) {
    const checkUser = await this._userService.getUser("email", data.email);
    if (!checkUser) {
      throw {
        message: "User not Found",
        code: 404,
      };
    }
    if (checkUser.role !== "admin") {
      throw {
        code: 404,
        message: "User not Found",
      };
    }
    const checkPassword = await bycrypt.compare(
      data.password,
      checkUser.password
    );
    if (!checkPassword) {
      throw {
        message: "Invalid Credential",
        code: 403,
      };
    }
    const payload: IPayloadUser = {
      id: checkUser.id,
      email: checkUser.email,
      role: checkUser.role,
    };
    const generteAccessToken = this._jwtHelper.createJwtTokens(payload);
    return { ...checkUser, accessToken: generteAccessToken.accessToken };
  }
}
export default AuthService;
