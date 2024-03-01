const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

app.get('/pdf', async (req, res) => {
  const url = req.query.url;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, {
    waitUntil: 'networkidle0',
  });

  const pdfBuffer = await page.pdf({
    format: 'A4',
    margin: {
      top: '1cm',
      right: '1cm',
      bottom: '0cm',
      left: '1cm',
    },
  });

  await browser.close();

  res.setHeader('Content-Type', 'application/pdf');
  res.send(pdfBuffer);
});

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});