const sgMail = require('@sendgrid/mail')
const sendgrigApiKey =  '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'

sgMail.setApiKey(sendgrigApiKey)

sgMail.send({
    to:'erick.pacheco.p@uni.pe',
    from: 'eum602@gmail.com',
    subject: 'This is my first creation!',
    text: 'I hope this one gets to you'
})