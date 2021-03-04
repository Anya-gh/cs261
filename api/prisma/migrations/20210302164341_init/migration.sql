/*
  Warnings:

  - The migration will change the primary key for the `Response` table. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `responeID` on the `Response` table. All the data in the column will be lost.
  - Added the required column `responseID` to the `Response` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Response" DROP CONSTRAINT "Response_pkey",
DROP COLUMN "responeID",
ADD COLUMN     "responseID" INTEGER NOT NULL,
ADD PRIMARY KEY ("responseID");
