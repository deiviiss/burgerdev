/*
  Warnings:

  - A unique constraint covering the columns `[label]` on the table `Branch` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `label` to the `Branch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Branch" ADD COLUMN     "label" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Branch_label_key" ON "Branch"("label");
