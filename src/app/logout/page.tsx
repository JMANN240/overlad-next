'use client';

import { useToken } from "@/components/tokenProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
	const router = useRouter();
	const { setToken } = useToken();

	useEffect(() => {
		setToken(null);
		router.push('/');
	}, []);

	return (
		<main>
			<p>
				Logging you out...
			</p>
		</main>
	);
}
