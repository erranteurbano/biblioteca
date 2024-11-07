import Book from "../models/Book";

class BookServices {
    static async allBooks() {
        try {
            const books = await Book.findAll();

            // Verificar si no hay libros
            if (books.length === 0) {
                return [];
            }

            return books;

        } catch (error: any) {
            throw error; 
        }
    }

    static async oneBook(param: string | number) {
        try {
            // Determinar si el parámetro es un número (id) o una cadena (title)
            const whereCondition = typeof param === 'number' 
                ? { id: param } 
                : { title: param };

            const book = await Book.findOne({ where: whereCondition });

            // Si el libro no se encuentra, lanzar un error
            if (!book) {
                throw new Error(`Libro con ${typeof param === 'number' ? 'id' : 'título'} '${param}' no encontrado.`);
            }

            return book;
        } catch (error: any) {
            throw error; 
        }
    }

    static async createdBook(title: string, author: string, publicationYear: number) {
        try {
            const newBook = await Book.create({
                title,
                author,
                publicationYear
            });
            return newBook;

        } catch (error: any) {
            throw error; 
        }
    }

    static async updatedBook(id: number, title: string, author: string, publicationYear: number) {
        try {
            // Actualizar el libro usando el ID para identificar cuál se va a modificar
            const [updatedCount, updatedBooks] = await Book.update(
                {
                    title,
                    author,
                    publicationYear
                },
                {
                    where: { id }, // Condición para identificar el libro a actualizar
                    returning: true // Esto permite que se devuelvan los registros actualizados
                }
            );
    
            // Verificar si se actualizó algún libro
            if (updatedCount === 0) {
                throw new Error(`Libro con id ${id} no encontrado para actualizar.`);
            }
    
            // Devolver el libro actualizado
            return updatedBooks[0];
    
        } catch (error) {
            throw error;
        }
    }

    static async deleteBook(id: number) {
        try {
            // Eliminar el libro usando el ID
            const deleteCount = await Book.destroy({
                where: { id } // Condición para identificar el libro a eliminar
            });
    
            // Verificar si se eliminó algún libro
            if (deleteCount === 0) {
                throw new Error(`Libro con id ${id} no encontrado para eliminar.`);
            }
    
            return { message: `Libro con id ${id} ha sido eliminado.` };
    
        } catch (error: any) {
            throw error; 
        }
    }
    
}

export default BookServices;
