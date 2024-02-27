/*
  Warnings:

  - Added the required column `precio_venta` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` ADD COLUMN `precio_venta` INTEGER NOT NULL;
