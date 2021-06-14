var express = require('express');
var app = express();
var cors = require('cors');
app.use(express.json());
app.use(cors());
var fs = require('fs');


app.get('/hello', (req, res) => {
    var html_to_pdf = require('html-pdf-node');
var schPath='school.jpg';
    let options = { format: 'A4' };

    let file = {
        content: `
    <div>
    <h1>XYZ School</h1>
    <img src="https://drive.google.com/file/d/17HW8TFmZNGVVnfJaUUBpLXMz9V2VV6hF/view?usp=sharing">
    <div class="tableData">
    <table>
    <tr>
    
    <th>Date</th>
    <th>Status</th>
    <th>Subject</th>
    </tr>
    <tr>
    <td>${new Date()}</td>
    <td>Present</td>
    <td>English</td>
  </tr>
  <tr>
    <td>12-05-2021</td>
    <td>Absent</td>
    <td>Kannada</td>
  </tr>
    </table>
    </div>
    </div>
    `};

    html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
        fs.writeFile('some.pdf', pdfBuffer, (err) => {
            if (err) {
                res.send('error')
            } else {
                res.download("some.pdf");
            }
        });

    });
})

app.listen(3000, () => {
    console.log('Listening to port 3000');
})