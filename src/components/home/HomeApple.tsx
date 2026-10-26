import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { formatPrice, founders, getProductBySlug, products } from "../../lib/data";
import { buildWhatsAppUrl } from "../../store/useLinaStore";

const img = (id: string, w = 1400) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/* ——— Hero: la palabra Jardín detrás de la prenda, que va cambiando ——— */

const HERO_PIECES = ["vestido-mara-crema", "vestido-tortola-terracota", "vestido-olivia-salvia", "pantalon-lino-beige"];

export function LinaHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const pieces = HERO_PIECES.map((s) => getProductBySlug(s)).filter((p): p is NonNullable<typeof p> => Boolean(p));
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % pieces.length), 3800);
    return () => window.clearInterval(t);
  }, [reduce, paused, pieces.length]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const leftX = useTransform(scrollYProgress, [0, 1], ["0vw", "-10vw"]);
  const rightX = useTransform(scrollYProgress, [0, 1], ["0vw", "10vw"]);
  const wordOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 0.86]);

  const piece = pieces[i];

  return (
    <section
      className="lr-hero"
      ref={ref}
      aria-labelledby="hero-title"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <motion.h1 id="hero-title" className="lr-hero__word" style={reduce ? undefined : { opacity: wordOpacity }}>
        <span className="sr-only">Jardín, la colección de otoño de Lina &amp; Roma</span>
        <motion.span className="lr-hero__half" aria-hidden style={reduce ? undefined : { x: leftX }}>
          <span data-load style={{ ["--d" as string]: "60ms" }}>Jar</span>
        </motion.span>
        <span className="lr-hero__gap" aria-hidden />
        <motion.span className="lr-hero__half" aria-hidden style={reduce ? undefined : { x: rightX }}>
          <span data-load style={{ ["--d" as string]: "160ms" }}>dín</span>
        </motion.span>
        <span className="lr-hero__whole" aria-hidden>Jardín</span>
      </motion.h1>

      <motion.div className="lr-hero__photo" style={reduce ? undefined : { scale: photoScale }}>
        <AnimatePresence initial={false}>
          {piece ? (
            <motion.img
              key={piece.slug}
              src={piece.imagenes[0].replace(/w=\d+/, "w=1000")}
              alt={`${piece.nombre} de la colección Jardín`}
              initial={reduce ? false : { opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
          ) : null}
        </AnimatePresence>
      </motion.div>

      <div className="lr-hero__copy" data-load style={{ ["--d" as string]: "360ms" }}>
        <p className="lr-hero__kicker">La colección de otoño de Lina &amp; Roma.</p>
        <p>Lino, algodón y seda, cosidos sin prisa en talleres familiares de Guadalajara.</p>
        <Link to="/coleccion/jardin" className="ap-pill">
          Ver la colección
        </Link>
      </div>

      {piece ? (
        <div className="lr-hero__piece" data-load style={{ ["--d" as string]: "480ms" }}>
          <strong>{piece.nombre}</strong>
          <span>{formatPrice(piece.precio)}</span>
          <Link to={`/producto/${piece.slug}`} className="ap-more">
            Ver la pieza
          </Link>
          <div className="lr-hero__dots" role="group" aria-label="Elegir pieza">
            {pieces.map((p, n) => (
              <button
                key={p.slug}
                type="button"
                aria-label={p.nombre}
                aria-current={n === i}
                onClick={() => {
                  setI(n);
                  setPaused(true);
                }}
              />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

/* ——— Recorrido de una pieza ——— */

const TOUR = [
  {
    title: "55 % lino, 45 % algodón.",
    text: "Fibras que respiran con el calor de Guadalajara y se suavizan con cada lavada.",
    origin: "50% 45%",
    zoom: 1.15,
  },
  {
    title: "Acabados a mano.",
    text: "Cada pieza se termina a mano, una por una, antes de salir del taller.",
    origin: "30% 70%",
    zoom: 1.7,
  },
  {
    title: "Cosido en Jalisco.",
    text: "En talleres familiares que Roma visita cada semana, con tiempos y pagos justos.",
    origin: "65% 30%",
    zoom: 1.5,
  },
  {
    title: "Para años, no una temporada.",
    text: "Cuando una pieza se agota tarda en volver: la tela se pide por rollo.",
    origin: "50% 50%",
    zoom: 1,
  },
];

export function PieceTour() {
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const piece = getProductBySlug("vestido-tortola-terracota");

  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setStep(Math.min(TOUR.length - 1, Math.max(0, Math.floor(p * TOUR.length))));
  });
  const stepProgress = useTransform(scrollYProgress, (p) => (p * TOUR.length) % 1);
  const photoY = useTransform(scrollYProgress, [0, 0.08], [60, 0]);

  const current = TOUR[step];

  return (
    <section className="lr-tour" aria-labelledby="tour-title">
      <div className="lr-tour__intro">
        <h2 id="tour-title" className="ap-head" data-reveal>
          Una pieza, de cerca.
        </h2>
        <p data-reveal style={{ ["--i" as string]: 1 }}>
          El vestido Tórtola, costura por costura. Baja para acercarte.
        </p>
      </div>

      <div className="lr-tour__track" ref={track} style={reduce ? { height: "auto" } : undefined}>
        <div className="lr-tour__stage" style={reduce ? { position: "relative", height: "auto", padding: "3rem var(--ap-gutter) 6rem" } : undefined}>
          <ol className="ap-steps">
            {TOUR.map((s, i) => (
              <li
                key={s.title}
                style={{ opacity: reduce || i === step ? 1 : 0.32 }}
                aria-current={i === step ? "step" : undefined}
              >
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                {!reduce && i === step ? (
                  <div className="ap-steps__bar" aria-hidden>
                    <motion.span style={{ scaleX: stepProgress }} />
                  </div>
                ) : null}
              </li>
            ))}
          </ol>

          <motion.div className="lr-tour__photo" style={reduce ? undefined : { y: photoY }}>
            <motion.img
              src={img("1496747611176-843222e1e57c", 1400)}
              alt="Vestido Tórtola, estampado de flores, al viento junto al mar"
              animate={reduce ? undefined : { scale: current.zoom }}
              transition={{ type: "spring", bounce: 0, duration: 0.9 }}
              style={{ transformOrigin: current.origin }}
            />
            {piece ? (
              <Link to={`/producto/${piece.slug}`} className="lr-tour__tag">
                {piece.nombre} · {formatPrice(piece.precio)}
              </Link>
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ——— Costo por uso ——— */

const PIECES = ["vestido-tortola-terracota", "vestido-olivia-salvia", "pantalon-lino-beige", "blusa-elena-crema"];

export function CostPerWear() {
  const pieces = PIECES.map((s) => getProductBySlug(s)).filter((p): p is NonNullable<typeof p> => Boolean(p));
  const [pick, setPick] = useState(0);
  const [perYear, setPerYear] = useState(20);
  const [years, setYears] = useState(5);
  const piece = pieces[pick];
  const uses = perYear * years;
  const perUse = piece ? Math.round(piece.precio / uses) : 0;

  return (
    <section className="lr-cpw ap-on-dark" aria-labelledby="cpw-title">
      <h2 id="cpw-title" className="ap-head" data-reveal>
        ¿Cuánto cuesta cada uso?
      </h2>
      <p className="lr-cpw__lead" data-reveal style={{ ["--i" as string]: 1 }}>
        Una prenda que dura años sale más barata de lo que parece. Haz la cuenta con la tuya.
      </p>

      <div className="lr-seg" role="tablist" aria-label="Piezas">
        {pieces.map((p, i) => (
          <button key={p.slug} type="button" role="tab" aria-selected={i === pick} onClick={() => setPick(i)}>
            {p.nombre}
          </button>
        ))}
      </div>

      {piece ? (
        <>
          <p className="lr-cpw__figure" aria-live="polite">
            {formatPrice(perUse)}
          </p>
          <p className="lr-cpw__unit">
            por uso del {piece.nombre}, que cuesta {formatPrice(piece.precio)}
          </p>

          <div className="lr-cpw__sliders">
            <div>
              <label htmlFor="lr-per-year">
                <span>Veces que lo usas al año</span>
                <output htmlFor="lr-per-year">{perYear}</output>
              </label>
              <input
                id="lr-per-year"
                className="lr-range"
                type="range"
                min={4}
                max={60}
                value={perYear}
                onChange={(e) => setPerYear(Number(e.target.value))}
              />
            </div>
            <div>
              <label htmlFor="lr-years">
                <span>Años que te dura</span>
                <output htmlFor="lr-years">{years}</output>
              </label>
              <input
                id="lr-years"
                className="lr-range"
                type="range"
                min={1}
                max={10}
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
              />
            </div>
          </div>

          <p className="lr-cpw__note">
            {uses} usos en {years} {years === 1 ? "año" : "años"}. Como referencia, una prenda de{" "}
            {formatPrice(600)} que aguanta cinco puestas sale en {formatPrice(120)} cada vez.
          </p>

          <div className="ap-close__actions">
            <Link to={`/producto/${piece.slug}`} className="ap-pill ap-pill--light">
              Ver el {piece.nombre}
            </Link>
            <a
              className="ap-more"
              href={buildWhatsAppUrl(`Hola Lina & Roma, me interesa el ${piece.nombre} (${formatPrice(piece.precio)}). ¿Tienen mi talla?`)}
              target="_blank"
              rel="noreferrer"
            >
              Preguntar por WhatsApp
            </a>
          </div>
        </>
      ) : null}
    </section>
  );
}

/* ——— Tienda: retícula editorial escalonada ——— */

const EDIT = [
  "vestido-mara-crema",
  "vestido-tortola-terracota",
  "vestido-olivia-salvia",
  "blusa-elena-crema",
  "pantalon-lino-beige",
  "blusa-clara-rosa",
];

export function EditorialShop() {
  const items = EDIT.map((s) => getProductBySlug(s)).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <section className="lr-edit" aria-labelledby="edit-title">
      <div className="lr-edit__head">
        <h2 id="edit-title" className="ap-head" data-reveal>
          La colección.
        </h2>
        <Link to="/tienda" className="ap-more" data-reveal style={{ ["--i" as string]: 1 }}>
          Ver las {products.length} piezas
        </Link>
      </div>

      <div className="lr-edit__grid">
        {items.map((p, i) => (
          <Link key={p.slug} to={`/producto/${p.slug}`} className="lr-look">
            <div data-reveal style={{ ["--i" as string]: i % 3 }}>
              <figure>
                <img src={p.imagenes[0]} alt={p.nombre} loading="lazy" decoding="async" />
                <span className="lr-look__buy" aria-hidden>
                  Ver talla y color
                </span>
              </figure>
              <div className="lr-look__meta">
                <h3>{p.nombre}</h3>
                <span>{formatPrice(p.precio)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ——— Cita y cierre ——— */

export function FounderQuote() {
  const lina = founders.find((f) => f.id === "f-lina");
  return (
    <section className="lr-quote" aria-labelledby="quote-title">
      <h2 id="quote-title" className="sr-only">
        Las fundadoras
      </h2>
      <figure data-reveal>
        {lina ? <img src={lina.imagen} alt={lina.nombre} loading="lazy" decoding="async" /> : null}
        <blockquote>
          “Roma y yo aprendimos a coser en el patio de nuestra abuela. Jardín es una colección para
          caminar más despacio.”
        </blockquote>
        <figcaption>
          <strong>{lina?.nombre ?? "Lina Mercier"}</strong> · {lina?.rol ?? "Dirección creativa"}
          <br />
          <Link to="/historia" className="ap-more">
            Leer nuestra historia
          </Link>
        </figcaption>
      </figure>
    </section>
  );
}

export function CloseCta() {
  return (
    <section className="ap-close ap-on-dark" aria-labelledby="close-title">
      <h2 id="close-title" className="ap-head" data-reveal>
        Ven al taller.
      </h2>
      <p data-reveal style={{ ["--i" as string]: 1 }}>
        Pruébate la colección en la colonia Americana, con cita los martes y jueves por la tarde. Te
        ayudamos con la talla y los ajustes.
      </p>
      <div className="ap-close__actions" data-reveal style={{ ["--i" as string]: 2 }}>
        <a
          className="ap-pill ap-pill--light"
          href={buildWhatsAppUrl("Hola Lina & Roma, me gustaría agendar una visita al taller.")}
          target="_blank"
          rel="noreferrer"
        >
          Agendar por WhatsApp
        </a>
        <Link to="/tienda" className="ap-more">
          Comprar en línea
        </Link>
      </div>
    </section>
  );
}
