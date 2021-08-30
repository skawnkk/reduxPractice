import CounterContainer from "./containers/CounterContainer";
import TodosContainer from "./containers/TodosContainer";
import ModalContainer from "./containers/ModalContainer";
import { Route } from "react-router-dom";
import PostListContainer from "./containers/PostListContainer";
import PostPage from "./page/PostPage";
function App() {
  return (
    <>
      <div className="App">
        <CounterContainer />
        <hr />
        <TodosContainer />
        <hr />
        <ModalContainer />
      </div>
      <Route path="/" component={PostListContainer} exact />
      <Route path="/:id" component={PostPage} />
    </>
  );
}

export default App;
