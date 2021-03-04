-- AlterTable
CREATE SEQUENCE "event_eventid_seq";
ALTER TABLE "Event" ALTER COLUMN "eventID" SET DEFAULT nextval('event_eventid_seq');
ALTER SEQUENCE "event_eventid_seq" OWNED BY "public"."Event"."eventID";

-- AlterTable
CREATE SEQUENCE "key_keyid_seq";
ALTER TABLE "Key" ALTER COLUMN "keyID" SET DEFAULT nextval('key_keyid_seq');
ALTER SEQUENCE "key_keyid_seq" OWNED BY "public"."Key"."keyID";

-- AlterTable
CREATE SEQUENCE "response_responeid_seq";
ALTER TABLE "Response" ALTER COLUMN "responeID" SET DEFAULT nextval('response_responeid_seq');
ALTER SEQUENCE "response_responeid_seq" OWNED BY "public"."Response"."responeID";
