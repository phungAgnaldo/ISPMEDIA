"use client";
import { FormEvent, useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

export function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = (await api.post("/users/login", { email, password })).data;

    if (response.statusCode === 400) {
      setError(response.message);
      return;
    }

    setCookie("token", `${response.token}`, { maxAge: 60 * 60 * 24 });

    router.refresh();
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-1 flex-col gap-2">
      <div className="w-[250px]">
        <label
          htmlFor="name"
          className="flex items-center gap-1.5 text-sm text-black"
        >
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full h-8 rounded border-gray-400 bg-gray-700 text-white"
        />
      </div>
      <div className="w-[250px]">
        <label
          htmlFor="name"
          className="flex items-center gap-1.5 text-sm text-black"
        >
          Senha
        </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          required
          className="w-full h-8 rounded border-gray-400 bg-gray-700 text-white"
        />
      </div>

      {error && (
        <div>
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <button
        type="submit"
        className="inline-block self-end rounded-full  bg-red-700 px-5 py-3 font-alt text-sm uppercase text-white leading-none  hover:bg-red-900"
      >
        Salvar
      </button>
    </form>
  );
}
