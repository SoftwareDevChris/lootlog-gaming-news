"use server";

import { prisma } from "./prismaClient";

import { TArticle } from "@/types/types";

import {
  ref,
  deleteObject,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "./firebase";
import { getSession } from "./sessionService";
import {
  TInitialNewsArticleState,
  TInitialVideoArticleState,
  videoArticleSchema,
} from "./schemas";

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

    return { status: 200, articles: articles, message: "OK" };
  } catch (e) {
    console.error(e);
    return { status: 500, articles: null, message: "internal server error" };
  }
}

// --------------------------
// Get articles from category
// --------------------------
export async function getArticlesByCategory(
  categoryName: string,
  amount?: number,
  skip?: number,
) {
  try {
    const articles = await prisma.article.findMany({
      where: {
        category: {
          name: categoryName.toLowerCase(),
        },
      },
      take: amount,
      skip: skip,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        image: true,
      },
    });

    return { status: 200, articles: articles, message: "OK" };
  } catch (e) {
    console.error(e);
    return { status: 500, articles: null, message: "internal server error" };
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
        image: true,
        category: true,
      },
    });

    return { status: 200, articles: articles, message: "OK" };
  } catch (e) {
    console.error(e);
    return { status: 500, articles: null, message: "internal server error" };
  }
}

