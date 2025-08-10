"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginWithGithub, loginWithGoogle, NormalLogin } from "@/utils/auth"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { toast, ToastContainer } from "react-toastify"

export function LoginForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const GithubLogin = async () => {
        try {
            const user = await loginWithGithub();
            if (user) {
                toast.success("Login successful!");
            }
        } catch (error) {
            if (error instanceof Error) {
                toast(`Github login error: ${error.message}`);
            } else {
                toast("Github login error: Unknown error");
            }
        }
    }
    const GoogleLogin = async () => {
        try {
            const user = await loginWithGoogle();
            if (user) {
                toast.success(user.message);
            }
        } catch (error) {
            if (error instanceof Error) {
                toast(`Google login error: ${error.message}`);
            } else {
                toast("Google login error: Unknown error");
            }
        }
    }

    const login = async () => {
        try {
            const user = await NormalLogin(email, password);
            if (user) {
                toast.success(user.message);
            }
        } catch (error) {
            if (error instanceof Error) {
                toast(`Login error: ${error.message}`);
            } else {
                toast("Login error: Unknown error");
            }
        }
    }

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Branded Section */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-cyan-500 via-blue-500 to-blue-700 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
                        <defs>
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                        <path d="M50 50 L350 50 L350 350 L50 350 Z" fill="none" stroke="white" strokeWidth="2" opacity="0.3" />
                        <path d="M100 100 L300 100 L300 300 L100 300 Z" fill="none" stroke="white" strokeWidth="2" opacity="0.2" />
                        <path d="M150 150 L250 150 L250 250 L150 250 Z" fill="none" stroke="white" strokeWidth="2" opacity="0.1" />
                    </svg>
                </div>

                <div className="relative z-10 flex flex-col m-10 justify-center items-start p-12 text-white h-full">
                    <div>
                        {/* Main Content */}
                        <div className="space-y-6">
                            <h1 className="text-5xl font-bold leading-tight">
                                Hello Kids!
                                <span className="inline-block ml-2 text-4xl">👋</span>
                            </h1>

                            <p className="text-2xl text-pink-100 leading-relaxed max-w-md">
                                Your perfect room, one tap away.
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-10">
                        <Link href="/credits">
                            <Button variant="link" className="text-cyan-200 text-md">Credits</Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 bg-gray-900 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8">
                    {/* Header */}
                    <div className="text-center lg:text-left">
                        <h2 className="text-2xl font-bold text-white mb-2">InKosan</h2>
                        <h3 className="text-3xl font-bold text-white mb-4">Welcome Back!</h3>
                        <p className="text-gray-400 text-sm">
                            Don't have an account?{" "}
                            <Link href="/register" className="text-blue-400 hover:text-blue-300 underline">
                                Create a new account now
                            </Link>
                            , it's FREE! Takes less than a minute.
                        </p>
                    </div>

                    {/* Login Form */}
                    <form className="space-y-6">
                        <div>
                            <Label htmlFor="email" className="sr-only">
                                Email
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="hisalim.ux@gmail.com"
                                className="w-full bg-transparent border-0 border-b-2 border-gray-600 rounded-none px-0 py-3 text-white placeholder-gray-400 focus:border-pink-400 focus:ring-0"
                            />
                        </div>

                        <div>
                            <Label htmlFor="password" className="sr-only">
                                Password
                            </Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full bg-transparent border-0 border-b-2 border-gray-600 rounded-none px-0 py-3 text-white placeholder-gray-400 focus:border-pink-400 focus:ring-0"
                            />
                        </div>

                        <div className="space-y-4 flex flex-col items-center w-full">
                            {/* Tombol Login */}
                            <Button
                                type="submit"
                                className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg font-medium"
                            >
                                Login
                            </Button>

                            <div className="grid grid-cols-2 gap-4 w-full">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex justify-center items-center bg-white hover:bg-gray-200 text-gray-900 border-gray-300 py-3 rounded-lg font-medium cursor-pointer"
                                    onClick={GoogleLogin}
                                >
                                    <Image src="/assets/logo/google.png" alt="Google Icon" width={20} height={20} className="w-5 h-5 mr-3" />

                                </Button>

                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex justify-center items-center bg-white hover:bg-gray-50 text-gray-900 border-gray-300 py-3 rounded-lg font-medium"
                                    onClick={GithubLogin}
                                >
                                    <Image src="/assets/logo/github.png" alt="GitHub Icon" width={20} height={20} className="w-5 h-5 mr-3" />

                                </Button>
                            </div>
                        </div>

                        <div className="text-center">
                            <Link href="/forgot-password" className="text-gray-400 hover:text-gray-300 text-sm">
                                Forget password <span className="underline">Click here</span>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            >

            </ToastContainer>
        </div>
    )
}
