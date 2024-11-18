const express = require('express');
const nodemailer = require('nodemailer');
const Razorpay = require('razorpay'); // Import Razorpay
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

// Razorpay configuration
const razorpay = new Razorpay({
    key_id: 'rzp_test_houeVDZKFPJhAi', // Replace with your Razorpay Key ID
    key_secret: '85BqNZ3Wswjlk7RPR2XMwDpN', // Replace with your Razorpay Key Secret
});

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'madheshprasath@gmail.com', // Replace with your email
        pass: 'mctg noys jrtw hclc'   // Replace with your email password
    }
});

// Email feedback endpoint
app.post('/send-feedback', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'client-email@gmail.com', // Replace with client's email
        subject: 'Feedback from Conference Website',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error sending email: ' + error.message);
        }
        res.status(200).send('Email sent successfully: ' + info.response);
    });
});

// Razorpay payment endpoint
app.post('/create-order', async (req, res) => {
    const { amount } = req.body; // Accept amount dynamically from frontend

    try {
        const options = {
            amount: amount * 100, // Amount in paise (1 INR = 100 paise)
            currency: 'INR',
            receipt: 'order_rcptid_11',
        };
        const order = await razorpay.orders.create(options);
        res.json(order); // Send the order details to the frontend
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating Razorpay order');
    }
});

// Server setup
app.listen(3000, () => console.log('Server is running on port 3000'));
