"use client";

import { ChangeEvent, useState } from "react";

export function MediaVideoPicker() {
  const [preview, setPreview] = useState<File | null>(null);

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;

    if (!files) {
      return;
    }

    const previewURL = files[0];

    setPreview(previewURL);
  }

  return (
    <>
      <input
        onChange={onFileSelected}
        type="file"
        name="url"
        id="url"
        accept="video/*"
        required
      />
    </>
  );
}
