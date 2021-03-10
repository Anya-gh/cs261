/*
  Warnings:

  - You are about to drop the column `userObject` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "userObject",
ADD COLUMN     "name" TEXT NOT NULL DEFAULT E'';
