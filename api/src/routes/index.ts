import { Router } from 'express';
import register from '../controller/registerController';
import validateRegister from '../middlewares/validateRegister';
import validateLogin from '../middlewares/validateLogin';
import authMiddleware from '../middlewares/auth';
import Login from '../controller/loginController';
import Books from '../controller/allBooksController'
import Book from '../controller/bookController'
import createBook from '../controller/createdBookcontroller'
import updateBook from '../controller/updateBookController';
import deleteBook from '../controller/deleteBookController'
import { validateLoanRequest } from '../middlewares/validateLoand';
import { createLoanController , updateLoanController } from '../controller/loansController';
import { validateCreateBook } from '../middlewares/validateCreateBook';
import { validateUpdateBook } from '../middlewares/validateUpdateBook';
import { validateDeleteBook } from '../middlewares/validateDeleteBook';
import {  createOrder, reciveWebhook } from '../controller/purchaseController';


const router = Router();

//autenticación
router.post('/api/auth/register',validateRegister, register);
router.post("/api/auth/login", validateLogin,Login);

//libros
router.get('/api/books',Books);
router.get('/api/books/:id',Book);
router.post('/api/books', authMiddleware, validateCreateBook, createBook);
router.put('/api/books/:id', authMiddleware, validateUpdateBook, updateBook);
router.delete('/api/books/:id', authMiddleware, validateDeleteBook, deleteBook);

//prestamos
router.post('/api/loans/:userid/:bookid', authMiddleware, validateLoanRequest, createLoanController);
router.put('/api/loans/:userid/:bookid', authMiddleware, validateLoanRequest, updateLoanController);

//compra de libros

router.post('/api/purchase',createOrder);
router.get("/success",)
router.get("/failure",)
router.get("/pending",)

router.get("/webhook", reciveWebhook)

export default router;
