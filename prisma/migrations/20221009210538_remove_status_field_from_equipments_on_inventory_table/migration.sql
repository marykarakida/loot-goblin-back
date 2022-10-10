/*
  Warnings:

  - You are about to drop the column `status` on the `equipmentsOnInventory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "equipmentsOnInventory" DROP COLUMN "status";

-- DropEnum
DROP TYPE "EquipmentStatus";
