"use client";
import { loginWithGoogle } from "@/utils/auth";

export default function LoginPage() {
  const handleLogin = async () => {
    try {
      const user = await loginWithGoogle();
      console.log("Login success!");
      console.log("User data:", user)
    } catch (err) {
      if (err instanceof Error) {
        console.error("Login failed:", err.message);
      } else {
        console.error("Login failed:", err);
      }
    }
  };

  return (
    <div className="p-4">
      <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">
        Login with Google
      </button>
    </div>
  );
}
