import {  Column, DataType, Model, Table } from "sequelize-typescript";

export enum UserRoleEnum {
  ADMIN = 'admin',
  REGULAR = 'regular',
}

@Table({
  tableName: 'Users',
})
export class User extends Model<User> {
  @Column({ type: DataType.INTEGER,primaryKey: true,autoIncrement: true })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    field: 'user_name',
  })
  userName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: UserRoleEnum.REGULAR
  })
  role: UserRoleEnum;
}