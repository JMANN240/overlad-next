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
                            <img className={imageClassName} src={`${process.env.NEXT_PUBLIC_API_URL}/images/${imageId}.png`} />
                        </Link>
                    );
                })
            }
        </>
    );
}