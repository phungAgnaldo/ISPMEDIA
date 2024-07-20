"use client";
import { Comments } from "@/app/home/page";
import { UserPayload } from "@/contexts/auth";
import { api } from "@/lib/api";
import { ArrowDownWideNarrow } from "lucide-react";
import { Send } from "lucide-react";
import Image from "next/image";
import { KeyboardEvent, useState } from "react";

interface Props {
  user: UserPayload;
  midea_id: string;
  comments: Comments[];
}

export function Comment({ user, midea_id, comments }: Props) {
  const [message, setMessage] = useState<Comments[]>([...comments]);

  const [newMessage, setNewMessage] = useState("");

  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === "Enter") {
      addComment();
    }
  }

  function addComment() {
    api.post(`/mideas/${midea_id}/comment`, {
      message: newMessage,
      user_id: user.sub,
    });
    setNewMessage("");

    const comment = {
      user,
      created_at: new Date(),
      message: newMessage,
      midea_id,
    } as unknown as Comments;

    setMessage([comment, ...message]);
  }
  return (
    <>
      {comments.length === 0 ? (
        <div className="flex flex-1 items-center justify-center my-6">
          <p className="leading-relaxed w-full">
            Mídea sem Comentário, faça o seu.
          </p>
        </div>
      ) : (
        <></>
      )}
      <div className="flex">
        <p>
          <span className="mr-2">{message.length}</span>Comentários
        </p>
        <p className="flex items-center">
          <ArrowDownWideNarrow width={16} height={16} className="mx-2" />
          Sort by
        </p>
      </div>
      <div className="flex my-4 items-center">
        <figure className="w-7 h-7 rounded-full overflow-hidden">
          <Image
            src={`${api.getUri()}/${user.avatarUrl}`}
            alt="Profile Avatar"
            width={150}
            height={32}
            className="bg-cover object-contain"
          />
        </figure>
        <input
          type="text"
          name=""
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            handleKeyPress(e);
          }}
          placeholder="Adicionar Comentário"
          className="appearance-none bg-transparent border-b text-gray-600 w-full ml-4"
        />

        <Send
          className="hover:text-red-700"
          onClick={() => {
            addComment();
          }}
        />
      </div>
      <div>
        {message.map((comment) => {
          return (
            <div className="flex items-center my-2" key={comment.created_at}>
              <figure className="w-7 h-7 rounded-full overflow-hidden">
                <Image
                  src={`${api.getUri()}/${comment.user.avatarUrl}`}
                  alt="Profile Avatar"
                  width={150}
                  height={32}
                  className="bg-cover object-contain"
                />
              </figure>
              <div>
                <div className="mx-2">
                  <p>
                    {comment.user.name}
                    <span className="text-sm ml-4">
                      {new Date(comment.created_at).toDateString()}
                    </span>
                  </p>
                  <p>{comment.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
