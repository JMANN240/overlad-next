'use client'

import { createContext, useContext, useState } from 'react'

interface TokenContextValue {
	token: string | null;
	setToken: (token: string | null) => void;
}

const TokenContext = createContext<TokenContextValue | undefined>(undefined);

export default function TokenProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const [token, setTokenRaw] = useState<string | null>(null);

	function setToken(token: string | null) {
		if (token !== null) {
			localStorage.setItem('overlad_token', token);
		} else {
			localStorage.removeItem('overlad_token');
		}

		setTokenRaw(token);
	}

	return (
		<TokenContext.Provider value={{ token, setToken }}>
			{children}
		</TokenContext.Provider>
	);
}

export function useToken() {
	const context = useContext(TokenContext);
	if (!context) throw new Error("useToken must be used within an TokenProvider");
	return context;
}

