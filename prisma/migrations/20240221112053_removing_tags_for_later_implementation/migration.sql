/*
  Warnings:

  - You are about to drop the `_ArticleToTags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ArticleToTags" DROP CONSTRAINT "_ArticleToTags_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArticleToTags" DROP CONSTRAINT "_ArticleToTags_B_fkey";

-- AlterTable
ALTER TABLE "Article" ALTER COLUMN "content" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "_ArticleToTags";
