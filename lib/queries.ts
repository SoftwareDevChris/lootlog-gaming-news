"use server";

import { z } from "zod";

// Firebase
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/init";

// Prisma
import { prisma } from "./db";

import { currentUser } from "@clerk/nextjs";
import { TArticle, TUser } from "@/types/types";

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

    return { status: 201, user: user, error: null };
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

    return { status: 201, users: user, error: null };
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

    return { status: 201, categories: categories, error: null };
  } catch (e) {
    console.error(e);
    return { status: 500, categories: null, error: "An error occurred" };
  }
}

// ---------------------
// Get one article by ID
// ---------------------
export async function getArticleById(id: string): Promise<{
  status: number;
  article: TArticle | null;
  error: string | null;
}> {
  try {
    const article = await prisma.article.findUnique({
      where: {
        id: id,
      },
      include: {
        author: true,
      },
    });

    return { status: 201, article: article, error: null };
  } catch (e) {
    console.error(e);
    return { status: 500, article: null, error: "An error occurred" };
  }
}

// ----------------
// Get all articles
// ----------------
export async function getAllArticles(): Promise<{
  status: number;
  articles: any;
  error: string | null;
}> {
  try {
    const articles = await prisma.article.findMany({});
    console.log("Fetched all articles");

    return { status: 201, articles: articles, error: null };
  } catch (e) {
    console.error(e);
    return { status: 500, articles: null, error: "An error occurred" };
  }
}

// ---------------------
// Create a new article
// ---------------------
const createArticleSchema = z.object({
  title: z.string().min(3).max(120),
  content: z.string().min(10).max(10000),
  category: z.number(),
  image: z.object({
    name: z.string(),
    type: z.string().regex(/image\/.*/),
    size: z.number().max(5000000),
  }),
});

export async function createArticle(content: string, data: FormData) {
  const validatedFields = createArticleSchema.safeParse({
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
        image_url: imageUrl,
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
      },
    });

    return { status: 201, statusText: "Created" };
  } catch (e) {
    console.error(e);
    return { status: 500, statusText: "Internal Server Error" };
  }
}
