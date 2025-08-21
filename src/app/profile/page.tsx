'use client';

import Button from "@/components/button";
import ImageWall from "@/components/imageWall";
import { useToken } from "@/components/tokenProvider";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Profile() {
    const { token } = useToken();

    const [imageIds, setImageIds] = useState<string[]>([]);

    useEffect(() => {
        const loadImages = async () => {
            const response = await fetch("http://localhost:3000/user_images", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const json = await response.json();

            setImageIds(json.ids);
        }

        loadImages();
    });

    return (
        <main className="flex flex-wrap p-8 gap-4">
            <ImageWall imageIds={imageIds} imageClassName="h-64 border" />
        </main>
    );
}
