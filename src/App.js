import CounterContainer from "./containers/CounterContainer";
import TodosContainer from "./containers/TodosContainer";
import ModalContainer from "./containers/ModalContainer";
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
    </>
  );
}

export default App;
