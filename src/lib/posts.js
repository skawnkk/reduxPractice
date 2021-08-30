const sleep = (n) => new Promise((resolve) => setTimeout(resolve, n));
const posts = [
  { id: 1, body: "이것은내용", title: "왜안돼" },
  { id: 2, body: "이것은내용", title: "왜돼" },
  { id: 3, body: "이것은내용", title: "왜안돼" },
  { id: 4, body: "이것은내용", title: "왜돼" },
];
export const getPosts = async () => {
  await sleep(500);
  return posts;
};

export const getPostById = async (id) => {
  await sleep(500);
  return posts.find((post) => post.id === id);
};
