-- CreateEnum
CREATE TYPE "MOVIE_STATUS_TYPE" AS ENUM ('WATCHED', 'WATCH_LATER');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movies" (
    "id" UUID NOT NULL,
    "externalId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "status" "MOVIE_STATUS_TYPE" NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "annotation" TEXT,
    "user_id" UUID NOT NULL,
    "folder_id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "folders" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "movid_id" UUID NOT NULL,

    CONSTRAINT "folders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "folders_name_user_id_key" ON "folders"("name", "user_id");

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "movies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "movies_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "folders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "folders" ADD CONSTRAINT "folders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
