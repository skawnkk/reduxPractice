import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPost } from "../modules/posts";
import Post from "../componenets/Post";
import { reducerUtils } from "../lib/asyncUtils";
export default function PostContainer({ postId }) {
  const { data, error, loading } = useSelector(
    (state) => state.posts.post[postId] || reducerUtils.initial()
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) return;
    dispatch(getPost(postId));
  }, [postId, dispatch]);

  if (loading && !data) return <div>ëĄëŠė¤đ</div>;
  if (error) return <div>ėëŦë°ė</div>;
  if (!data) return null;
  return <Post post={data} />;
}
