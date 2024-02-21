-- CreateTable
CREATE TABLE "Tags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ArticleToTags" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ArticleToTags_AB_unique" ON "_ArticleToTags"("A", "B");

-- CreateIndex
CREATE INDEX "_ArticleToTags_B_index" ON "_ArticleToTags"("B");

-- AddForeignKey
ALTER TABLE "_ArticleToTags" ADD CONSTRAINT "_ArticleToTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleToTags" ADD CONSTRAINT "_ArticleToTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
