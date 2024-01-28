import sequelize from "../config/dbSetup";
import Detect from "./detect";
import UserService, { IDetectService } from "./detectService";

const detectReposiratory = sequelize.getRepository(Detect);

const detectService: IDetectService = new UserService(detectReposiratory);

export default detectService;
