'use client';

import Button from "@/components/button";
import ImageWall from "@/components/imageWall";
import { useEffect, useState } from "react";

const DEFAULT_BUTTON_TEXT = 'Copy Link';

export default function Home() {
	const [text, setText] = useState('Me When');
	const [buttonText, setButtonText] = useState(DEFAULT_BUTTON_TEXT);
	const [imageIds, setImageIds] = useState<string[]>([]);

	useEffect(() => {
		const loadImages = async () => {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all_images`, {
				method: "GET",
			});

			const json = await response.json();

			setImageIds(json.ids);
		}

		loadImages();
	}, []);

	const link = `${process.env.NEXT_PUBLIC_API_URL}/overlay?id=uMUAN814ByzLYsqzaAW5CWdzXPX5KH2qT7exijV_Fug&text=${text}&thickness=1&scale=2`;

	const copyLink = () => {
        navigator.clipboard.writeText(link);
        setButtonText('Copied!');
        window.setTimeout(() => {
            setButtonText(DEFAULT_BUTTON_TEXT);
        }, 1000);
    }

	return (
		<main className="flex flex-col p-8 gap-4">
			<section className="grid lg:grid-cols-2 gap-4 min-h-128">
				<div>
					<h1 className="text-6xl">OverLad</h1>
					<h2 className="text-2xl mb-8">Your personal overlay companion</h2>
					<h2 className="text-2xl">Log in to start uploading images</h2>
				</div>
				<div className="flex flex-wrap gap-2 content-start">
					<ImageWall imageIds={imageIds} imageClassName="h-32 border" />
				</div>
			</section>
			<hr />
			<section className="grid lg:grid-cols-2 gap-4 min-h-96">
				<div>
					<h1 className="text-6xl">Step 1</h1>
					<h2 className="text-2xl">Upload or Select and Image</h2>
				</div>
				<div className="flex justify-center items-center">
					<img className="max-h-64 border" src={`${process.env.NEXT_PUBLIC_API_URL}/overlay?id=uMUAN814ByzLYsqzaAW5CWdzXPX5KH2qT7exijV_Fug&text=&thickness=0&scale=1`} />
				</div>
			</section>
			<hr />
			<section className="grid lg:grid-cols-2 gap-4 min-h-96">
				<div>
					<h1 className="text-6xl">Step 2</h1>
					<h2 className="text-2xl">Customize the Overlay</h2>
				</div>
				<div className="flex flex-col justify-center items-center gap-2">
					<img className="max-h-64 border" src={link} />
					<input className="outline-offset-1 focus:outline-1 border p-1 w-64" type="text" value={text} onChange={(e) => setText(e.target.value)} />
				</div>
			</section>
			<hr />
			<section className="grid lg:grid-cols-2 gap-4 min-h-96">
				<div>
					<h1 className="text-6xl">Step 3</h1>
					<h2 className="text-2xl">Copy Link and Use</h2>
				</div>
				<div className="flex flex-col justify-center items-center gap-2">
					<img className="max-h-64 border" src={link} />
					<Button type="button" onClick={copyLink}>{buttonText}</Button>
				</div>
			</section>
		</main>
	);
}
