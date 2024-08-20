const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create a transporter object using your SMTP service
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  }
});

app.post('/send-email', (req, res) => {
  const { name, email, subject, date, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'RECIEVING EMAIL GOES HERE',
    subject: `New Booking: ${subject}`,
    text: `You have a new booking request from ${name} (${email}).

    Date: ${date}
    Message: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent successfully');
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
