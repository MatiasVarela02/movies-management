import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'Movies' })
export class Movie extends Model<Movie> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  director: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  releaseDate: Date;

  @Column({ defaultValue: true, type: DataType.BOOLEAN })
  isAvailable: boolean;
}
