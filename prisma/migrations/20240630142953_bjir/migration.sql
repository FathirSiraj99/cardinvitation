/*
  Warnings:

  - A unique constraint covering the columns `[accountId]` on the table `customers` will be added. If there are existing duplicate values, this will fail.
  - Made the column `accountId` on table `customers` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "customers" DROP CONSTRAINT "customers_accountId_fkey";

-- AlterTable
ALTER TABLE "customers" ALTER COLUMN "accountId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "customers_accountId_key" ON "customers"("accountId");

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
