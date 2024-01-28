import {
  Column,
  DataType,
  Default,
  DefaultScope,
  HasMany,
  Model,
  Scopes,
  Table,
  Unique,
} from "sequelize-typescript";
import Detect from "../detect/detect";

export type IUser = {
  [x: string]: any;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  role: string;
  verified?: boolean;
  resetPasswordToken?: string;
  verifyToken?: string;
};
type role = "admin" | "user";

@Table({ timestamps: true })
class User extends Model {
  @Column
  password: string;

  @Unique
  @Column
  email: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  resetPasswordToken: string;

  @Column
  verifyToken: string;

  @Column
  verified: boolean;

  @Default("user")
  @Column(DataType.ENUM("admin", "user"))
  role: role;

  @HasMany(() => Detect, {
    onDelete: "CASCADE",
  })
  detect: Detect[];
}

export default User;
