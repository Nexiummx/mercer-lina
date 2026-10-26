import { Link } from "react-router-dom";
import { categories } from "../lib/data";
import { useLinaStore } from "../store/useLinaStore";

export function Footer() {
  const purchaseMode = useLinaStore((s) => s.purchaseMode);

  return (
    <footer className="ap-footer">
      <div className="ap-footer__inner">
        <div className="ap-footer__note">
          <p>
            Cambios de talla sin costo durante 15 días en Guadalajara. Visitas al taller con cita, martes y
            jueves por la tarde.
          </p>
          <p>
            Fotografías de taller vía Wikimedia Commons: “Chambray fabric” de Enby, “Vintage Köhler sewing
            machine” de Uberprutser y “Wooden spools of sewing thread” de W.carter (CC BY-SA).
          </p>
        </div>

        <div className="ap-footer__cols">
          <div>
            <h3>Tienda</h3>
            <ul>
              <li>
                <Link to="/tienda">Toda la colección</Link>
              </li>
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link to={`/tienda/${c.slug}`}>{c.nombre}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>La marca</h3>
            <ul>
              <li>
                <Link to="/coleccion/jardin">Colección Jardín</Link>
              </li>
              <li>
                <Link to="/historia">Historia</Link>
              </li>
              <li>
                <Link to="/diario">Diario</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3>Ayuda</h3>
            <ul>
              <li>
                <Link to="/cuidados">Cuidados</Link>
              </li>
              <li>
                <Link to="/contacto">Contacto</Link>
              </li>
              {purchaseMode === "cart" ? (
                <li>
                  <Link to="/carrito">Bolsa</Link>
                </li>
              ) : null}
            </ul>
          </div>
          <div>
            <h3>Taller</h3>
            <ul>
              <li>Av. La Paz 1450, Col. Americana, Guadalajara</li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noreferrer">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://pinterest.com" target="_blank" rel="noreferrer">
                  Pinterest
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="ap-footer__legal">
          <span>© {new Date().getFullYear()} Lina &amp; Roma. Sitio de demostración.</span>
          <span>
            <a href="#">Privacidad</a> · <a href="#">Términos</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
