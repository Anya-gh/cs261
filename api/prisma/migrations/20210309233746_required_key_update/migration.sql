/*
  Warnings:

  - Made the column `attKey` on table `Key` required. The migration will fail if there are existing NULL values in that column.
  - Made the column `hostKey` on table `Key` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Key" ALTER COLUMN "attKey" SET NOT NULL,
ALTER COLUMN "hostKey" SET NOT NULL;
