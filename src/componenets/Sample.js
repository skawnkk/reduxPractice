import React from "react";

export default function Sample({ loadingPost, loadingUsers, post, users }) {
  console.log(loadingPost, loadingUsers, post, users);
  return (
    <>
      <section>
        {loadingPost && <div>포스팅 로딩 중 ....</div>}
        {!loadingPost && post && (
          <>
            <div>{post.title}</div>
            <div>{post.body}</div>
          </>
        )}
      </section>
      <section>
        {loadingUsers && <div>유저 로딩 중 ....</div>}
        {!loadingUsers && users && (
          <ul>
            {users.map((user, idx) => (
              <li key={idx}>{user.username}</li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
