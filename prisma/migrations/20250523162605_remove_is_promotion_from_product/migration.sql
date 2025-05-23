/*
  Warnings:

  - You are about to drop the column `isPromotion` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "isPromotion";

-- AlterTable
ALTER TABLE "Promotion" ALTER COLUMN "categoryId" DROP DEFAULT;
