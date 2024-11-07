import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface BookAttributes {
  id: number;
  title: string;
  author: string;
  publicationYear: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface BookCreationAttributes extends Optional<BookAttributes, 'id'> {}

class Book extends Model<BookAttributes, BookCreationAttributes> implements BookAttributes {
  public id!: number;
  public title!: string;
  public author!: string;
  public publicationYear!: number;
  public createdAt!: Date;
  public updatedAt!: Date;

  static initialize(sequelize: Sequelize) {
    Book.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        author: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        publicationYear: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'books',
        timestamps: true,
      }
    );
  }
}

export default Book;
