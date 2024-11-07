import { MercadoPagoConfig, Preference } from 'mercadopago';
import dotenv from 'dotenv';

dotenv.config();

// Configura MercadoPago con el token de acceso
const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
    options: {
        timeout: 5000,
    },
});

const preference = new Preference(client);

// Función para crear una preferencia de pago
export const createPreference = async (
    id: string,  // Añade el ID como argumento
    transactionAmount: number,
    description: string,
    paymentMethodId: string,
    email: string
) => {
    const body = {
        items: [
            {
                id: id,  // Asegúrate de incluir el ID
                title: description,
                quantity: 1,
                unit_price: transactionAmount,
            },
        ],
        payment_methods: {
            excluded_payment_methods: [],
            excluded_payment_types: [],
            installments: 12,
        },
        back_urls: {
            success: 'https://www.tu-sitio.com/exito',  // URL a la que se redirigirá tras un pago exitoso
            failure: 'https://www.tu-sitio.com/fallo',  // URL a la que se redirigirá tras un fallo
            pending: 'https://www.tu-sitio.com/pendiente', // URL a la que se redirigirá tras un pago pendiente
        },
        auto_return: 'approved',
        payer: {
            email: email,
        },
    };

    try {
        const response = await preference.create({ body });
        return response; // Devuelve la respuesta directamente
    } catch (error:any) {
        console.error('Error al crear el pago:', error);
        throw new Error('No se pudo procesar el pago: ' + error.message);
    }
};
