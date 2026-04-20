import { useState } from "react";
import type { AuthFormProps } from "../types";
import { Link } from "react-router-dom";

function AuthForm<T>({ title, onSubmit, withName = false }: AuthFormProps<T>) {
  const [form, setForm] = useState({ email: "", password: "", name: "" });

  function handleForm(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const data = withName
      ? { email: form.email, password: form.password, name: form.name }
      : { email: form.email, password: form.password };

    onSubmit(data as T);
    setForm({ email: "", password: "", name: "" });
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-zinc-900 p-7 rounded-2xl border border-gray-100 dark:border-zinc-800 w-full max-w-sm mx-auto space-y-5"
    >

      <div className="space-y-1">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          {title === "Login" ? "Welcome back" : "Create account"}
        </h2>
        <p className="text-sm text-gray-500">
          {title === "Login"
            ? "Sign in to your account"
            : "Get started for free"}
        </p>
      </div>

      {withName && (
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Full name
          </label>
          <input
            className="px-3 py-2.5 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
            type="text"
            name="name"
            id="name"
            placeholder="Jane Doe"
            value={form.name}
            onChange={handleForm}
          />
        </div>
      )}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Email
        </label>
        <input
          className="px-3 py-2.5 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
          type="email"
          name="email"
          id="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleForm}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Password
          </label>
        </div>
        <input
          className="px-3 py-2.5 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          value={form.password}
          onChange={handleForm}
        />
      </div>

      <button
        className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-white text-sm font-medium transition-all duration-150"
        type="submit"
      >
        {title === "Login" ? "Sign in" : "Create account"}
      </button>

      <p className="text-center text-xs text-gray-400">
        {title === "Login" ? "No account? " : "Already have one? "}
        <Link
          to={title === "Login" ? "/register" : "/login"}
          className="text-emerald-600 hover:underline"
        >
          {title === "Login" ? "Create one" : "Sign in"}
        </Link>
      </p>
    </form>
  );
}

export default AuthForm;
