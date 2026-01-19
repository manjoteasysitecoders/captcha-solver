-- DropIndex
DROP INDEX "EmailVerificationToken_token_key";

-- AlterTable
ALTER TABLE "EmailVerificationToken" ADD COLUMN     "attempts" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "EmailVerificationToken_expiresAt_idx" ON "EmailVerificationToken"("expiresAt");
