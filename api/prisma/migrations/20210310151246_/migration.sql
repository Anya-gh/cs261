/*
  Warnings:

  - You are about to drop the `Key` table. If the table is not empty, all the data it contains will be lost.
  - The migration will add a unique constraint covering the columns `[attKey]` on the table `Event`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[hostKey]` on the table `Event`. If there are existing duplicate values, the migration will fail.
  - Added the required column `attKey` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hostKey` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Key" DROP CONSTRAINT "Key_eventID_fkey";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "attKey" INTEGER NOT NULL,
ADD COLUMN     "hostKey" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Key";

-- CreateIndex
CREATE UNIQUE INDEX "Event.attKey_unique" ON "Event"("attKey");

-- CreateIndex
CREATE UNIQUE INDEX "Event.hostKey_unique" ON "Event"("hostKey");
