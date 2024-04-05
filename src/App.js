import logo from "./logo.svg";
import "./App.css";
import Page from "./page";
import WebFont from "webfontloader";
import { Provider } from "react-redux";
import { reduxStore } from "./shared/redux/reduxStore";

WebFont.load({
  google: {
    families: ["Noto Sans :300,400,700", "sans-serif"],
  },
});
function App() {
  return (
    <Provider store={reduxStore}>
      <Page />
    </Provider>
  );
}

export default App;
