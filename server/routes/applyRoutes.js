import { Router } from 'express';
import multer from 'multer';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Apply for job
router.post('/apply-job', upload.array('files', 5), async (req, res) => {
  const { jobId, jobTitle, company, applicantName, applicantEmail, applicantPhone } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    const attachments = req.files ? req.files.map(file => ({
      filename: file.originalname,
      content: file.buffer,
    })) : [];

    const mailOptions = {
      from: process.env.EMAIL_USER,
      // to: 'will@wheaton-group.com',
      to: 'ryanchung14@gmail.com',
      subject: `Job Application for ${jobTitle} at ${company}`,
      text: `Applicant Name: ${applicantName}\nApplicant Email: ${applicantEmail}\nApplicant Phone: ${applicantPhone}\nJob ID: ${jobId}\nJob Title: ${jobTitle}\nCompany: ${company}`,
      attachments: attachments,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    res.status(200).json({ success: true, message: "Application submitted successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Error submitting application" });
  }
});

export default router;