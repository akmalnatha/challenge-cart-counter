import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    try {
      const response = await fetch('https://fakestoreapi.com/carts/11');
      
      if (!response.ok) {
        throw new Error('Failed to fetch cart data');
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

export async function POST(req: NextRequest) {
  try {
    const cartDataRequest = await req.json();

    const currentDate = new Date().toISOString().split("T")[0];

    const cartData = {
      userId: cartDataRequest.userId || 2,
      date: cartDataRequest.date || currentDate,
      products: cartDataRequest.products || [],
    };

    const response = await fetch('https://fakestoreapi.com/carts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartData),
    });

    if (!response.ok) {
      throw new Error('Failed to create cart');
    }

    const jsonResponse = await response.json();

    return NextResponse.json(jsonResponse, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
    }
  }
}
