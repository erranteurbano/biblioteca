import { Request, Response, NextFunction } from 'express';

export const validateLoanRequest = (req: Request, res: Response, next: NextFunction) => {
  const { userid, bookid } = req.params;

  // Validar que userid y bookid sean números
  if (isNaN(Number(userid)) || isNaN(Number(bookid))) {
    return res.status(400).json({ message: 'Invalid userId or bookId. They must be numbers.' });
  }

  // Si es una solicitud POST, validar que se envíe una fecha de préstamo
  if (req.method === 'POST') {
    const { loanDate } = req.body;
    if (!loanDate) {
      return res.status(400).json({ message: 'Loan date is required.' });
    }
    // Validar que la fecha sea válida
    const isValidDate = !isNaN(new Date(loanDate).getTime());
    if (!isValidDate) {
      return res.status(400).json({ message: 'Invalid loan date.' });
    }
  }

  next();
};
