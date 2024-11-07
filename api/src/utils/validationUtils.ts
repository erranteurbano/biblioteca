// utils/validationUtils.ts

// Expresión regular para validar el formato del correo electrónico
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Expresión regular para validar la contraseña (mínimo 8 caracteres, al menos una letra, un número y un carácter especial)
export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/; // Mínimo 8 y máximo 20

// Función para validar el formato del correo electrónico
export const validateEmail = (email: string): { isValid: boolean; message?: string } => {
    if (typeof email !== 'string') {
        return {
            isValid: false,
            message: 'El correo electrónico debe ser una cadena de texto.'
        };
    }
    if (!email) {
        return {
            isValid: false,
            message: 'El correo electrónico no puede estar vacío.'
        };
    }
    if (!emailRegex.test(email)) {
        return {
            isValid: false,
            message: 'El formato del correo electrónico es inválido.'
        };
    }
    return { isValid: true };
};

// Función para validar la contraseña
export const validatePassword = (password: string): { isValid: boolean; message?: string } => {
    if (typeof password !== 'string') {
        return {
            isValid: false,
            message: 'La contraseña debe ser una cadena de texto.'
        };
    }
    if (!password) {
        return {
            isValid: false,
            message: 'La contraseña no puede estar vacía.'
        };
    }
    if (!passwordRegex.test(password)) {
        return {
            isValid: false,
            message: 'La contraseña debe tener entre 8 y 20 caracteres.'
        };
    }
    return { isValid: true };
};

// Función para validar el nombre
export const validateName = (name: string): { isValid: boolean; message?: string } => {
    const nameRegex = /^[A-Za-zÀ-ÿ\s]+$/;
    if (typeof name !== 'string') {
        return {
            isValid: false,
            message: 'El nombre debe ser una cadena de texto.'
        };
    }
    if (!name) {
        return {
            isValid: false,
            message: 'El nombre no puede estar vacío.'
        };
    }
    if (!nameRegex.test(name)) {
        return {
            isValid: false,
            message: 'El nombre solo debe contener letras y espacios.'
        };
    }
    return { isValid: true };
};

// Validaciones para creación, actualización y eliminación de libros
export const validateBookInput = (title?: string, author?: string, publicationYear?: string) => {
    const errors: string[] = [];
    if (title && typeof title !== 'string') {
        errors.push('El título debe ser una cadena de texto.');
    }
    if (author && typeof author !== 'string') {
        errors.push('El autor debe ser una cadena de texto.');
    }
    if (publicationYear && (isNaN(Number(publicationYear)) || Number(publicationYear) < 0)) {
        errors.push('El año de publicación debe ser un número válido.');
    }
    return { isValid: errors.length === 0, errors };
};

// Función para validar el registro
export const validateRegisterInput = (name: string, email: string, password: string) => {
    const errors: string[] = [];

    if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
        errors.push('Todos los campos deben ser cadenas de texto.');
    }

    const nameValidation = validateName(name);
    if (!nameValidation.isValid) {
        errors.push(nameValidation.message || 'Error de validación del nombre.');
    }

    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
        errors.push(emailValidation.message || 'Error de validación del correo electrónico.');
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
        errors.push(passwordValidation.message || 'Error de validación de la contraseña.');
    }

    return { isValid: errors.length === 0, errors };
};

// Función para validar el inicio de sesión
export const validateLoginInput = (email: string, password: string) => {
    const errors: string[] = [];

    if (typeof email !== 'string' || typeof password !== 'string') {
        errors.push('El correo electrónico y la contraseña deben ser cadenas de texto.');
    }

    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
        errors.push(emailValidation.message || 'Error de validación del correo electrónico.');
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
        errors.push(passwordValidation.message || 'Error de validación de la contraseña.');
    }

    return { isValid: errors.length === 0, errors };
};

// Función para manejar errores de autenticación
export const handleAuthError = (error: Error) => {
    if (error.message === 'Usuario no encontrado' || error.message === 'Contraseña incorrecta') {
        return {
            isValid: false,
            message: 'Correo o contraseña incorrectos.'
        };
    }
    return {
        isValid: false,
        message: 'Error en la autenticación. Intenta nuevamente.'
    };
};

// Validar que el ID del producto sea un número entero positivo
export const validateProductId = (productId: number): { isValid: boolean; message?: string } => {
    if (typeof productId !== 'number' || productId <= 0 || !Number.isInteger(productId)) {
        return {
            isValid: false,
            message: 'El ID del producto debe ser un número entero positivo.'
        };
    }
    return { isValid: true };
};

// Validar que el monto sea un número positivo
export const validateAmount = (amount: number): { isValid: boolean; message?: string } => {
    if (typeof amount !== 'number' || amount <= 0) {
        return {
            isValid: false,
            message: 'El monto debe ser un número positivo.'
        };
    }
    return { isValid: true };
};

// Validar que el método de pago no esté vacío y sea un string válido
export const validatePaymentMethod = (paymentMethod: string): { isValid: boolean; message?: string } => {
    if (typeof paymentMethod !== 'string' || !paymentMethod.trim()) {
        return {
            isValid: false,
            message: 'El método de pago es obligatorio y debe ser una cadena de texto válida.'
        };
    }
    return { isValid: true };
};

// Función para validar la entrada en el proceso de compra
export const validatePurchaseInput = (productId: number, amount: number, paymentMethod: string) => {
    const errors: string[] = [];

    const productIdValidation = validateProductId(productId);
    if (!productIdValidation.isValid) {
        errors.push(productIdValidation.message || 'Error de validación del ID del producto.');
    }

    const amountValidation = validateAmount(amount);
    if (!amountValidation.isValid) {
        errors.push(amountValidation.message || 'Error de validación del monto.');
    }

    const paymentMethodValidation = validatePaymentMethod(paymentMethod);
    if (!paymentMethodValidation.isValid) {
        errors.push(paymentMethodValidation.message || 'Error de validación del método de pago.');
    }

    return { isValid: errors.length === 0, errors };
};
