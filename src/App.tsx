import AuthPage from "@/pages/AuthPage/AuthPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./router";
import useUser from "./redux/hooks/useUser";

function App() {
  const { user } = useUser();
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.auth} element={<AuthPage />} />
        <Route
          path={routes.products}
          element={user.isAuthorized ? <ProductPage /> : <AuthPage />}
        />
        <Route path="*" element={<h1>404 page not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
