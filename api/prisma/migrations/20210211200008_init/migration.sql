-- CreateTable
CREATE TABLE "User" (
    "userID" INTEGER NOT NULL,
    "eventID" INTEGER NOT NULL,
    "userObject" JSONB NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User.userID_unique" ON "User"("userID");
