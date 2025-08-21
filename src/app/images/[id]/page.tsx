'use client';

import Button from "@/components/button";
import { useParams } from "next/navigation";
import { useState } from "react";

const DEFAULT_BUTTON_TEXT = 'Copy Link';

export default function Image() {
    const params = useParams<{ id: string }>();

    const [text, setText] = useState('');
    const [buttonText, setButtonText] = useState(DEFAULT_BUTTON_TEXT);
    const [scale, setScale] = useState(1);
    const [thickness, setThickness] = useState(0);

    const link = `http://localhost:3000/overlay?id=${params.id}&text=${text}&thickness=${thickness}&scale=${scale}`;

    const copyLink = () => {
        navigator.clipboard.writeText(link);
        setButtonText('Copied!');
        window.setTimeout(() => {
            setButtonText(DEFAULT_BUTTON_TEXT);
        }, 1000);
    }

    return (
        <main className="flex flex-col items-center p-8 gap-4">
            <img src={link} />
            <Button type="button" onClick={copyLink}>{buttonText}</Button>
            <input className="outline-offset-1 focus:outline-1 border p-1 w-64" type="text" value={text} onChange={(e) => setText(e.target.value)} />
            <input className="outline-offset-1 focus:outline-1 border p-1 w-64" type="number" min={0} max={10} value={thickness} onChange={(e) => setThickness(parseInt(e.target.value))} />
            <input className="outline-offset-1 focus:outline-1 border p-1 w-64" type="number" min={0} step="any" max={10} value={scale.toString()} onChange={(e) => setScale(parseFloat(e.target.value))} />
        </main>
    );
}
