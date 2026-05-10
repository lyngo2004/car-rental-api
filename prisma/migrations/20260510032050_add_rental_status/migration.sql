/*
  Warnings:

  - You are about to drop the column `issuedAt` on the `Rental` table. All the data in the column will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "RentalStatus" ADD VALUE 'APPROVED';
ALTER TYPE "RentalStatus" ADD VALUE 'REJECTED';

-- AlterTable
ALTER TABLE "Rental" DROP COLUMN "issuedAt",
ALTER COLUMN "rentalStatus" SET DEFAULT 'PENDING';
