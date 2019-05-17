const sgMail = require('@sendgrid/mail')
//const sendgrigApiKey =  //set either on local or production environment

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email,name) => {
    sgMail.send({
        to:email,
        from: 'eum602@gmail.com', //here should go the email associated with a custom domain
        subject: 'Thanks for joining in',
        text: `Welcome to the app ${name}`, //here put a simple text  for users that whose mails do not support
        //html code
        html: `<h2>Welcome to the app ${name}</h2>` //here you can use html code
    })
}

const sendCancelationEmail = (email,name) => {
    sgMail.send({
        to:email,
        from: 'eum602@gmail.com', //here should go the email associated with a custom domain
        subject: 'Good Bye',
        text: `It was a pleasure to have you here, we hope see you soon ${name}!`, //here put a simple text  for users that whose mails do not support
        //html code
        html: `<h2>It was a pleasure to have you here, we hope see you soon ${name}!</h2>` //here you can use html code
    })
}

module.exports = {
    sendWelcomeEmail,sendCancelationEmail
}