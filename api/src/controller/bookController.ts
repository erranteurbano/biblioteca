import { Request, Response } from "express";
import BookService from '../services/bookServices';

const goodRequest: number = 200;
const InternalServerError: number = 500;
const NotFound: number = 404;

const Book = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params; // ID o título
    let param: number | string = id; // Inicialmente asignamos el ID

    try {
        // Intentar convertir a número
        const numericId = Number(param);
        
        // Verificamos si es un número válido y asignamos el tipo adecuado
        param = isNaN(numericId) ? param : numericId;

        const book = await BookService.oneBook(param); // Llamamos al servicio con el parámetro

        return res.status(goodRequest).json({
            success: true,
            book: {
                id: book.id,
                title: book.title,
                author: book.author,
                publicationYear: book.publicationYear
            }
        });

    } catch (error: any) {
        // Verificar si el error es un "no encontrado"
        if (error.message.includes('no encontrado')) {
            return res.status(NotFound).json({
                success: false,
                message: 'Libro no encontrado.'
            });
        }

        console.error(error);
        return res.status(InternalServerError).json({
            success: false,
            message: 'Error en el servidor. Por favor, intenta nuevamente más tarde.'
        });
    }
}

export default Book;
