import { Provider } from "react-redux";
import Body from "./component/Body";
import store from "./constant/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <Body />
      </Provider>
    </>
  );
}

export default App;
