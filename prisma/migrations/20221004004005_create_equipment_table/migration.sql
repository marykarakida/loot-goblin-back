/*
  Warnings:

  - Added the required column `bgColor` to the `equipments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "equipments" ADD COLUMN     "bgColor" TEXT NOT NULL;
