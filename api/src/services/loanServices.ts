// services/loanService.ts
import Loan  from '../models/Loan';  // Asegúrate de importar tu modelo correctamente
import User  from '../models/User';
import Book from '../models/Book';

export const createLoan = async (userId: number, bookId: number, loanDate: Date) => {
  // Verificar si el usuario y el libro existen
  const user = await User.findByPk(userId);
  const book = await Book.findByPk(bookId);

  if (!user || !book) {
    throw new Error('User or Book not found.');
  }

  // Crear el préstamo
  const loan = await Loan.create({
    userId,
    bookId,
    loanDate,
    returnDate: null,  // Inicialmente sin fecha de devolución
  });

  return loan;
};

export const updateLoan = async (userId: number, bookId: number, returnDate: Date) => {
  // Buscar el préstamo
  const loan = await Loan.findOne({ where: { userId, bookId } });

  if (!loan) {
    throw new Error('Loan not found.');
  }

  // Actualizar la fecha de devolución
  loan.returnDate = returnDate;
  await loan.save();

  return loan;
};
