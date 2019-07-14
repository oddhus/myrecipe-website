const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const myEmail = 'odden88@gmail.com'

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: myEmail,
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })

}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: myEmail,
        subject: 'Sorry to see you go',
        text: `It has been a pleasure to have you with us, ${name}. Hope you will return soon. Please leave som feedback as to why you chose to leave. Regards.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}
