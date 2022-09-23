const fs = require("fs");
const path = require("path");
const rootDir = require("../../../util/path");
const Order = require("../../../Modals/Order");
const PDFDocument = require("pdfkit");

const getOrderInvoiceController = (req, res, next) => {
  const { orderId } = req.params;

  const pdfName = `order-${orderId}.pdf`;

  const pdfPath = path.join(rootDir, "confidential", "invoices", pdfName);

  Order.findById(orderId).then((order) => {
    if (!order) {
      next(new Error("Order not found against the orderId."));
    }

    order.populate("products.product_id").then((order) => {
      const pdfBuffer = new PDFDocument();

      res.setHeader("Content-Type", "application/pdf");

      res.setHeader("Content-Disposition", `attachment; filename=${pdfName}`);

      //? OPENS PIPE
      pdfBuffer.pipe(fs.createWriteStream(pdfPath));

      pdfBuffer.pipe(res);

      [
        pdfBuffer
          .fontSize(24)
          .text("Invoice", { underline: true, align: "center" }),
        pdfBuffer.text("-------------------------------------------"),
        ...order?.products?.map((product) =>
          pdfBuffer
            .fontSize(12)
            .text(
              `${product?.product_id?.title} => ${product?.quantity} x ${product?.product_id?.price} `
            )
        ),
        pdfBuffer.fontSize(20).text(
          `TOTAL => ${order?.products?.reduce((acc, product) => {
            return (acc += product?.product_id?.price * product?.quantity);
          }, 0)} `
        ),
      ];

      //? END PIPE
      pdfBuffer.end();
    });

    //? Good for large files, as data is read in small chunks and sent to the browser dynamically.
  });

  //? Goods for small files as redFile (reads entire file > stores in memory > response)*Pre loading*
  /* fs.readFile(pdfPath)
    .then((pdfDataBuffer) => {
     
    })
    .catch((error) => {
      next(error);
    }); */
};

module.exports = getOrderInvoiceController;
