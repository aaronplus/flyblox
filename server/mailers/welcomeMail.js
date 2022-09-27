const { sendEmail } = require('../config/email')
var path = require('path')
var options = (user, locals) => {
    return {
        from: process.env.FROM_EMAIL,
        to: user.email,
        subject: "Welcome to Flyblox.",
        template: "welcome-customer",
        attachments: [
            {
                filename: 'The Ultimate Guide for Stacking Crypto.pdf', // <= Here: made sure file name match
                path: path.join(__dirname, '../views/pdf/The Ultimate Guide for Stacking Crypto.pdf'), // <= Here
                contentType: 'application/pdf'
            }
        ],
        context: locals,
    };
};

module.exports = async (user) => {
    let customer = user.toObject();
    return sendEmail(
        options(user, {
            user: customer,
        })
    );
};
