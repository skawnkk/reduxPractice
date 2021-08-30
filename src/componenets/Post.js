import React from "react";

export default function Post({ post }) {
  const { title, body } = post;
  return (
    <>
      <h1>{title}</h1>
      <div>{body}</div>
    </>
  );
}
