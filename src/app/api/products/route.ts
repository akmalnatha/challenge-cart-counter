import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        
        if (!response.ok) {
          throw new Error("Failed to fetch products");
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