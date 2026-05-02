"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { processMessageAlert, validateCredentials } from "@utils/functions";
import { setLoading } from "@app/redux/slices/loading";
import { useDispatch, useSelector } from "react-redux";
import Loading from "@app/loading";
import { AUTH_MESSAGES } from "@utils/constants";
import Link from "next/link";
import { track } from "@vercel/analytics";
import axios from "axios";
import { IoMailOutline, IoLockClosedOutline } from "react-icons/io5";

const LoginRegister = ({ isLogin = true }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const { loading } = useSelector((state) => state.siteloading);

  const executeOnCredentialLogin = (e) => {
    e.preventDefault();
    const passValidation = validateCredentials(formData, isLogin);
    if (!passValidation) {
      const { title, message, time, type } = AUTH_MESSAGES.filter(
        (element) => element.id == "PasswordValidationFormat"
      )[0];
      processMessageAlert(title, type, time, message);
    } else {
      executeSign();
    }
  };

  const executeSign = async () => {
    dispatch(setLoading(true));
    const res = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
      callbackUrl,
      isLogin: isLogin,
    });

    if (!isLogin && !res?.error) {
      await axios.post("api/email/activate/", { to: formData.email });
      dispatch(setLoading(false));
      const { title, message, time, type } = AUTH_MESSAGES.filter(
        (element) => element.id == "ActivateAccount"
      )[0];
      processMessageAlert(title, type, time, message);
    } else {
      dispatch(setLoading(false));
      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        const { title, message, time, type } =
          AUTH_MESSAGES.filter((element) => element.id == res.error)[0] ||
          AUTH_MESSAGES.filter(
            (element) => element.id == "CredentialsSignin"
          )[0];
        processMessageAlert(title, type, time, message);
      }
    }
  };

  const executeSignProvider = (providerId) => {
    signIn(providerId, { callbackUrl: callbackUrl });
  };

  const handleData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (loading)
    return <Loading message={"Validando tus datos, favor espera"} />;

  return (
    <section className="bg-dark-bg min-h-screen">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-accent-glow/5 rounded-full blur-3xl" />
        </div>

        <div className="relative flex flex-col items-center justify-center min-h-screen px-4 py-8">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-6">
              <Link href="/" className="inline-block mb-4">
                <img
                  src="/assets/images/logo.svg"
                  className="h-10 w-auto mx-auto"
                  alt="EncuéntraloFácilCR"
                />
              </Link>
              <h1 className="text-dark-text font-bold text-2xl lg:text-3xl">
                {isLogin ? "Bienvenido de vuelta" : "Crea tu cuenta"}
              </h1>
              <p className="text-dark-muted text-sm mt-1">
                {isLogin
                  ? "Ingresa tus credenciales para continuar"
                  : "Regístrate para empezar a usar la plataforma"}
              </p>
            </div>

            {/* Card */}
            <div className="rounded-2xl border border-dark-border/30 bg-dark-surface/40 backdrop-blur-sm p-6 lg:p-8">
              <form
                onSubmit={executeOnCredentialLogin}
                method="POST"
                className="space-y-5"
                action="#"
              >
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-semibold text-dark-text"
                  >
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <IoMailOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-dark-muted" />
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="w-full pl-10 pr-4 py-2.5 bg-dark-elevated/50 border border-dark-border/40 text-dark-text text-sm rounded-xl focus:ring-2 focus:ring-accent-primary/30 focus:border-accent-primary/40 transition-all placeholder:text-dark-muted/50"
                      placeholder="ejemplo@dominio.com"
                      required={true}
                      value={formData.email}
                      onChange={handleData}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-semibold text-dark-text"
                  >
                    Contraseña
                  </label>
                  <div className="relative">
                    <IoLockClosedOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-dark-muted" />
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 bg-dark-elevated/50 border border-dark-border/40 text-dark-text text-sm rounded-xl focus:ring-2 focus:ring-accent-primary/30 focus:border-accent-primary/40 transition-all placeholder:text-dark-muted/50"
                      required={true}
                      value={formData.password}
                      onChange={handleData}
                    />
                  </div>
                </div>

                {/* Links */}
                <div className="flex items-center justify-between text-sm">
                  {isLogin ? (
                    <span className="text-dark-muted">
                      ¿Sin cuenta?{" "}
                      <Link
                        className="text-accent-glow hover:underline font-medium"
                        href="/register"
                      >
                        Registrarme
                      </Link>
                    </span>
                  ) : (
                    <span className="text-dark-muted">
                      ¿Ya tienes cuenta?{" "}
                      <Link
                        className="text-accent-glow hover:underline font-medium"
                        href="/login"
                      >
                        Ingresar
                      </Link>
                    </span>
                  )}
                  <a
                    href="#"
                    className="text-dark-muted text-sm hover:text-accent-glow hover:underline transition-colors"
                  >
                    Olvidé mi contraseña
                  </a>
                </div>

                {/* Submit */}
                <button
                  value="credentials"
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-accent-primary to-accent-glow text-white font-bold text-sm shadow-lg shadow-accent-primary/20 hover:shadow-accent-primary/40 transition-all duration-300"
                >
                  {isLogin ? "Ingresar" : "Crear cuenta"}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-dark-border/30" />
                <span className="text-dark-muted text-xs">
                  Otras opciones de ingreso
                </span>
                <div className="flex-1 h-px bg-dark-border/30" />
              </div>

              {/* Google */}
              <button
                onClick={() => {
                  track("Signup");
                  executeSignProvider("google");
                }}
                className="w-full flex items-center justify-center gap-3 px-5 py-2.5 rounded-xl bg-dark-elevated/50 border border-dark-border/40 text-dark-text text-sm font-semibold hover:border-accent-primary/30 hover:bg-dark-elevated transition-all duration-300"
              >
                <img
                  className="w-5 h-5"
                  src="/assets/images/google.svg"
                  alt="Google"
                />
                Ingresar con Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginRegister;
