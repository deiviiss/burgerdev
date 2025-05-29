/*
  Warnings:

  - A unique constraint covering the columns `[label]` on the table `PhoneNumberMenu` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PhoneNumberMenu_label_key" ON "PhoneNumberMenu"("label");
