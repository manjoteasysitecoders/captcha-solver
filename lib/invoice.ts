import fs from "fs";
import path from "path";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

type PaymentWithRelations = {
  id: string;
  amount: number;
  gstAmount?: number | null;
  discountedPrice?: number | null;
  user: { id: string; email: string };
  plan: { id: string; name: string; price: number; description: string };
};

const PAGE_SIZE: [number, number] = [595, 842]; // A4
const MARGIN_X = 50;
const LINE_HEIGHT = 20;

// Added constants for label/value alignment
const LABEL_X = MARGIN_X;
const VALUE_X = PAGE_SIZE[0] - MARGIN_X;

export async function generateInvoicePdf(
  payment: PaymentWithRelations,
  invoiceNumber: string
) {
  const storageDir = path.join(process.cwd(), "invoices");
  if (!fs.existsSync(storageDir)) {
    fs.mkdirSync(storageDir, { recursive: true });
  }

  const filePath = path.join(storageDir, `${payment.id}.pdf`);

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage(PAGE_SIZE);
  const { width, height } = page.getSize();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let cursorY = height - 60;

  const drawText = (text: string, size = 12, bold = false, x = MARGIN_X) => {
    page.drawText(text, {
      x,
      y: cursorY,
      size,
      font: bold ? boldFont : font,
      color: rgb(0, 0, 0),
    });
    cursorY -= LINE_HEIGHT;
  };

  const drawHeaderLine = () => {
    page.drawLine({
      start: { x: MARGIN_X, y: cursorY },
      end: { x: width - MARGIN_X, y: cursorY },
      thickness: 1.5,
      color: rgb(0.2, 0.5, 0.8),
    });
    cursorY -= 25;
  };

  const drawSectionTitle = (title: string) => {
    drawText(title, 14, true);
    cursorY -= 10;
  };

  const drawLabelValue = (label: string, value: string) => {
    page.drawText(label, {
      x: LABEL_X,
      y: cursorY,
      size: 12,
      font: boldFont,
      color: rgb(0, 0, 0),
    });
    const valueWidth = font.widthOfTextAtSize(value, 12);
    page.drawText(value, {
      x: VALUE_X - valueWidth,
      y: cursorY,
      size: 12,
      font,
      color: rgb(0, 0, 0),
    });
    cursorY -= LINE_HEIGHT;
  };

  /* ---------- Header ---------- */
  drawText("CAPTCHA Solver", 28, true);
  cursorY -= 5;
  drawHeaderLine();

  drawText(`Invoice #: ${invoiceNumber}`, 12);
  drawText(`Date: ${new Date().toLocaleDateString()}`, 12);

  cursorY -= 10;
  drawText(`Billed To: ${payment.user.email}`, 12, true);
  cursorY -= 10;

  /* ---------- Plan Details ---------- */
  drawSectionTitle("Invoice Details");

  drawText(`Plan: ${payment.plan.name}`, 13, true);
  cursorY -= 10;
  drawLabelValue("Base Price:", `Rs. ${payment.plan.price.toFixed(2)}`);

  const discount =
    payment.discountedPrice && payment.discountedPrice < payment.plan.price
      ? payment.plan.price - payment.discountedPrice
      : 0;
  drawLabelValue(
    "Discount:",
    discount > 0 ? `-Rs. ${discount.toFixed(2)}` : "-"
  );

  const gstAmount = payment.gstAmount ?? 0;
  drawLabelValue("GST:", `+Rs. ${gstAmount.toFixed(2)}`);

  cursorY -= 10;

  /* ---------- Total ---------- */
  page.drawLine({
    start: { x: MARGIN_X, y: cursorY },
    end: { x: width - MARGIN_X, y: cursorY },
    thickness: 1,
    color: rgb(0, 0, 0),
  });
  cursorY -= 25;

  const totalLabel = "Total Amount";
  const totalValue = `Rs. ${payment.amount.toFixed(2)}`;

  page.drawText(totalLabel, {
    x: LABEL_X,
    y: cursorY,
    size: 16,
    font: boldFont,
    color: rgb(0, 0, 0),
  });

  const valueWidth = boldFont.widthOfTextAtSize(totalValue, 16);
  page.drawText(totalValue, {
    x: VALUE_X - valueWidth,
    y: cursorY,
    size: 16,
    font: boldFont,
    color: rgb(0, 0, 0),
  });

  cursorY -= 30;

  /* ---------- Footer ---------- */
  page.drawText("Thank you for your purchase!", {
    x: MARGIN_X,
    y: cursorY,
    size: 12,
    font,
    color: rgb(0.4, 0.4, 0.4),
  });

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(filePath, pdfBytes);

  return filePath;
}
