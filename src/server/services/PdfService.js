const nanoid = require('nanoid');
const pdf = require('html-pdf');

class PdfService {
  static generatePdf(text, filename = nanoid()) {
    return new Promise((resolve, reject) => {
    	const template = `<html><body>${text}</body></html>`
      pdf.create(template).toFile(`files/${filename}.pdf`, (err, res) => {
        if (err) reject(err);
        resolve(`files/${filename}.pdf`);
      }); 
    })
  }
}

module.exports = PdfService;