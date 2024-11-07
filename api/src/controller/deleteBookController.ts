import { Request, Response } from "express";
import BookServices from "../services/bookServices";

const goodRequest: number = 200;
const InternalServerError: number = 500;


    const deleteBook = async (req: Request, res: Response): Promise <Response> => {
        const { id } = req.params; // ID del libro desde los parámetros de la URL

        try {
            const result = await BookServices.deleteBook(parseInt(id));
            return res.status(goodRequest).json({
                success:true,
                result,
                message:"libro eliminado de forma exitosa"

            });
        } catch (error: any) {
            return res.status(InternalServerError).json({ 
                success:false,
                message:"error interno del servidor",
                error: error.message 
            });
        }
    }


export default deleteBook;
