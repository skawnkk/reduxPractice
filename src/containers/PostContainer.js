import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPost } from "../modules/posts";
import Post from "../componenets/Post";
export default function PostContainer({ postId }) {
  const { data, error, loading } = useSelector((state) => state.posts.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(postId));
  }, [postId, dispatch]);

  if (loading) return <div>로딩중😉</div>;
  if (error) return <div>에러발생</div>;
  if (!data) return null;
  return <Post post={data} />;
}
