-- AlterTable
ALTER TABLE "EventLog" ADD COLUMN     "promotionId" TEXT;

-- AddForeignKey
ALTER TABLE "EventLog" ADD CONSTRAINT "EventLog_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "Promotion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
