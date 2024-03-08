import nodemailer from 'nodemailer'

export const sendEmail = async (email, subject, content) => {
  const backendService = {}
  try {
    const transporter = nodemailer.createTransport({
	  host: process.env.HOST,
	  service: process.env.SERVICE,
	  port: Number(process.env.EMAIL_PORT),
	  secure: Boolean(process.env.SECURE),
	  auth: {
	  	user: process.env.USER,
	  	pass: process.env.PASS,
	  },
	})
	
	await transporter.sendMail({
		from: process.env.USER,
		to: email,
		subject: subject,
		text: content,
	})
	backendService.status = 'ok'
	return backendService
  } catch (error) {
	backendService.status = 'error'
	return backendService
  }
}