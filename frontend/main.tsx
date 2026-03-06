import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { StrictMode } from 'react'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./src/store/store.ts";
import App from './App.tsx';
import "./src/i18n"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
