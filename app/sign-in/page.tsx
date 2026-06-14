"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Leaf, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Mode = "sign-in" | "sign-up";

export default function SignInPage() {
  const [mode, setMode] = useState<Mode>("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (mode === "sign-up") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } },
      });
      if (error) {
        setError(error.message);
      } else {
        setSuccess("Account created! Check your email to confirm, then sign in.");
        setMode("sign-in");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-leaf-50 via-white to-earth-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 w-full max-w-md">
        <Link href="/" className="flex items-center gap-2 text-leaf-700 font-bold text-xl mb-8">
          <Leaf className="w-6 h-6 text-leaf-500" />
          GreenPlate
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {mode === "sign-in" ? "Welcome back" : "Create your account"}
        </h1>
        <p className="text-gray-500 mb-8 text-sm">
          {mode === "sign-in"
            ? "Sign in to track your meals and carbon footprint."
            : "Start tracking your diet's impact on the planet."}
        </p>

        {success && (
          <div className="bg-leaf-50 border border-leaf-200 text-leaf-700 text-sm rounded-xl px-4 py-3 mb-5">
            {success}
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-5">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          {mode === "sign-up" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-leaf-300 focus:border-leaf-300"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-leaf-300 focus:border-leaf-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={mode === "sign-up" ? "At least 6 characters" : "••••••••"}
              required
              minLength={6}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-leaf-300 focus:border-leaf-300"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-leaf-600 hover:bg-leaf-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 mt-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {mode === "sign-in" ? "Sign in" : "Create account"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          {mode === "sign-in" ? (
            <>
              Don&apos;t have an account?{" "}
              <button
                onClick={() => { setMode("sign-up"); setError(""); setSuccess(""); }}
                className="text-leaf-600 font-medium hover:underline"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => { setMode("sign-in"); setError(""); setSuccess(""); }}
                className="text-leaf-600 font-medium hover:underline"
              >
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
