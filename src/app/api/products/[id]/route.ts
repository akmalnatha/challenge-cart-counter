import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const productId = url.pathname.split("/").pop();
    
    if (!productId) {
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 }
      );
    }

    const response = await fetch(`https://fakestoreapi.com/products/${productId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
    }
  }
}
