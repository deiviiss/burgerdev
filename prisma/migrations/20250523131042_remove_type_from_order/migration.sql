/*
  Warnings:

  - You are about to drop the column `type` on the `OrderItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "type";

-- DropEnum
DROP TYPE "OrderItemType";
