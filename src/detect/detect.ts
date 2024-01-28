import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import User from "../user/user";

export type IDetect = {
  [x: string]: any;
  sampleName: string;
  image: string;
  result: string;
  confidence: string;
};

@Table({ timestamps: true })
class Detect extends Model {
  @Column
  sampleName: string;

  @Column
  image: string;

  @Column
  result: string;

  @Column
  confidence: string;

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}

export default Detect;
