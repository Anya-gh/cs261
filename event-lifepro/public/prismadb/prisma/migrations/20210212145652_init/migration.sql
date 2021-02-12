-- DropIndex
DROP INDEX "Key.keyID_unique";

-- DropIndex
DROP INDEX "Event.eventID_unique";

-- DropIndex
DROP INDEX "Response.responeID_unique";

-- AlterTable
ALTER TABLE "Event" ADD PRIMARY KEY ("eventID");

-- AlterTable
ALTER TABLE "Key" ADD PRIMARY KEY ("keyID");

-- AlterTable
ALTER TABLE "Response" ADD PRIMARY KEY ("responeID");

-- AddForeignKey
ALTER TABLE "Key" ADD FOREIGN KEY ("eventID") REFERENCES "Event"("eventID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD FOREIGN KEY ("eventID") REFERENCES "Event"("eventID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("eventID") REFERENCES "Event"("eventID") ON DELETE CASCADE ON UPDATE CASCADE;
