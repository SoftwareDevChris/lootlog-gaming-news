/*
  Warnings:

  - You are about to drop the column `github` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `linkedin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `twitter` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "github",
DROP COLUMN "image",
DROP COLUMN "linkedin",
DROP COLUMN "name",
DROP COLUMN "twitter",
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "github_rul" TEXT,
ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "linkedin_url" TEXT,
ADD COLUMN     "twitter_url" TEXT;
