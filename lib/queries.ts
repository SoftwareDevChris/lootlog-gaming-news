"use server";

import { z } from "zod";

// Firebase
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../firebase/init";

// Prisma
import { prisma } from "./db";

// Clerk
import { currentUser } from "@clerk/nextjs";

// Types
import { TArticle, TImage } from "@/types/types";

// Article validation schema
const articleSchema = z.object({
  title: z.string().min(3).max(100),
  content: z.string().min(10).max(10000),
  subtitle: z.string().min(3).max(100),
  categoryId: z.number(),
  image: z
    .object({
      name: z.string(),
      type: z.string().regex(/image\/.*/),
      size: z.number().max(5000000),
    })
    .nullable(),
});

// ----------------------
// Get a user by their ID
// ----------------------
export async function getUserByClerkId(clerkId: string) {
  try {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        clerkId: clerkId,
      },
    });

    return { status: 200, user: user, error: null };
  } catch (e) {
    console.error(e);
    return { status: 500, user: null, error: "An error occurred" };
  }
}

// --------------------------
// Get all users (ADMIN ONLY)
// --------------------------
export async function getAllUsers() {
  try {
    const user = await prisma.user.findMany();

    return { status: 200, users: user, error: null };
  } catch (e) {
    console.error(e);
    return { status: 500, users: null, error: "An error occurred" };
  }
}

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
        name: name,
      },
    });

    return { status: 201, statusText: "Created" };
  } catch (e) {
    console.error(e);
    return { status: 500, statusText: "Internal Server Error" };
  }
}

// ---------------------
// Get one article by ID
// ---------------------
export async function getArticleById(id: number) {
  try {
    const article = await prisma.article.findUniqueOrThrow({
      where: {
        id: id,
      },
      include: {
        author: true,
        category: true,
        image: true,
      },
    });

    return { status: 200, article: article, statusText: "OK" };
  } catch (e) {
    console.error(e);
    return { status: 500, article: null, statusText: "Internal Server Error" };
  }
}

// --------------------------
// Delete article image by ID
// --------------------------
export const deleteArticleImage = async (article: TArticle) => {
  const imageRef = ref(storage, `images/${article.image!.name}`);

  try {
    await deleteObject(imageRef);
    console.log("Deleted image from storage");

    return { status: 200, statusText: "OK" };
  } catch (e) {
    console.error(e);
    return { status: 500, statusText: "Internal Server Error" };
  }
};

export const deleteArticle = async (article: TArticle) => {
  try {
    await deleteArticleImage(article);

    await prisma.article.delete({
      where: {
        id: article.id,
      },
    });

    return { status: 200, statusText: "OK" };
  } catch (e) {
    console.error(e);
    return { status: 500, statusText: "Internal Server Error" };
  }
};

// ----------------------------------
// Toggle article public status by ID
// ----------------------------------
export async function toggleArticlePublicStatusById(
  articleId: number,
  isPublished: boolean,
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
  isFeatured: boolean,
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

// ----------------
// Get all articles
// ----------------
export async function getAllArticles() {
  try {
    const articles = await prisma.article.findMany({
      include: {
        image: true,
      },
    });
    console.log("Fetched all articles");

    return { status: 200, articles: articles, statusText: "OK" };
  } catch (e) {
    console.error(e);
    return { status: 500, articles: null, statusText: "Internal Server Error" };
  }
}

// -----------------------
// Get all public articles
// -----------------------
export async function getAllPublicArticles() {
  try {
    const articles = await prisma.article.findMany({
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: true,
        image: true,
        category: true,
      },
    });

    return { status: 200, articles: articles, statusText: "OK" };
  } catch (e) {
    console.error(e);
    return { status: 500, articles: null, statusText: "Internal Server Error" };
  }
}

// --------------------------
// Get all articles by userID
// --------------------------
export async function getArticlesByUser(clerkId: string) {
  try {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        clerkId: clerkId,
      },
    });

    const articles = await prisma.article.findMany({
      where: {
        authorId: user.id,
      },
      include: {
        image: true,
        author: true,
        category: true,
      },
    });

    return { status: 200, articles: articles, error: null };
  } catch (e) {
    console.error(e);
    return { status: 500, articles: null, error: "An error occurred" };
  }
}

