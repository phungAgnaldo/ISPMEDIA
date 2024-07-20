"use client";
import { Camera } from "lucide-react";
import { CoverPicker } from "./coverPicker";
import { FormEvent, useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

export function RegisterForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState("");

  async function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const coverUrlToUpload = formData.get("cover_url");

    if (password !== confirmationPassword) {
      setError("Por favor confirme correctamente sua password");
      return;
    }

    if (coverUrlToUpload) {
      formData.set("name", name);
      formData.set("email", email);
      formData.set("password", password);
      formData.set("confirmationPassword", confirmationPassword);
      formData.set("description", description);
      formData.set("cover_url", coverUrlToUpload);

      const response = (await api.post("/users", formData)).data;

      if (response.statusCode === 400) {
        setError(response.message);
        return;
      }

      setCookie("token", `${response.token}`, { maxAge: 60 * 60 * 24 });
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleRegister} className="flex flex-1 flex-col gap-2">
      <div className="">
        <label
          htmlFor="name"
          className="flex items-center gap-1.5 text-sm text-black"
        >
          Nome
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full h-8 rounded border-gray-400 bg-gray-700 text-white"
        />
      </div>
      <div className="">
        <label
          htmlFor="name"
          className="flex items-center gap-1.5 text-sm text-black"
        >
          Email
        </label>
        <input
          type="email"
          name="name"
          id="name"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-8 rounded border-gray-400 bg-gray-700 text-white"
        />
      </div>
      <div className="">
        <label
          htmlFor="name"
          className="flex items-center gap-1.5 text-sm text-black"
        >
          Senha
        </label>
        <input
          type="password"
          name="name"
          id="name"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-8 rounded border-gray-400 bg-gray-700 text-white"
        />
      </div>
      <div className="">
        <label
          htmlFor="name"
          className="flex items-center gap-1.5 text-sm text-black"
        >
          Confirmar Password
        </label>
        <input
          type="password"
          name="name"
          id="name"
          required
          value={confirmationPassword}
          onChange={(e) => setConfirmationPassword(e.target.value)}
          className="w-full h-8 rounded border-gray-400 bg-gray-700 text-white"
        />
      </div>
      <textarea
        name="description"
        id="description"
        spellCheck={false}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full flex-1 resize-none rounded border-0  bg-gray-700 p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
        placeholder="Descrição Do Usuário"
      />

      <div className="flex items-center gap-4">
        <label
          htmlFor="cover_url"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <Camera className="h-4 w-4" />
          Anexar Avatar
        </label>
      </div>

      <CoverPicker />

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
