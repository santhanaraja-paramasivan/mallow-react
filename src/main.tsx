import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import App from "./App";
import { Layout } from "./components/Layout";
import { Provider } from "react-redux";
import { store } from "./store";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <Layout>
      <App />
    </Layout>
  </Provider>
);
