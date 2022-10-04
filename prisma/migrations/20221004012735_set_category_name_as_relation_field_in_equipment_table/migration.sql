/*
  Warnings:

  - You are about to drop the column `categoryId` on the `equipments` table. All the data in the column will be lost.
  - Added the required column `categoryName` to the `equipments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "equipments" DROP CONSTRAINT "equipments_categoryId_fkey";

-- AlterTable
ALTER TABLE "equipments" DROP COLUMN "categoryId",
ADD COLUMN     "categoryName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "equipments" ADD CONSTRAINT "equipments_categoryName_fkey" FOREIGN KEY ("categoryName") REFERENCES "categories"("name") ON DELETE CASCADE ON UPDATE CASCADE;
