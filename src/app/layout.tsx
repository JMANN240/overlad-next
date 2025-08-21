import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import TokenProvider from "@/components/tokenProvider";

const roboto = Roboto({
	variable: "--font-roboto",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "OverLad",
	description: "Your personal overlay companion",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${roboto.variable} antialiased`}>
				<TokenProvider>
					<header className="px-4 py-2 border-b-1">
						<Navbar />
					</header>
					{children}
				</TokenProvider>
			</body>
		</html>
	);
}
