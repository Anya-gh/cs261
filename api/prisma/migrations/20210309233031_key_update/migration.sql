/*
  Warnings:

  - You are about to drop the column `keyObject` on the `Key` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Key" DROP COLUMN "keyObject",
ADD COLUMN     "attKey" INTEGER,
ADD COLUMN     "hostKey" INTEGER;
