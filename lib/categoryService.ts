"use server";

// Prisma
import { prisma } from "./prismaClient";

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
