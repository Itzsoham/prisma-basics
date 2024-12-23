import AddReview from "@/components/product/AddReview";
import Product from "@/components/product/Product";
import Review from "@/components/product/Review";
import AddProduct from "@/components/product/AddProduct";
import DeleteProduct from "@/components/delete/DeleteProduct";
import { getProductById } from "@/lib/actions/products";

export const revalidate = 1;

export default async function Page({ params }: { params: { path: string[] } }) {
  const method = params.path[0];
  const id = params.path[1];

  const product = await getProductById(parseInt(id));

  if (method === "new") {
    return <AddProduct />;
  }

  if (method === "delete") {
    return <DeleteProduct id={id} />;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  if (method === "edit") {
    return <AddProduct edit id={id} product={product} />;
  }

  return (
    <div className="pt-20 grid md:grid-cols-2 gap-8 max-w-6xl mx-auto py-12 px-4">
      <Product product={product} />
      <div className="flex flex-col gap-y-5">
        <span className="text-2xl font-bold h-fit">Customer Reviews</span>
        <div className="grid gap-5">
          {/*
            map over reviews and send the review
            from our database to the Review component
          */}
          {product.reviews.map((review) => (
            <Review key={review.id} review={review} />
          ))}
        </div>
      </div>
      <div className="md:col-span-2">
        <AddReview id={id} />
      </div>
    </div>
  );
}
