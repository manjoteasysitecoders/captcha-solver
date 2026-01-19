-- AlterTable
ALTER TABLE "EmailVerificationToken" ADD COLUMN     "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "EmailVerificationToken_sentAt_idx" ON "EmailVerificationToken"("sentAt");
