"use server";

// import our generated Prisma Client
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";

interface CreateReviewInput {
  name: string;
  content: string;
  rating: number;
  productId: number;
}

export async function createReview(input: CreateReviewInput) {
  try {
    const newReview = await prisma.review.create({
      data: {
        name: input.name,
        content: input.content,
        rating: input.rating,
        product: {
          connect: {
            id: input.productId,
          },
        },
      },
    });

    revalidateTag("Product");
    return newReview;
  } catch (error) {
    console.error("Error creating product:", error);
    return false;
  }
}
