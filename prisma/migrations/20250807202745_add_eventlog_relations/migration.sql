/*
  Warnings:

  - You are about to drop the column `product` on the `EventLog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EventLog" DROP COLUMN "product",
ADD COLUMN     "productId" TEXT,
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "EventLog" ADD CONSTRAINT "EventLog_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventLog" ADD CONSTRAINT "EventLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
