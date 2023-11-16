"use client"
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { processMessageAlert, validateCredentials } from "@utils/functions";
import { setLoading } from "@app/redux/slices/loading";
import { useDispatch, useSelector } from "react-redux";
import Loading from "@app/loading";
import { AUTH_MESSAGES } from "@utils/constants";
import Link from "next/link";

const LoginRegister = ({isLogin=true}) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const dispatch = useDispatch();
    const callbackUrl = searchParams.get("callbackUrl") || "/search/newsearch";

    const [formData, setFormData] = useState({email:"", password:"", rememberMe:false})
    
    const { loading } = useSelector(state =>state.siteloading);

    const executeOnCredentialLogin = (e)=>{
      e.preventDefault();
      const passValidation =  validateCredentials(formData, isLogin);
      if(!passValidation){
        const {title, message, time, type} = AUTH_MESSAGES.filter(element => element.id == "PasswordValidationFormat")[0];
        processMessageAlert(title, type, time,message)} 
        else{
          executeSign();
        }
    }

    const executeSign = async ()=>{
        dispatch(setLoading(true));
        const res = await signIn("credentials", {
            redirect: false,
            email: formData.email,
            password: formData.password,
            callbackUrl,
            isLogin:isLogin
          });

          
          dispatch(setLoading(false));

          if (!res?.error) {
            router.push(callbackUrl);
          } else {
            const {title, message, time, type} = AUTH_MESSAGES.filter(element => element.id == res.error)[0]||AUTH_MESSAGES.filter(element => element.id == "CredentialsSignin")[0];
            processMessageAlert(title, type, time,message);
          }
    }

    const executeSignProvider = (providerId)=>{
        signIn(providerId, {callbackUrl: callbackUrl});
    }

    const handleData = (e) => {
      const { name, value } = e.target;
      setFormData({...formData, [name]:value})
    }

    if(loading)
      return (
        <Loading message={"Validando tus datos, favor espera"}/>)

    return (
    <section className="bg-white">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="/"
          className="orange_gradient flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="/assets/images/comparator-logo.png"
            alt="logo"
          />

        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="h-8 lg:h-12 orange_gradient text-xl font-bold leading-tight tracking-tight text-orange-500 md:text-4xl">
              {isLogin?"Ingresa tus credenciales":"Crea tu cuenta"}
            </h1>
            <form onSubmit={executeOnCredentialLogin} method="POST" className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Correo
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="ejemplo@dominio.com"
                  required={true}
                  value={formData.email}
                  onChange={handleData}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                  value={formData.password}
                  onChange={handleData}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    {isLogin? <span>¿Sin cuenta? <Link className="dropdown_link" href={'/register'}>Registrarme</Link> </span>:<span>¿Ya tienes cuenta? <Link className="dropdown_link" href={'/login'}>Ingresar</Link> </span>}
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Olvidé mi contraseña
                </a>
              </div>
              <button value ="credentials"  type="submit" className="w-full black_btn">
                Ingresar
              </button>
            </form>
            <p className="line">
                <span>Ingresar con</span>
              </p>
              <div className="px-6 sm:px-0 max-w-sm">
                <button onClick={()=>{executeSignProvider("google")}} className="text-white w-full bg-orange-500 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2"><svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>Ingresar con Google<div></div></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginRegister;
