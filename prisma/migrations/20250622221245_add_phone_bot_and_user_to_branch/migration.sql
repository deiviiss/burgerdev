/*
  Warnings:

  - You are about to drop the `PhoneNumberMenu` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `phone` on table `Branch` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Branch" ADD COLUMN     "phoneBot" TEXT,
ADD COLUMN     "phoneUser" TEXT,
ALTER COLUMN "phone" SET NOT NULL;

-- DropTable
DROP TABLE "PhoneNumberMenu";
