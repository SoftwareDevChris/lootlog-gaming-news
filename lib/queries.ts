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
  title: z.string().min(3).max(120),
  content: z.string().min(10).max(10000),
  category: z.number(),
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
export async function getUserById(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
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

// --------------------------
// Get all article categories
// --------------------------
export async function getArticleCategories() {
  try {
    const categories = await prisma.category.findMany();

    return { status: 200, categories: categories, error: null };
  } catch (e) {
    console.error(e);
    return { status: 500, categories: null, error: "An error occurred" };
  }
}

// ---------------------
// Get one article by ID
// ---------------------
export async function getArticleById(id: string) {
  try {
    const article = await prisma.article.findUnique({
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
  const imageRef = ref(storage, `images/${article.image[0].name}`);
  const imageId = article.image[0].id;

  try {
    await deleteObject(imageRef);
    console.log("Deleted image from storage");

    await prisma.image.delete({
      where: {
        id: imageId,
      },
    });
    console.log("Deleted image database");

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
  articleId: string,
  isPublished: boolean,
) {
  const shouldPublish = !isPublished;

  try {
    await prisma.article.update({
      where: {
        id: articleId,
      },
      data: {
        is_published: shouldPublish,
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
  articleId: string,
  isFeatured: boolean,
) {
  const shouldFeature = !isFeatured;

  try {
    await prisma.article.update({
      where: {
        id: articleId,
      },
      data: {
        is_featured: shouldFeature,
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
      where: {
        is_published: true,
      },
      include: {
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
export async function getArticlesByUser(userId: string) {
  try {
    const articles = await prisma.article.findMany({
      where: {
        authorId: userId,
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

export async function createArticle(content: string, data: FormData) {
  const validatedFields = articleSchema.safeParse({
    title: data.get("title"),
    category: parseInt(data.get("category") as string),
    image: data.get("image"),
    content: content,
  });

  console.log("content:", content);
  console.log("data:", data);

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

    const user = await currentUser();
    // Create the article in the database
    await prisma.article.create({
      data: {
        // id
        // created_at:
        title: data.get("title") as string,
        content: content,
        // @ts-ignore
        category: {
          connect: {
            id: parseInt(data.get("category") as string),
          },
        },
        author: {
          connect: {
            id: user?.id,
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

// -----------------------
// Update an article by ID
// -----------------------
export async function updateArticle(
  newArticleBody: string,
  newArticleFields: FormData,
  previousImage?: TImage,
  previousArticleId?: string,
) {
  const validatedFields = articleSchema.safeParse({
    title: newArticleFields.get("title") as string,
    category: parseInt(newArticleFields.get("category") as string),
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
      previousImage[0].name !== newImage.name
    ) {
      console.log("Different image chosen");

      // Delete the existing image from storage
      const imageRef = ref(storage, `images/${previousImage[0].name}`);
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
          content: newArticleBody,
          category: {
            connect: {
              id: parseInt(newArticleFields.get("category") as string),
            },
          },
          image: {
            delete: {
              id: previousImage[0].id!, // Delete the previous image
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
          content: newArticleBody,
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
