/*
  Warnings:

  - You are about to drop the column `customersId` on the `wedings` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[customerId]` on the table `wedings` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customerId` to the `wedings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "wedings" DROP CONSTRAINT "wedings_customersId_fkey";

-- AlterTable
ALTER TABLE "wedings" DROP COLUMN "customersId",
ADD COLUMN     "customerId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "wedings_customerId_key" ON "wedings"("customerId");

-- AddForeignKey
ALTER TABLE "wedings" ADD CONSTRAINT "wedings_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
