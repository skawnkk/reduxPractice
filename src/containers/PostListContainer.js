import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import PostList from "../componenets/PostList";
import { getPosts } from "../modules/posts";
export default function PostListContainer() {
  const { data, error, loading } = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  if (loading && !data) return <div>로딩 중 ....</div>;
  if (error) return <div>에러발생</div>;
  if (!data) return null;
  return <PostList posts={data} />;
}
