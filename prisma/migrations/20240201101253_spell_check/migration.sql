/*
  Warnings:

  - You are about to drop the column `github_rul` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "github_rul",
ADD COLUMN     "github_url" TEXT;
