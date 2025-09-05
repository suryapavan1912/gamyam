"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ProductFormData } from "@/app/edit/page";


interface ProductFormProps {
    formData: ProductFormData;
    setFormData: (product: ProductFormData) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ProductForm = ({ formData, setFormData, handleSubmit }: ProductFormProps) => {

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mx-auto min-w-2xl p-8 border rounded-lg">
            <div className="flex flex-col gap-2">
                <Label>Name</Label>
                <Input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            </div>
            <div className="flex flex-col gap-2">
                <Label>Description</Label>
                <Textarea rows={10} placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
            </div>
            <div className="flex flex-col gap-2">
                <Label>Price</Label>
                <Input type="number" placeholder="Price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} required />
            </div>
            <div className="flex flex-col gap-2">
                <Label>Stock</Label>
                <Input type="number" placeholder="Stock" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })} />
            </div>
            <div className="flex flex-col gap-2">
                <Label>Category</Label>
                <Input type="text" placeholder="Category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required />
            </div>
            <Button type="submit">Save</Button>
        </form>
    );
}

export default ProductForm;