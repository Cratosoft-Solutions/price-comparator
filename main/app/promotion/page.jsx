"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";
import { MdStorefront, MdSearch, MdInventory, MdSecurity } from "react-icons/md";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const BENEFITS = [
  {
    icon: MdStorefront,
    title: "Exhibición de Productos",
    description:
      "Muestra tus productos con descripciones detalladas y fotos de alta calidad para captar la atención de los clientes.",
  },
  {
    icon: MdSearch,
    title: "Optimización para Motores de Búsqueda",
    description:
      "Nuestro sitio está optimizado para motores de búsqueda, asegurando que tus productos sean fácilmente encontrados por compradores potenciales.",
  },
  {
    icon: MdInventory,
    title: "Gestión de Inventario",
    description:
      "Mantén tu inventario actualizado y administra tus productos de manera eficiente con nuestras herramientas de gestión.",
  },
  {
    icon: MdSecurity,
    title: "Seguridad y Confiabilidad",
    description:
      "Tu negocio y tus datos están seguros con nosotros. Implementamos las mejores prácticas de seguridad para proteger tu información.",
  },
];

const Promotion = () => {
  return (
    <div className="bg-dark-bg min-h-screen">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent-glow/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-accent-primary/5 rounded-full blur-3xl" />
        </div>

        <motion.div
          className="relative px-4 lg:px-10 py-10 lg:py-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Hero Card */}
          <motion.div
            variants={itemVariants}
            className="max-w-4xl mx-auto rounded-2xl border border-dark-border/30 bg-dark-surface/40 backdrop-blur-sm p-6 lg:p-10 mb-6"
          >
            <h1 className="text-dark-text font-[1000] text-3xl lg:text-5xl xl:text-6xl leading-tight mb-4">
              ¿Quieres que tu sitio web{" "}
              <span className="bg-gradient-to-r from-accent-primary via-accent-glow to-accent-primary bg-clip-text text-transparent">
                destaque
              </span>
              ?
            </h1>
            <p className="text-dark-muted text-base lg:text-lg leading-relaxed max-w-2xl mb-4">
              ¡Es tu momento de brillar! Promociona tu página web y permite que el
              mundo descubra lo que tienes para ofrecer. Aumenta significativamente
              la visibilidad de tu sitio y alcanza a un público más amplio.
            </p>
            <p className="text-dark-muted text-sm lg:text-base leading-relaxed max-w-2xl">
              Nuestra estrategia integral incluye optimización en motores de
              búsqueda (SEO), campañas de marketing en redes sociales, y más —
              nos aseguramos de que tu página alcance a la audiencia adecuada en el
              momento adecuado.
            </p>
          </motion.div>

          {/* CTA Card */}
          <motion.div
            variants={itemVariants}
            className="max-w-4xl mx-auto rounded-2xl border border-accent-primary/30 bg-gradient-to-br from-accent-primary/10 to-dark-surface/60 backdrop-blur-sm p-6 lg:p-8 mb-8 lg:mb-12 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <div className="flex-1">
              <h3 className="text-dark-text font-bold text-lg mb-1">
                ¿Listo para empezar?
              </h3>
              <p className="text-dark-muted text-sm">
                Publica tu primer anuncio completamente gratis.
              </p>
            </div>
            <Link
              href="/create/item?type=product"
              className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent-primary to-accent-glow text-white font-bold text-sm shadow-lg shadow-accent-primary/20 hover:shadow-accent-primary/40 transition-all duration-300 flex-shrink-0"
            >
              Publicar anuncio
              <GoArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Benefits */}
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto mb-6">
            <h2 className="text-dark-text font-bold text-2xl lg:text-3xl">
              Beneficios de unirte
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 max-w-4xl mx-auto">
            {BENEFITS.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="rounded-2xl border border-dark-border/30 bg-dark-surface/40 backdrop-blur-sm p-6 hover:border-accent-primary/30 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center mb-4 group-hover:bg-accent-primary/20 transition-colors">
                    <Icon className="w-5 h-5 text-accent-glow" />
                  </div>
                  <h3 className="text-dark-text font-bold text-lg mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-dark-muted text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Promotion;
