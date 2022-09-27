const { sendEmail } = require('../config/email')
var path = require('path')
var options = (user, locals) => {
    return {
        from: process.env.FROM_EMAIL,
        to: user.email,
        subject: "Order Confirmed.",
        template: "order-confirmed-buyer",
        context: locals,
    };
};

module.exports = async (orderData) => {
    let order = orderData.toObject();
    return sendEmail(
        options(orderData.buyer, {
            orderData: order,
            orderItems: order.orderItems
        })
    );
};