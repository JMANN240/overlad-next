'use client';

import Button from "@/components/button";
import { useToken } from "@/components/tokenProvider";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Upload() {
    const router = useRouter();
    const { token } = useToken();

    const [errorText, setErrorText] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        const res = await fetch("http://localhost:3000/upload", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        const data = await res.json();

        router.push(`/images/${data.id}`);
    };

    return (
        <main className="flex flex-col items-center p-8">
            <div className="border p-4">
                <form encType="multipart/form-data" className="flex flex-col gap-2" onSubmit={handleSubmit}>
                    {
                        errorText &&
                        <p className="text-red-500">{errorText}</p>
                    }
                    <input className="outline-offset-1 focus:outline-1 border p-1" onChange={(e) => setFile(e.target.files?.[0] || null)} type="file" name="image" required />
                    <Button type="submit">Upload</Button>
                </form>
            </div>
        </main>
    );
}
