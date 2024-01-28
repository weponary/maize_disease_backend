import { Transaction } from "sequelize/types";
import { Repository } from "sequelize-typescript";
import Detect, { IDetect } from "./detect";
import axios from "axios";

export interface IDetectService {
  createSample(data: IDetect, id: string, t: Transaction): Promise<IDetect>;
  getSample(key: string, value: string): Promise<IDetect>;
  getAllSample(
    id: string,
    filters: any
  ): Promise<{ rows: IDetect[]; count: number }>;
}

class DetectService implements IDetectService {
  private _model;
  constructor(protected model: Repository<Detect>) {
    this._model = model;
  }

  async createSample(data: IDetect, id: string, t: Transaction) {
    try {
      const requestData = {
        image: data.image.split("/uploads/")[1],
      };
      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        requestData
      );
      data.image = data.image.split("/uploads/")[1];
      data.confidence = response?.data?.confidence;
      data.result = response?.data?.predicted_class;
      const finalResult = await this._model.create({ ...data, userId: id });
      return finalResult;
    } catch (err) {
      throw {
        code: 500,
        message: "Unable to process request ! Try Again !!",
      };
    }
  }
  async getSample(key: string, value: string) {
    const sample = await this._model.findOne({
      where: { [key]: value },
      raw: true,
    });
    if (!sample) {
      throw {
        code: 404,
        message: "Sample not found",
      };
    }
    return sample;
  }

  async getAllSample(
    id: string,
    filters: any
  ): Promise<{ rows: IDetect[]; count: number }> {
    console.log("soshal", id);
    const limit = filters.limit ?? 30;

    const page = filters.page ?? 1;
    const data = await this._model.findAndCountAll({
      where: {
        userId: id,
      },
      limit: parseInt(limit),
      offset: parseInt(limit) * (parseInt(page) - 1),
      order: [["createdAt", "desc"]],
    });
    return data;
  }
}

export default DetectService;
