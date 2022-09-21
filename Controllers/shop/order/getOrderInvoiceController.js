const fs = require("fs");
const path = require("path");
const rootDir = require("../../../util/path");

const getOrderInvoiceController = (req, res, next) => {
  const { orderId } = req.params;

  const pdfName = `order-${orderId}.pdf`;

  const pdfPath = path.join(rootDir, "confidential", "invoices", pdfName);

  //? Goods for small files as redFile (reads entire file > stores in memory > response)*Pre loading*
  /* fs.readFile(pdfPath)
    .then((pdfDataBuffer) => {
     
    })
    .catch((error) => {
      next(error);
    }); */

  //? Good for large files, as data is read in small chunks and sent to the browser dynamically.
  const fileStream = fs.createReadStream(pdfPath);
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename=${pdfName}`);
  fileStream.pipe(res);
};

module.exports = getOrderInvoiceController;
