import { Request, Response } from "express";
import BookServices from "../services/bookServices";

const goodRequest: number = 200;
const InternalServerError: number = 500;

     const updateBook = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params; // ID del libro desde los parámetros de la URL
        const { title, author, publicationYear } = req.body;

        try {
            const updatedBook = await BookServices.updatedBook(parseInt(id), title, author, publicationYear);
            return res.status(goodRequest).json({
                success:true,
                updatedBook,
                message:"libro actualizado con exito"
            });

        } catch (error: any) {

            return res.status(InternalServerError).json({ 
                success:false,
                message:"error interno del servidor",
                error: error.message 
            });
        }
    }


export default updateBook;
