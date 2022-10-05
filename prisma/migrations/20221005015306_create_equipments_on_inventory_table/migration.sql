-- CreateEnum
CREATE TYPE "EquipmentStatus" AS ENUM ('new', 'viewed');

-- CreateTable
CREATE TABLE "equipmentsOnInventory" (
    "id" TEXT NOT NULL,
    "inventoryId" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "status" "EquipmentStatus" NOT NULL,

    CONSTRAINT "equipmentsOnInventory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "equipmentsOnInventory" ADD CONSTRAINT "equipmentsOnInventory_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "inventories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipmentsOnInventory" ADD CONSTRAINT "equipmentsOnInventory_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "equipments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
