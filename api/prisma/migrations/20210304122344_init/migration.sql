/*
  Warnings:

  - The migration will change the primary key for the `Response` table. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `responeID` on the `Response` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Response" DROP CONSTRAINT "Response_pkey",
DROP COLUMN "responeID",
ADD COLUMN     "responseID" SERIAL NOT NULL,
ADD PRIMARY KEY ("responseID");
