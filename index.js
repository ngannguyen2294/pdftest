var PDF = require("html-pdf");

const printPDF = async (text) => {
  const options = {
    format: "A4",
    orientation: "portrait",
  };

  // Zoom out the PDF file x0.75
  text += `<style>html{zoom: 0.75;}</style>`;

  try {
    const result = await new Promise((resolve, reject) => {
      PDF.create(text, options).toBuffer((error, buffer) => {
        if (error) {
          reject(error);
        }
        resolve(buffer);
      });
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const text = `<div>
  <img src="file://assets/ctm-logo-long-header.png" style="border:0;display:block;outline:0;text-decoration:none;height:auto;width:100%;font-size:13px" width="200" height="auto">
  </div>`;

const express = require("express");
const app = express();
const port = 3001;

app.get("/", async (req, res) => {
  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": "attachment; filename=<name of your file>",
  });
  res.end(await printPDF(text));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
