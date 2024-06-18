-- CreateEnum
CREATE TYPE "role" AS ENUM ('CUSTOMER', 'ADMIN', 'SUPERADMIN');

-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "accountId" TEXT;

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "account_username_key" ON "account"("username");

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
