import { Request, Response } from "express";
import BookService from '../services/bookServices';

const goodRequest: number = 200;
const badRequest: number = 400;
const internalServerError: number = 500;

const Books = async (req: Request, res: Response): Promise<Response> => {
    try {
        const books = await BookService.allBooks(); // Se asume que `allBooks` retorna un array

        // Verifica si books es un array
        if (!Array.isArray(books)) {
            return res.status(internalServerError).json({
                success: false,
                message: "Error en el servidor al obtener libros"
            });
        }

        // Si no hay libros, devuelve un array vacío con una respuesta exitosa
        if (books.length === 0) {
            return res.status(goodRequest).json({
                success: true,
                message: "No se encontraron libros en la base de datos",
                books: []
            });
        }

        // Si hay libros, devuélvelos con éxito
        return res.status(goodRequest).json({
            success: true,
            books: books.map(book => ({
                id: book.id,
                title: book.title,
                author: book.author,
                publicationYear: book.publicationYear
            }))
        });

    } catch (error: any) {
        console.error(error);

        // Aquí puedes añadir lógica para manejar errores específicos si es necesario
        return res.status(internalServerError).json({
            success: false,
            message: 'Error en el servidor. Por favor, intenta nuevamente más tarde.'
        });
    }
}

export default Books;