// --------------------------
// Get all articles by userID
// --------------------------
export async function getAllArticlesByUser(userId: number) {
  try {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        id: userId,
      },
    });

    if (!user) return { status: 400, message: "bad request" };

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
    return { status: 500, articles: null, error: "internal server error" };
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

    return { status: 200, article: article, message: "OK" };
  } catch (e) {
    console.error(e);
    return { status: 500, article: null, message: "internal server error" };
  }
}
// -------------------------
// Create a new news article
// -------------------------
export async function createNewsArticle(
  bound: { body: string; categoryId: number },
  state: TInitialNewsArticleState,
  data: FormData,
) {
  console.log("Bound:", bound);
  console.log("State:", state);
  console.log("Data:", data);

  const validatedFields = videoArticleSchema.safeParse({
    title: data.get("title"),
    subtitle: data.get("subtitle"),
    categoryId: bound.categoryId,
    image: data.get("image"),
    body: bound.body,
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten());
    return {
      status: 400,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "bad request",
    };
  }

  return { status: 400, message: "bad request", errors: null };

  const session = await getSession();

  if (!session) return { status: 400, message: "not allowed", errors: null };

  try {
    const image: File = data.get("image") as File;
    const storageRef = ref(storage, `images/${image.name}`);

    // Upload image file
    const isImageUploaded = await uploadBytes(storageRef, image);

    if (!isImageUploaded)
      return { status: 500, message: "image upload failed", errors: null };

    // Get the URL of the image and return it
    const imageUrl = await getDownloadURL(
      ref(storage, `images/${image.name}`),
    ).then((url) => {
      return url;
    });

    if (!imageUrl)
      return { status: 500, message: "failed to get image link", errors: null };

    // Create the article in the database
    await prisma.article.create({
      data: {
        // id
        // created_at:
        title: data.get("title") as string,
        subtitle: data.get("subtitle") as string,
        body: bound.body,
        // @ts-ignore
        category: {
          connect: {
            id: bound.categoryId,
          },
        },
        author: {
          connect: {
            id: session.user.id,
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

    return { status: 201, message: "created", errors: null };
  } catch (e) {
    console.error(e);
    return { status: 500, message: "internal server error", errors: null };
  }
}

// --------------------------
// Create a new video article
// --------------------------
export async function createVideoArticle(
  bound: { body: string; categoryId: number },
  state: TInitialVideoArticleState,
  data: FormData,
) {
  console.log("Bound:", bound);
  console.log("State:", state);
  console.log("Data:", data);

  const validatedFields = videoArticleSchema.safeParse({
    title: data.get("title"),
    subtitle: data.get("subtitle"),
    categoryId: bound.categoryId,
    videoLink: data.get("videoLink"),
    body: bound.body,
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten());
    return {
      status: 400,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "bad request",
    };
  }

  return { status: 400, message: "bad request", errors: null };

  const session = await getSession();

  if (!session) return { status: 400, message: "not allowed", errors: null };

  try {
    const image: File = data.get("image") as File;
    const storageRef = ref(storage, `images/${image.name}`);

    // Upload image file
    const isImageUploaded = await uploadBytes(storageRef, image);

    if (!isImageUploaded)
      return { status: 500, message: "image upload failed", errors: null };

    // Get the URL of the image and return it
    const imageUrl = await getDownloadURL(
      ref(storage, `images/${image.name}`),
    ).then((url) => {
      return url;
    });

    if (!imageUrl)
      return { status: 500, message: "failed to get image link", errors: null };

    // Create the article in the database
    await prisma.article.create({
      data: {
        // id
        // created_at:
        title: data.get("title") as string,
        subtitle: data.get("subtitle") as string,
        body: bound.body,
        // @ts-ignore
        category: {
          connect: {
            id: bound.categoryId,
          },
        },
        author: {
          connect: {
            id: session.user.id,
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

    return { status: 201, message: "created", errors: null };
  } catch (e) {
    console.error(e);
    return { status: 500, message: "internal server error", errors: null };
  }
}

// FIX FIX FIX FIX FIX FIX FIX
// -----------------------
// Update an article by ID FIX
// -----------------------
// FIX FIX FIX FIX FIX FIX FIX

// export async function updateArticle(
//   bound: { body: string; categoryId: number; previousImage: TImage },
//   data: FormData,
// ) {
//   const validatedFields = articleSchema.safeParse({
//     title: data.get("title") as string,
//     subtitle: data.get("subtitle") as string,
//     categoryId: bound.categoryId, // FIX
//     image: data.get("image"),
//     body: bound.body,
//   });

//   if (!validatedFields.success) {
//     console.error(validatedFields.error);
//     return { status: 400, message: `Error: ${validatedFields.error}` };
//   }

//   const newImage = data.get("image") as File;

//   try {
//     // --------------------------------------------------------
//     // If the user has chosen a different image for the article
//     // --------------------------------------------------------
//     if (
//       newImage &&
//       bound.previousImage &&
//       bound.categoryId &&
//       bound.previousImage.name !== newImage.name
//     ) {
//       console.log("Different image chosen");

//       // Delete the existing image from storage
//       const imageRef = ref(storage, `images/${bound.previousImage.name}`);
//       await deleteObject(imageRef);

//       // Upload the new image to storage
//       const storageRef = ref(storage, `images/${newImage.name}`);
//       await uploadBytes(storageRef, newImage);

//       // Get the URL of the newly uploaded image and return it
//       const imageUrl = await getDownloadURL(
//         ref(storage, `images/${newImage.name}`),
//       ).then((url) => {
//         return url;
//       });

//       // Update the article in the database
//       await prisma.article.update({
//         where: {
//           id: bound.categoryId!,
//         },
//         data: {
//           title: data.get("title") as string,
//           body: bound.body,
//           category: {
//             connect: {
//               id: bound.categoryId,
//             },
//           },
//           image: {
//             delete: {
//               id: bound.previousImage.id!, // Delete the previous image
//             },
//             create: {
//               name: newImage.name,
//               url: imageUrl,
//             },
//           },
//         },
//       });
//     }
//     // ------------------------------------------------------
//     // If the user has NOT chosen a new image for the article
//     // ------------------------------------------------------
//     else {
//       console.log("Same image chosen");

//       // Update the article in the database with the new values
//       await prisma.article.update({
//         where: {
//           id: previousArticleId!,
//         },
//         data: {
//           title: newArticleFields.get("title") as string,
//           body: newArticleBody,
//           category: {
//             connect: {
//               id: parseInt(newArticleFields.get("category") as string),
//             },
//           },
//         },
//       });
//     }
//   } catch (e) {
//     console.error(e);
//     return { status: 500, message: "Internal Server Error" };
//   }

//   return { status: 200, message: "OK" };
// }

// --------------------------
// Delete article image by ID
// --------------------------
export const deleteArticleImage = async (article: TArticle) => {
  const imageRef = ref(storage, `images/${article.image!.name}`);

  try {
    await deleteObject(imageRef);
    console.log("Deleted image from storage");

    return { status: 200, message: "OK" };
  } catch (e) {
    console.error(e);
    return { status: 500, message: "Internal Server Error" };
  }
};

// -------------------------
// Delete article an article
// -------------------------
export const deleteArticle = async (article: TArticle) => {
  try {
    await deleteArticleImage(article);

    await prisma.article.delete({
      where: {
        id: article.id,
      },
    });

    return { status: 200, message: "OK" };
  } catch (e) {
    console.error(e);
    return { status: 500, message: "Internal Server Error" };
  }
};
