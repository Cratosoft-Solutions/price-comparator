"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";
import { MdDevices, MdTrendingUp, MdSupportAgent, MdPeople } from "react-icons/md";

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
    icon: MdDevices,
    title: "Fácil de Usar",
    description:
      "Nuestra plataforma está diseñada pensando en ti. Es intuitiva y fácil de navegar, permitiéndote publicar y gestionar tus productos sin complicaciones.",
  },
  {
    icon: MdPeople,
    title: "Audiencia Nacional",
    description:
      "Con Encuéntralo Fácil CR, tus productos estarán visibles para compradores de todo el país.",
  },
  {
    icon: MdTrendingUp,
    title: "Incremento en Ventas",
    description:
      "Más visibilidad significa más oportunidades de venta. Atrae a una base de clientes más amplia y diversificada.",
  },
  {
    icon: MdSupportAgent,
    title: "Soporte Local",
    description:
      "Disfruta del respaldo de un equipo local que entiende tus necesidades y está dispuesto a ayudarte en cada paso del camino.",
  },
];

const Sale = () => {
  return (
    <div className="bg-dark-bg min-h-screen">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-accent-glow/5 rounded-full blur-3xl" />
        </div>

        <motion.div
          className="relative px-4 lg:px-10 py-10 lg:py-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Hero */}
          <motion.div
            variants={itemVariants}
            className="max-w-4xl mx-auto rounded-2xl border border-accent-primary/30 bg-gradient-to-br from-accent-primary/10 to-dark-surface/60 backdrop-blur-sm p-6 lg:p-10 mb-8 lg:mb-12"
          >
            <h1 className="text-dark-text font-[1000] text-3xl lg:text-5xl xl:text-6xl leading-tight mb-4">
              Lleva tu negocio al{" "}
              <span className="bg-gradient-to-r from-accent-primary via-accent-glow to-accent-primary bg-clip-text text-transparent">
                siguiente nivel
              </span>
            </h1>
            <p className="text-dark-muted text-base lg:text-lg leading-relaxed max-w-2xl mb-6 lg:mb-8">
              ¿Estás listo para transformar tu negocio y alcanzar nuevas alturas?
              Con Encuéntralo Fácil CR, tienes la oportunidad perfecta para
              hacerlo. Nuestra plataforma, desarrollada por ingenieros
              costarricenses, es la herramienta definitiva para exhibir tus
              productos a una audiencia global.
            </p>
            <Link
              href="/create/item?type=product"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent-primary to-accent-glow text-white font-bold text-sm lg:text-base shadow-lg shadow-accent-primary/20 hover:shadow-accent-primary/40 transition-all duration-300"
            >
              Publicar mi anuncio
              <GoArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Benefits */}
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
            <h2 className="text-dark-text font-bold text-2xl lg:text-3xl mb-6">
              ¿Por qué elegir Encuéntralo Fácil CR?
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

export default Sale;
