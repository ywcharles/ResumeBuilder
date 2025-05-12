import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ResumeBuilder from './pages/ResumeBuilder';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/resume-builder",
    element: <ResumeBuilder />,
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)
