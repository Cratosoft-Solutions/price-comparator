"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { GoChevronRight, GoHome } from "react-icons/go";

const CATEGORY_LABELS = {
  PRODUCT: "Productos",
  CAR: "Autos",
  SERVICES: "Servicios",
  HOUSES: "Casas & Apartamentos",
};

const ROUTE_LABELS = {
  search: "Búsqueda",
  results: "Resultados",
  mystore: "Mi Tienda",
  termsandconditions: "Términos y Condiciones",
  login: "Iniciar Sesión",
  register: "Registro",
};

const Breadcrumbs = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);
  const category = searchParams.get("category");
  const searchText = searchParams.get("search");

  const breadcrumbItems = [
    { label: "Inicio", href: "/", icon: GoHome },
  ];

  let currentPath = "";
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const label = ROUTE_LABELS[segment] || segment;

    if (segment === "results" && category) {
      breadcrumbItems.push({
        label: CATEGORY_LABELS[category] || category,
        href: currentPath + `?category=${category}`,
      });
      if (searchText) {
        breadcrumbItems.push({
          label: `"${decodeURIComponent(searchText)}"`,
          href: null,
        });
      }
    } else {
      breadcrumbItems.push({
        label: label.charAt(0).toUpperCase() + label.slice(1),
        href: index < segments.length - 1 ? currentPath : null,
      });
    }
  });

  return (
    <motion.nav
      className="hidden lg:flex items-center px-8 py-2 text-sm bg-dark-bg/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.3 }}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center gap-1.5">
        {breadcrumbItems.map((item, idx) => {
          const Icon = item.icon;
          const isLast = idx === breadcrumbItems.length - 1;

          return (
            <li key={idx} className="flex items-center gap-1.5">
              {idx > 0 && (
                <GoChevronRight className="w-3.5 h-3.5 text-dark-muted/50" />
              )}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="flex items-center gap-1 text-dark-muted hover:text-accent-glow transition-colors duration-200"
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  <span>{item.label}</span>
                </Link>
              ) : (
                <span className="flex items-center gap-1 text-dark-text font-medium">
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  <span>{item.label}</span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </motion.nav>
  );
};

export default Breadcrumbs;
