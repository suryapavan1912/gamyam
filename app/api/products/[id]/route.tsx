import { NextRequest, NextResponse } from "next/server";
import products from "@/db/products.json" with { type: "json" };
import path from "path";
import fs from "fs";

export async function GET (request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const product = products.find((product) => product.id === Number(id));
        return NextResponse.json(product);
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: "Internal Server Error"}, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: productId } = await params;
        const details = await request.json();
        const productIndex = products.findIndex((product) => product.id === Number(productId));
        if (productIndex === -1) return NextResponse.json({error: "Product not found"}, {status: 404});

        products[productIndex] = {
            ...products[productIndex],
            ...details,
        }

        fs.writeFileSync(path.join(process.cwd(), "db", "products.json"), JSON.stringify(products, null, 2));
        return NextResponse.json({message: "Product updated successfully"}, {status: 200});

    } catch (error) {
        console.error(error);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}