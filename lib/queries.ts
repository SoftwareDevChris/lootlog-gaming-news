"use server";

import { z } from "zod";

// Firebase
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/init";

// Prisma
import { prisma } from "./db";

import { currentUser } from "@clerk/nextjs";

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
// Create a new article
// ---------------------
const createArticleSchema = z.object({
  title: z.string().min(3).max(100),
  content: z.string().min(10).max(10000),
  category: z.number(),
  image: z.object({
    name: z.string(),
    type: z.string().regex(/image\/.*/),
    size: z.number().max(1000000),
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
    const storageRef = ref(storage, `images/${image.name}-${Date.now()}`);

    // Upload image file
    await uploadBytes(storageRef, image);

    // Get the URL of the image and return it
    const imageUrl = await getDownloadURL(
      ref(storage, `images/${image.name}-${Date.now()}`),
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
