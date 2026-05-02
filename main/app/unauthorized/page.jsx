import Link from "next/link";
import { IoShieldOutline } from "react-icons/io5";

export const metadata = {
  title: "EncuéntraLo Fácil CR: Acceso no autorizado",
  description: "EncuéntraLo Fácil CR, acceso no autorizado.",
};

const Unauthorized = () => {
  return (
    <div className="bg-dark-bg min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="rounded-2xl border border-dark-border/30 bg-dark-surface/40 backdrop-blur-sm p-8 lg:p-10">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
            <IoShieldOutline className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="text-dark-text font-bold text-4xl lg:text-5xl mb-2">
            401
          </h1>
          <p className="text-dark-muted text-base lg:text-lg mb-6">
            No está autorizado a ver esta página
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-dark-elevated border border-dark-border/40 text-dark-text text-sm font-medium hover:border-accent-primary/40 hover:text-accent-glow transition-all duration-300"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
