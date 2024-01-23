const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Provide mongodb url
mongoose.connect('mongodburl', { useNewUrlParser: true, useUnifiedTopology: true });

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  percentage: Number,
  topClass: { type: Boolean, default: false },
  registrationDate: { type: Date, default: Date.now },
});

const Student = mongoose.model('Student', studentSchema);


app.post('/api/students', async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    const savedStudent = await newStudent.save();

    if (savedStudent.percentage > 90) {
      savedStudent.topClass = true;
      await savedStudent.save();
    }

    sendEmail(savedStudent);

    res.json(savedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

function sendEmail(student) {

    const options1 = {
        method: 'POST',
        url: 'https://send-mail-serverless.p.rapidapi.com/send',
        headers: {
          'content-type': 'application/json',
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': '7d1fad5568msh911fde48846fd8dp1c0b2fjsn40a9c8205509',
          'X-RapidAPI-Host': 'send-mail-serverless.p.rapidapi.com'
        },
        data: {
          personalizations: [
            {
              to: [
                {
                  email: student.email,
                  name: student.name
                },
              ]
            }
          ],
          from: {
            email: 'noreply@firebese.com',
            name: 'noreply'
          },
          subject: 'Portfolio Contact-Form',
          content: [
            {
              type: 'text/html',
              value: `<b>Thanks for
              your Registration Your Interview will be
              scheduled on </b><br><br>${Date.now}`
            }
          ],
          headers: {
            'List-Unsubscribe': '<mailto: unsubscribe@firebese.com?subject=unsubscribe>, <https://firebese.com/unsubscribe/id>'
          }
        }
      };
}
