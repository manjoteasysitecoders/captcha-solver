-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "invoiceNumber" TEXT,
ADD COLUMN     "invoicePdfUrl" TEXT,
ADD COLUMN     "invoicedAt" TIMESTAMP(3);
