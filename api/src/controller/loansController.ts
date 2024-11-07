// controllers/loanController.ts
import { Request, Response } from 'express';
import { createLoan, updateLoan } from '../services/loanServices';

export const createLoanController = async (req: Request, res: Response) => {
  const { userid, bookid } = req.params;
  const { loanDate } = req.body;

  try {
    const loan = await createLoan(Number(userid), Number(bookid), new Date(loanDate));
    res.status(201).json({ message: 'Loan created successfully', loan });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateLoanController = async (req: Request, res: Response) => {
  const { userid, bookid } = req.params;
  const { returnDate } = req.body;

  try {
    const loan = await updateLoan(Number(userid), Number(bookid), new Date(returnDate));
    res.status(200).json({ message: 'Loan updated successfully', loan });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
