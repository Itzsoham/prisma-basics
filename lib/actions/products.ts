"use server";

// import our generated Prisma Client
import { prisma } from "@/lib/prisma";

interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  category: string;
  // update our type to accept an array of image URLs
  images?: string[];
}

export async function createProduct(product: CreateProductInput) {
  try {
    const newProduct = await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        images: {
          create: product.images?.map((url) => ({ url })),
        },
      },
    });
    return newProduct;
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Error creating product");
  }
}

export async function getProductById(id: number) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        images: true,
        reviews: true,
      },
    });
    return product;
  } catch (error) {
    return null;
  }
}

export async function updateProduct(id: number, product: CreateProductInput) {
  try {
    const updatedProduct = await prisma.product.update({
      // where statement, just like reading a record
      where: { id },
      // data object is the exact same as 'create'.
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        images: {
          // delete previous images and create new ones
          deleteMany: {},
          create: product.images?.map((url) => ({ url })),
        },
      },
    });
    return updatedProduct;
  } catch (error) {
    return null;
  }
}
