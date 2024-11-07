import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface LoanAttributes {
  id: number;
  userId: number;
  bookId: number;
  loanDate: Date;
  returnDate: Date | null;
}

interface LoanCreationAttributes extends Optional<LoanAttributes, 'id'> {}

class Loan extends Model<LoanAttributes, LoanCreationAttributes> implements LoanAttributes {
  public id!: number;
  public userId!: number;
  public bookId!: number;
  public loanDate!: Date;
  public returnDate!: Date;

  static initialize(sequelize: Sequelize) {
    Loan.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        bookId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        loanDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        returnDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'loans',
        timestamps: true,
      }
    );
  }
}

export default Loan;

