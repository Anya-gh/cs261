-- CreateTable
CREATE TABLE "Event" (
    "eventID" INTEGER NOT NULL,
    "eventObject" JSONB NOT NULL,
    "templateObject" JSONB NOT NULL,
    "forumObject" JSONB NOT NULL,
    "analysisObject" JSONB NOT NULL
);

-- CreateTable
CREATE TABLE "Key" (
    "keyID" INTEGER NOT NULL,
    "eventID" INTEGER NOT NULL,
    "keyObject" JSONB NOT NULL
);

-- CreateTable
CREATE TABLE "Response" (
    "responeID" INTEGER NOT NULL,
    "eventID" INTEGER NOT NULL,
    "userID" INTEGER NOT NULL,
    "responseObject" JSONB NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Event.eventID_unique" ON "Event"("eventID");

-- CreateIndex
CREATE UNIQUE INDEX "Key.keyID_unique" ON "Key"("keyID");

-- CreateIndex
CREATE UNIQUE INDEX "Response.responeID_unique" ON "Response"("responeID");
