"use server";

// Prisma
import { prisma } from "./prismaClient";

import { TArticle, TImage } from "@/types/article.types";

// ------------------
// Get all categories
// ------------------
export async function getAllCategories() {
  try {
    const categories = await prisma.category.findMany();

    return { status: 200, categories: categories, error: null };
  } catch (e) {
    console.error(e);
    return { status: 500, categories: null, error: "An error occurred" };
  }
}

// --------------------------------
// Get all categories with articles
// --------------------------------
export async function getAllCategoriesWithArticles() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        articles: true,
      },
    });

    return { status: 200, categories: categories, error: null };
  } catch (e) {
    console.error(e);
    return { status: 500, categories: null, error: "An error occurred" };
  }
}

// ---------------------
// Create a new category
// ---------------------
export async function createNewCategory(data: FormData) {
  const name = data.get("name") as string;

  if (!name) {
    return { status: 400, statusText: "Bad Request" };
  }

  try {
    await prisma.category.create({
      data: {
        name: name.toLowerCase(),
      },
    });

    return { status: 201, statusText: "Created" };
  } catch (e) {
    console.error(e);
    return { status: 500, statusText: "Internal Server Error" };
  }
}

// ----------------------------------
// Toggle article public status by ID
// ----------------------------------
export async function toggleArticlePublicStatusById(
  articleId: number,
  isPublished: boolean
) {
  const shouldPublish = !isPublished;

  try {
    await prisma.article.update({
      where: {
        id: articleId,
      },
      data: {
        isPublic: shouldPublish,
      },
    });

    return { status: 200, statusText: "OK" };
  } catch (e) {
    console.error(e);
    return { status: 500, statusText: "Internal Server Error" };
  }
}

// -----------------------------------
// Toggle article feature status by ID
// -----------------------------------
export async function toggleArticleFeatureStatusById(
  articleId: number,
  isFeatured: boolean
) {
  const shouldFeature = !isFeatured;

  try {
    await prisma.article.update({
      where: {
        id: articleId,
      },
      data: {
        isFeatured: shouldFeature,
      },
    });

    return { status: 200, statusText: "OK" };
  } catch (e) {
    console.error(e);
    return { status: 500, statusText: "Internal Server Error" };
  }
}
