/*
  Warnings:

  - You are about to drop the `ProductOnBranch` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductOnBranch" DROP CONSTRAINT "ProductOnBranch_branchId_fkey";

-- DropForeignKey
ALTER TABLE "ProductOnBranch" DROP CONSTRAINT "ProductOnBranch_productId_fkey";

-- DropTable
DROP TABLE "ProductOnBranch";

-- CreateTable
CREATE TABLE "_ProductBranches" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProductBranches_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ProductBranches_B_index" ON "_ProductBranches"("B");

-- AddForeignKey
ALTER TABLE "_ProductBranches" ADD CONSTRAINT "_ProductBranches_A_fkey" FOREIGN KEY ("A") REFERENCES "Branch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductBranches" ADD CONSTRAINT "_ProductBranches_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
