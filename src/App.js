import logo from "./logo.svg";
import "./App.css";
import Page from "./page";
import WebFont from "webfontloader";

WebFont.load({
  google: {
    families: ["Noto Sans :300,400,700", "sans-serif"],
  },
});
function App() {
  return <Page />;
}

export default App;
