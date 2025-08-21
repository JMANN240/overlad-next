'use client';

import Button from "@/components/button";
import { useToken } from "@/components/tokenProvider";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Register() {
	const router = useRouter();
	const { setToken } = useToken();

	const [errorText, setErrorText] = useState<string | null>(null);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const handleUsernameInput = (event: ChangeEvent<HTMLInputElement>) => {
		setUsername(event.target.value);
	}

	const handlePasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	}

	const handleConfirmPasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
		setConfirmPassword(event.target.value);
	}

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		const response = await fetch('http://localhost:3000/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username,
				password,
				confirm_password: confirmPassword,
			})
		});

		if (response.status === 409) {
			setErrorText('Username already exists!')
		} else if (response.status === 201) {
			const response = await fetch('http://localhost:3000/token', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username,
					password,
				})
			});

			const token = await response.text();

			setToken(token);

			router.push('/');
		}
	}

	return (
		<main className="flex flex-col items-center p-8">
			<div className="border p-4">
				<form className="flex flex-col gap-2" onSubmit={handleSubmit}>
					{
						errorText &&
						<p className="text-red-500">{errorText}</p>
					}
					<input className="outline-offset-1 focus:outline-1 border p-1" value={username} onChange={handleUsernameInput} type="text" name="username" placeholder="Username" required />
					<input className="outline-offset-1 focus:outline-1 border p-1" value={password} onChange={handlePasswordInput} type="password" name="password" placeholder="Password" required />
					<input className="outline-offset-1 focus:outline-1 border p-1" value={confirmPassword} onChange={handleConfirmPasswordInput} type="password" name="confirm-password" placeholder="Confirm Password" required />
					<Button type="submit">Register</Button>
				</form>
			</div>
		</main>
	);
}
