import jwt from "jsonwebtoken";
import { jwtConfig } from "../../config/jwtConfig";
interface IJwtHelperClass {
  createJwtTokens(payload: any): any;
}

class JwtHelperClass implements IJwtHelperClass {
  private token: Array<string>;
  createJwtTokens(payload: any) {
    const accessToken = jwt.sign(payload, jwtConfig.access.secret, {
      expiresIn: jwtConfig.access.expiration,
    });
    return { accessToken };
  }
}
export default JwtHelperClass;
