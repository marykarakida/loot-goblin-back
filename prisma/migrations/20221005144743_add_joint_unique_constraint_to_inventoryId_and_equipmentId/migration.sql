/*
  Warnings:

  - A unique constraint covering the columns `[inventoryId,equipmentId]` on the table `equipmentsOnInventory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "equipmentsOnInventory_inventoryId_equipmentId_key" ON "equipmentsOnInventory"("inventoryId", "equipmentId");
