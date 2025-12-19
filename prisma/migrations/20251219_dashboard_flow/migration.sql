-- Create ApiKey and Request tables

CREATE TABLE "ApiKey" (
  "id" TEXT PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
  "key" TEXT NOT NULL UNIQUE,
  "userId" TEXT NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
  "lastUsedAt" TIMESTAMP WITH TIME ZONE
);

CREATE TABLE "Request" (
  "id" TEXT PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
  "userId" TEXT NOT NULL,
  "status" TEXT NOT NULL,
  "credits" INTEGER DEFAULT 0,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE "ApiKey" ADD CONSTRAINT fk_apikey_user FOREIGN KEY ("userId") REFERENCES "User" ("id");
ALTER TABLE "Request" ADD CONSTRAINT fk_request_user FOREIGN KEY ("userId") REFERENCES "User" ("id");
