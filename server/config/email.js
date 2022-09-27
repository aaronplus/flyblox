const nodemailer = require('nodemailer')
var hbs = require('nodemailer-express-handlebars')
var path = require('path')
var transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  // port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  }
})

var options = {
  viewEngine: {
    extname: 'hbs',
    defaultLayout: 'email',
    layoutsDir: path.join(__dirname, '../views/layouts'),
    partialsDir: [
      //  path to your partials
      path.join(__dirname, '../views/partials/emails')
    ]
  },
  viewPath: 'views/emails/'
}
transporter.use('compile', hbs(options))

module.exports = {
  sendEmail: mailOptions => {
    var promise = new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log('hello error', error)
          reject(error)
        } else {
          console.log('Email sent: ' + info.response)
          resolve(info)
        }
      })
    })
    return promise
  }
}
