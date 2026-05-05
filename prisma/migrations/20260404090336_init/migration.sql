/*
  Warnings:

  - You are about to drop the column `accessToken` on the `Account` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sessionToken]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,movieId]` on the table `WatchList` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,movieId]` on the table `Watched` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `WatchList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Watched` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "accessToken",
ADD COLUMN     "access_token" TEXT,
ADD COLUMN     "expires_at" INTEGER,
ADD COLUMN     "id_token" TEXT,
ADD COLUMN     "refresh_token" TEXT,
ADD COLUMN     "scope" TEXT,
ADD COLUMN     "session_state" TEXT,
ADD COLUMN     "token_type" TEXT,
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "emailVerified" TIMESTAMP(3),
ALTER COLUMN "email" DROP NOT NULL;

-- AlterTable
ALTER TABLE "WatchList" ADD COLUMN     "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "poster" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Watched" ADD COLUMN     "poster" TEXT,
ADD COLUMN     "rating" INTEGER,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "watchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "WatchList_userId_movieId_key" ON "WatchList"("userId", "movieId");

-- CreateIndex
CREATE UNIQUE INDEX "Watched_userId_movieId_key" ON "Watched"("userId", "movieId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
