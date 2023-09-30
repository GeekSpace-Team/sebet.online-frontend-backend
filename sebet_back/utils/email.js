const nodemailer = require('nodemailer');

exports.sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sebetmailer@gmail.com',
      pass: 'sebet2021',
    },
  });

  const mailOptions = {
    from: `Sebet Contact-Us <sebetmailer@gmail.com>`,
    to: 'hergun.2015@mail.ru',
    subject: 'Biri "Sebet" administratsiýasy bilen habarlaşmak isleýär',
    text: `ADY: ${options.name},\n\nTELEFON/EMAIL: ${options.email},\n\nHATY: ${options.text}`,
  };

  await transporter.sendMail(mailOptions);
};

exports.sendStatsEmail = async ({ from, until, stats }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sebetmailer@gmail.com',
      pass: 'sebet2021',
    },
  });

  const mailOptions = {
    from: `Sebet Statistics <sebetmailer@gmail.com>`,
    to: 'hergun.2015@mail.ru',
    subject: 'Islän Statistikaňyz',
    text: `${from.toString().slice(0, 10)}  ---  ${until
      .toString()
      .slice(0, 10)} \n\nsene aralygyndaky HASAP:\n\n${stats}  TMT`,
  };

  await transporter.sendMail(mailOptions);
};

exports.sendOrderEmail = async ({ ady, number, baha }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sebetmailer@gmail.com',
      pass: 'sebet2021',
    },
  });

  const mailOptions = {
    from: `Sebet New Order <sebetmailer@gmail.com>`,
    to: 'hergun.2015@mail.ru',
    subject: 'Taze Zakaz',
    text: `Zakaz eden: ${ady}\n Nomury: ${number} \n Umumy Baha: ${baha}`,
  };

  await transporter.sendMail(mailOptions);
};
