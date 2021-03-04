-- AlterTable
CREATE SEQUENCE "user_userid_seq";
ALTER TABLE "User" ALTER COLUMN "userID" SET DEFAULT nextval('user_userid_seq');
ALTER SEQUENCE "user_userid_seq" OWNED BY "public"."User"."userID";
