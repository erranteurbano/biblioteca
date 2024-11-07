import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

// Definición de los atributos de User
interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Atributos necesarios para crear un User
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Definición de la clase User
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public createdAt!: Date;
  public updatedAt!: Date;

  // Método estático para inicializar el modelo
  static initialize(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true, // Asegúrate de que el email sea único
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'users',
        timestamps: true, // Agrega createdAt y updatedAt
      }
    );
  }
}

export default User;


