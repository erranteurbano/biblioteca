import mercadopago, {MercadoPagoConfig, Payment, Preference} from 'mercadopago'
import { Request,Response} from 'express';

const client = new MercadoPagoConfig({
  accessToken: 'APP_USR-478733737938763-101412-b2c4326bcbba86d2e1ef4625ea7c3e73-2034924903'
});

export const createOrder = async (req:Request, res:Response): Promise <Response> => {
 try {
    
    const preference = new Preference(client)

   const result = await preference.create({
       body:{
        items:[
            {
             id:'1',
             title:'Cien años de soledad',
             unit_price:100000,
             currency_id: "COP",
             quantity: 1
            }
        ],
        back_urls:{
          success:"http://localhost:3001/success",
          failure:"http://localhost:3001/failure",
          pending:"http://localhost:3001/pending",
        },
        notification_url: "https://w6msnr37-3001.use2.devtunnels.ms/webhook",
 
       }
    })

    console.log(result);
    
   return res.status(200).json({
    success:true,
    data:result,
    message:'compra exitosa'
})

 } catch (error) {

    // console.error(error);
  return  res.status(500).json({
    success: false,
    error: error,
    message:"Error del servidor, intente mas tarde"
  })

 }

}


export const reciveWebhook = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Imprimir el cuerpo de la solicitud para ver qué datos están llegando
    console.log('Webhook data:', req.body); // Asegúrate de estar usando body-parser

    const paymentID = req.query['data.id'];

    if (!paymentID) {
      return res.status(400).json({
        success: false,
        message: 'Id de pago no proporcionado en el webhook',
      });
    }

    const payment = new Payment(client);
    
    const result = await payment.get({
      id: paymentID as string,
    });

    console.log(result);

    return res.status(200).json({
      success: true,
      payment: result,
    });
    
  } catch (error: any) {
    console.error(error); // Registra el error para depuración
    return res.status(500).json({
      success: false,
      error: error.message || error,
      message: 'Error del servidor',
    });
  }
};
