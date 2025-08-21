import Link from "next/link";

export default function ImageWall({
    imageIds,
    imageClassName,
}: {
    imageIds: string[],
    imageClassName?: string,
}) {
    return (
        <>
            {
                imageIds.map((imageId) => {
                    return (
                        <Link key={imageId} href={`/images/${imageId}`}>
                            <img className={imageClassName} src={`http://localhost:3000/images/${imageId}.png`} />
                        </Link>
                    );
                })
            }
        </>
    );
}