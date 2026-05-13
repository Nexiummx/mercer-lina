import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SiteLayout } from "./components/SiteLayout";
import HomePage from "./pages/HomePage";
import TiendaPage from "./pages/TiendaPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import CheckoutConfirmacionPage from "./pages/CheckoutConfirmacionPage";
import CollectionPage from "./pages/CollectionPage";
import DiarioPage from "./pages/DiarioPage";
import DiarioPostPage from "./pages/DiarioPostPage";
import HistoriaPage from "./pages/HistoriaPage";
import CuidadosPage from "./pages/CuidadosPage";
import ContactoPage from "./pages/ContactoPage";

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="tienda" element={<TiendaPage />} />
          <Route path="tienda/:categoria" element={<TiendaPage />} />
          <Route path="producto/:slug" element={<ProductPage />} />
          <Route path="carrito" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="checkout/confirmacion" element={<CheckoutConfirmacionPage />} />
          <Route path="coleccion/:slug" element={<CollectionPage />} />
          <Route path="diario" element={<DiarioPage />} />
          <Route path="diario/:slug" element={<DiarioPostPage />} />
          <Route path="historia" element={<HistoriaPage />} />
          <Route path="cuidados" element={<CuidadosPage />} />
          <Route path="contacto" element={<ContactoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
