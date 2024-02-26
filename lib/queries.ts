"use server";

// Prisma
import { prisma } from "./db";

// Clerk Auth
import { currentUser } from "@clerk/nextjs";

// Types
import { TArticle, TCategory, TUser } from "./../types/types";

type TGetUserByEmail = {
  data: TUser | null;
  error: string | null;
};

type TCreateArticle = {
  data: TArticle | null;
  error: string | null;
};

type TArticleCategories = {
  data: TCategory[] | null;
  error: string | null;
};

export async function getUserByEmail(): Promise<TGetUserByEmail> {
  const user = await currentUser();

  if (!user) {
    return { data: null, error: "No user was provided" };
  }

  const queryResult = await prisma.user.findUnique({
    where: {
      email: user.emailAddresses[0].emailAddress,
    },
  });

  if (!queryResult) {
    return { data: null, error: "No user was found" };
  }

  return { data: queryResult, error: null };
}

export async function getArticleCategories(): Promise<TArticleCategories> {
  const categories = await prisma.category.findMany();

  if (!categories) {
    return { data: null, error: "No categories were found" };
  } else return { data: categories, error: null };
}

export async function createArticle(article: {
  title: string;
  categoryId: number;
  content: string;
}): Promise<TCreateArticle> {
  const user = await currentUser();

  if (!user) {
    return { data: null, error: "No user was provided" };
  }

  console.log(article.categoryId);

  const postResult = await prisma.article.create({
    data: {
      // id
      // created_at:
      title: article.title,
      content: article.content,
      category: {
        connect: {
          id: article.categoryId,
        },
      },
      author: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  if (!postResult) {
    return { data: null, error: "There was an error creating the article" };
  }

  return { data: postResult, error: null };
}
