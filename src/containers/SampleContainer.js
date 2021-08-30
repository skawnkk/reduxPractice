import React, { useEffect } from "react";
import { useSelector, connect, useDispatch } from "react-redux";
import Sample from "../componenets/Sample";
import { getPostAsync, getPost, getUsers } from "../modules/sample";

function SampleContainer() {
  const { loadingPost, loadingUsers, users, post } = useSelector((state) => ({
    loadingPost: state.sample.loading.GET_POST,
    loadingUsers: state.sample.loading.GET_USERS,
    post: state.sample.post,
    users: state.sample.users,
  }));
  const dispatch = useDispatch();
  const PostAsync = (id) => dispatch(getPost(id));

  useEffect(() => {
    const fn = async () => {
      try {
        await PostAsync(1);
        console.log(post, users, loadingPost, loadingUsers);
        await getUsers();
      } catch (e) {
        console.error(e);
      }
    };
    fn();
  }, []);
  return (
    <>
      <Sample {...{ post, users, loadingPost, loadingUsers }} />
    </>
  );
}
export default connect(
  ({ sample }) => ({
    post: sample.post,
    users: sample.users,
    loadingPost: sample.loading.GET_POST,
    loadingUsers: sample.loading.GET_USERS,
  }),
  { getPost, getUsers }
)(SampleContainer);
