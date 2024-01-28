import { Transaction } from "sequelize/types";
import { Repository } from "sequelize-typescript";
import User, { IUser } from "./user";
import { hashPassword } from "./userBusiness";
import genrateToken from "../utils/helper/genereteToken";
import bycrypt from "bcryptjs";

export interface IUserService {
  createUser(data: IUser, t: Transaction): Promise<IUser>;
  getUser(key: string, value: string): Promise<IUser | null>;
  updateUser(id: number, data: any): Promise<[affectedCount: number]>;
  changePassword(data: any, id: string): Promise<[affectedCount: number]>;
  getAllUser(): Promise<IUser[]>;
  deleteUser(id: string): Promise<number>;
  createAdmin(): Promise<void>;
}

class UserService implements IUserService {
  private _model;
  constructor(protected model: Repository<User>) {
    this._model = model;
  }

  async createUser(data: IUser, t: Transaction) {
    const checkUserByEmail = await this.getUser("email", data.email);
    if (checkUserByEmail) {
      throw {
        code: 403,
        message: "Email already exist",
      };
    }
    const verifyToken =
      Math.random().toString(36).substring(2, 10) +
      Math.random().toString(36).substring(2, 10);

    const hashedPassword: string = await hashPassword(data.password);

    const createUser = await this._model.create(
      {
        ...data,
        verifyToken: verifyToken,
        password: hashedPassword,
      },
      {
        transaction: t,
        raw: true,
      }
    );
    return createUser;
  }
  async getUser(key: string, value: string) {
    const user = await this._model.findOne({
      where: { [key]: value },
      raw: true,
    });
    return user;
  }

  async updateUser(id: number, data: any) {
    const updateUser = this._model.update({ ...data }, { where: { id } });
    return updateUser;
  }
  async changePassword(data: any, id: string) {
    const checkUserByEmail = await this.getUser("id", id);
    if (!checkUserByEmail) {
      throw {
        code: 404,
        message: "User not found",
      };
    }
    const checkPassword = await bycrypt.compare(
      data.currentPassword,
      checkUserByEmail.password
    );
    if (!checkPassword) {
      throw {
        code: 422,
        message: "Current Password does'nt match",
      };
    }
    const hashedPassword = await hashPassword(data.password);

    return await this._model.update(
      { password: hashedPassword },
      {
        where: {
          id,
        },
      }
    );
  }
  async getAllUser() {
    return await this._model.findAll();
  }
  async deleteUser(id: string) {
    const user = await this.getUser("id", id);
    if (!user) {
      throw {
        code: "404",
        message: "user not found",
      };
    }
    if (user.role === "admin") {
      throw {
        code: "402",
        message: "Cannot Delete  admin user",
      };
    }
    return this._model.destroy({
      where: {
        id,
      },
    });
  }
  async createAdmin() {
    const data = {
      firstName: "Super",
      lastName: "Admin",
      email: "superadmin@gmail.com",
      role: "admin",
      password: await hashPassword("Super@123"),
    };
    const checkUser = await this._model.findOne({
      where: {
        email: data.email,
      },
    });
    if (checkUser) {
      return;
    }
    await this._model.create(data);
    return;
  }
}

export default UserService;
