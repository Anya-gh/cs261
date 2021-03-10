/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[attKey]` on the table `Key`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[hostKey]` on the table `Key`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Key.attKey_unique" ON "Key"("attKey");

-- CreateIndex
CREATE UNIQUE INDEX "Key.hostKey_unique" ON "Key"("hostKey");
