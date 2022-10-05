/*
  Warnings:

  - Added the required column `quantity` to the `equipmentsOnInventory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "equipmentsOnInventory" ADD COLUMN     "quantity" INTEGER NOT NULL;
