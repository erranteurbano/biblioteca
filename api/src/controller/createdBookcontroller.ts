import { Request, Response } from "express";
import BookServices from "../services/bookServices";

const Created:number = 201;
const BadRequest: number = 400;
const  InternalServerError:number = 500;
const Conflict = 409;

    const createBook = async (req: Request, res: Response): Promise<Response> => {
        const { title, author, publicationYear } = req.body;

        try {
            // Verificar si todos los campos requeridos están presentes
            if ( !title || !author || !publicationYear) {
                return res.status(BadRequest).json({ error: "Faltan campos requeridos." });
            }

            const newBook = await BookServices.createdBook(title, author, publicationYear);
            return res.status(Created).json({

                success:true,
                newBook,
                message:"libro fue creado con exito"

            }); // Creación exitosa

        } catch (error: any) {
            // Aquí puedes decidir qué código de estado devolver según el error
            if (error.message.includes("conflict")) {
                return res.status(Conflict).json({ 

                    success:false,
                    message: "Conflicto al crear el libro.",
                    error: error.message

                });
            }

            return res.status(InternalServerError).json({
                success:false,
                message:"error interno del servidor", 
                error: error.message
             }); // Error interno del servidor
        }
    }


export default createBook ;

