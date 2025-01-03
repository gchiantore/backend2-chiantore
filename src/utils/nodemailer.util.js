import { createTransport } from "nodemailer";
const { GOOGLE_EMAIL, GOOGLE_PASSWORD } = process.env

const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: GOOGLE_EMAIL,
        pass: GOOGLE_PASSWORD,
    },
});

const sendVeryfyEmail = async (to, verify) => {
    try {
        console.log(to);
        await transport.verify()
        await transport.sendMail({
            from: GOOGLE_EMAIL,
            to,
            subject: "Verify your email",
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Account Verify</title>
                <style>
                    /* Estilos básicos para el correo */
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                        -webkit-text-size-adjust: none;
                        -ms-text-size-adjust: none;
                    }

                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    }

                    h1 {
                        color: #333333;
                        font-size: 24px;
                        text-align: center;
                        margin-bottom: 10px;
                    }

                    p {
                        color: #555555;
                        font-size: 16px;
                        text-align: center;
                        margin-bottom: 20px;
                    }

                    .code {
                        background-color: #007bff;
                        color: #ffffff;
                        font-size: 30px;
                        font-weight: bold;
                        padding: 20px;
                        text-align: center;
                        border-radius: 5px;
                        margin-bottom: 30px;
                    }

                    .footer {
                        text-align: center;
                        color: #888888;
                        font-size: 14px;
                    }

                    .footer a {
                        color: #007bff;
                        text-decoration: none;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Account Verification</h1>
                    <p>The code below must be used to verify your account:</p>
                    <div class="code">
                        ${verify}
                    </div>
                    <div class="footer">
                        <p>If you did not request this verification, please ignore this email.</p>
                        <p>Need help? <a href="mailto:support@example.com">Contact support</a></p>
                    </div>
                </div>
            </body>
            </html>
            `,
        })
    } catch (error) {
        throw error
    }
};

const sendForgotPassEmail = async (to, code) => {
    try {
        console.log(to);
        await transport.verify()
        await transport.sendMail({
            from: GOOGLE_EMAIL,
            to,
            subject: "Recovery Pass Code",
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Account Verify</title>
                <style>
                    /* Estilos básicos para el correo */
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                        -webkit-text-size-adjust: none;
                        -ms-text-size-adjust: none;
                    }

                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    }

                    h1 {
                        color: #333333;
                        font-size: 24px;
                        text-align: center;
                        margin-bottom: 10px;
                    }

                    p {
                        color: #555555;
                        font-size: 16px;
                        text-align: center;
                        margin-bottom: 20px;
                    }

                    .code {
                        background-color:red;
                        color: #ffffff;
                        font-size: 30px;
                        font-weight: bold;
                        padding: 20px;
                        text-align: center;
                        border-radius: 5px;
                        margin-bottom: 30px;
                    }

                    .footer {
                        text-align: center;
                        color: #888888;
                        font-size: 14px;
                    }

                    .footer a {
                        color: #007bff;
                        text-decoration: none;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Password Recovery</h1>
                    <p>The code below must be used to recovery your password:</p>
                    <div class="code">
                        ${code}
                    </div>
                    <div class="footer">
                        <p>If you did not request password recovery, please ignore this email.</p>
                        <p>Need help? <a href="mailto:support@example.com">Contact support</a></p>
                    </div>
                </div>
            </body>
            </html>
            `,
        })
    } catch (error) {
        throw error
    }
};

export { sendVeryfyEmail, sendForgotPassEmail }

