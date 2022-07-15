const nodemailer = require("nodemailer");
const { configuration } = require("../config/config");

const sendMail = async (data) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: configuration.mail,
      pass: configuration.mailPass,
    },
  });
  await transporter.sendMail({
    from: '"Ecommerce-API" <admin@vinit.com>',
    to: `${configuration.mail}`,
    subject: "Nuevo usuario registrado",
    text: `
    ${data.name} ${data.lastName} se ha registrado en la API de Ecommerce,
    su correo es: ${data.email},
    su direccion es: ${data.address},
    su telefono es: ${data.phone}`,
  });
};

const sendDeliveryMail = async (user) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: configuration.mail,
      pass: configuration.mailPass,
    },
  });
  await transporter.sendMail({
    from: '"Ecommerce-API" <buyerList@vinit.com>',
    to: `${configuration.mail}`,
    subject: `Nuevo pedido de compra de ${user.name} ${user.lastName}`,
    text: `
    ${user.name} ${user.lastName} ha realizado un nuevo pedido,
    su correo es: ${user.email},
    su direccion es: ${user.address},
    su telefono es: ${user.phone},
    su pedido es: ${user.products.map((product) => `${product.title} - ${product.qty}`).join(", ")},
    su total es: ${user.amount}`,
  })
}
 




module.exports = {sendMail, sendDeliveryMail};
