// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import store from './store/store.js'
createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,
  <Provider store={store}>
  <BrowserRouter> {/* ✅ Wrap inside BrowserRouter */}
    {/* <ErrorBoundary>
      <App />
    </ErrorBoundary> */}
    <App/>
  </BrowserRouter>
</Provider>
)
