import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'Movies' })
export class Movie extends Model<Movie> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  @ApiProperty({ example: 1, description: 'The id of the movie' })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty({
    example: 'Star Wars Episode IV: A New Hope',
    description: 'The title of the movie',
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  @ApiProperty({
    example: 'A space adventure',
    description: 'The description of the movie',
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty({
    example: 'George Lucas',
    description: 'The director of the movie',
  })
  director: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  @ApiProperty({
    example: '1977-05-25',
    description: 'The release date of the movie',
  })
  releaseDate: Date;

  @Column({ defaultValue: true, type: DataType.BOOLEAN })
  @ApiProperty({ example: true, description: 'The availability of the movie' })
  isAvailable: boolean;
}
