'use client';

import Link from "next/link";
import { useToken } from "./tokenProvider";

export default function Navbar() {
	const { token } = useToken();

	return (
		<nav className="flex justify-between items-center">
			<div>
				<Link className="text-2xl" href="/">OverLad</Link>
			</div>
			<div className="flex gap-4">
				{
					token ?
						<>
							<Link href="/profile">Your Images</Link>
							<Link href="/logout">Log Out</Link>
						</>
						:
						<>
							<Link href="/register">Register</Link>
							<Link href="/login">Log In</Link>
						</>
				}
			</div>
		</nav>
	);
}
