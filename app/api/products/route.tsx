import { NextRequest, NextResponse } from "next/server";
import products from "@/db/products.json" with { type: "json" };
import path from "path";
import fs from "fs";

export async function GET (request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const page = Number(searchParams.get("page")) || 1;
        const limit = Number(searchParams.get("limit")) || 10;
        const searchText = searchParams.get("text") || "";

        let filteredProducts = products;
        if (searchText) filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchText.toLowerCase()));

        const data = filteredProducts.slice((page - 1) * limit, page * limit);
        const total = filteredProducts.length;
        const totalPages = Math.ceil(total / limit);
        const hasNextPage = page < totalPages;
        const hasPreviousPage = page > 1;
        const nextPage = hasNextPage ? page + 1 : null;
        const previousPage = hasPreviousPage ? page - 1 : null;
    
        return NextResponse.json({
            data,
            pagination: {
                page,
                total,
                totalPages,
                hasNextPage,
                hasPreviousPage,
                nextPage,
                previousPage,
            },
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: "Internal Server Error"}, { status: 500 });
    }
}


export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const newProduct = {
            id: products.length + 1,
            ...body,
            createdAt: new Date().toISOString(),
            isActive: true,
            tags: [],
        }

        products.push(newProduct);
        fs.writeFileSync(path.join(process.cwd(), "db", "products.json"), JSON.stringify(products, null, 2));
        return NextResponse.json({message: "Product created successfully"}, {status: 201});
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}