// --------------------
// Create a new article
// --------------------
export async function createArticle(
  bound: { content: string; categoryId: number },
  data: FormData,
) {
  const validatedFields = articleSchema.safeParse({
    title: data.get("title"),
    subtitle: data.get("subtitle"),
    categoryId: bound.categoryId,
    image: data.get("image"),
    content: bound.content,
  });

  if (!validatedFields.success) {
    console.error(validatedFields.error);
    return { status: 400, statusText: "Bad Request" };
  }

  try {
    const image: File = data.get("image") as File;
    const storageRef = ref(storage, `images/${image.name}`);

    // Upload image file
    await uploadBytes(storageRef, image);

    // Get the URL of the image and return it
    const imageUrl = await getDownloadURL(
      ref(storage, `images/${image.name}`),
    ).then((url) => {
      return url;
    });

    const clerkUser = await currentUser();

    // Create the article in the database
    await prisma.article.create({
      data: {
        // id
        // created_at:
        title: data.get("title") as string,
        subtitle: data.get("subtitle") as string,
        body: bound.content,
        // @ts-ignore
        category: {
          connect: {
            id: bound.categoryId,
          },
        },
        author: {
          connect: {
            clerkId: clerkUser?.id,
          },
        },
        image: {
          create: {
            name: image.name,
            url: imageUrl,
          },
        },
      },
    });

    return { status: 201, statusText: "Created" };
  } catch (e) {
    console.error(e);
    return { status: 500, statusText: "Internal Server Error" };
  }
}

// FIX FIX FIX FIX FIX FIX
// -----------------------
// Update an article by ID
// -----------------------
export async function updateArticle(
  newArticleBody: string,
  newArticleFields: FormData,
  previousImage?: TImage,
  previousArticleId?: number,
) {
  const validatedFields = articleSchema.safeParse({
    title: newArticleFields.get("title") as string,
    subtitle: newArticleFields.get("subtitle") as string,
    category: parseInt(newArticleFields.get("category") as string), // FIX
    image: newArticleFields.get("image"),
    content: newArticleBody,
  });

  if (!validatedFields.success) {
    console.error(validatedFields.error);
    return { status: 400, statusText: `Error: ${validatedFields.error}` };
  }

  const newImage = newArticleFields.get("image") as File;

  try {
    // --------------------------------------------------------
    // If the user has chosen a different image for the article
    // --------------------------------------------------------
    if (
      newImage &&
      previousImage &&
      previousArticleId &&
      previousImage.name !== newImage.name
    ) {
      console.log("Different image chosen");

      // Delete the existing image from storage
      const imageRef = ref(storage, `images/${previousImage.name}`);
      await deleteObject(imageRef);

      // Upload the new image to storage
      const storageRef = ref(storage, `images/${newImage.name}`);
      await uploadBytes(storageRef, newImage);

      // Get the URL of the newly uploaded image and return it
      const imageUrl = await getDownloadURL(
        ref(storage, `images/${newImage.name}`),
      ).then((url) => {
        return url;
      });

      // Update the article in the database
      await prisma.article.update({
        where: {
          id: previousArticleId!,
        },
        data: {
          title: newArticleFields.get("title") as string,
          body: newArticleBody,
          category: {
            connect: {
              id: parseInt(newArticleFields.get("category") as string),
            },
          },
          image: {
            delete: {
              id: previousImage.id!, // Delete the previous image
            },
            create: {
              name: newImage.name,
              url: imageUrl,
            },
          },
        },
      });
    }
    // -------------------------------------------------------------
    // If the user has chosen the same image for the updated article
    // -------------------------------------------------------------
    else {
      console.log("Same image chosen");

      // Update the article in the database with the new values
      await prisma.article.update({
        where: {
          id: previousArticleId!,
        },
        data: {
          title: newArticleFields.get("title") as string,
          body: newArticleBody,
          category: {
            connect: {
              id: parseInt(newArticleFields.get("category") as string),
            },
          },
        },
      });
    }
  } catch (e) {
    console.error(e);
    return { status: 500, statusText: "Internal Server Error" };
  }

  return { status: 200, statusText: "OK" };
}
