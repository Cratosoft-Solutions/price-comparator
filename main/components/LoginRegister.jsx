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
import { track } from '@vercel/analytics';
import axios from "axios";

const LoginRegister = ({isLogin=true}) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const dispatch = useDispatch();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

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

          console.log("res",res);

        //if it is registration and error is not presented, activation email is sent
        if(!isLogin && !res?.error ){
            await axios.post("api/email/activate/",{ to:formData.email});
            dispatch(setLoading(false));
            const {title, message, time, type} = AUTH_MESSAGES.filter(element => element.id == "ActivateAccount")[0];
            processMessageAlert(title, type, time,message)
        } else {
          dispatch(setLoading(false));
          if (!res?.error) {
            router.push(callbackUrl);
          } else {
            const {title, message, time, type} = AUTH_MESSAGES.filter(element => element.id == res.error)[0]||AUTH_MESSAGES.filter(element => element.id == "CredentialsSignin")[0];
            processMessageAlert(title, type, time,message);
          }
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
        <div className="flex flex-col items-center justify-center mx-auto lg:h-full lg:py-0 p-6 lg:p-2">
          <div className="w-full bg-white rounded-lg drop-shadow-[0_0px_2px_rgba(0,0,0,0.25)] lg:mt-4 sm:max-w-md xl:p-0 mb-4">
            <div className="p-6  sm:p-8">
              <h1 className="text-black h-8 lg:h-12 text-xl font-black">
                {isLogin ? "Ingresa tus credenciales" : "Crea tu cuenta"}
              </h1>
              <form
                onSubmit={executeOnCredentialLogin}
                method="POST"
                className="space-y-4 lg:space-y-6"
                action="#"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-black text-gray-900 "
                  >
                    Correo
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="ejemplo@dominio.com"
                    required={true}
                    value={formData.email}
                    onChange={handleData}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-black text-gray-900 "
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    required={true}
                    value={formData.password}
                    onChange={handleData}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      {isLogin ? (
                        <span className="text-black ">
                          ¿Sin cuenta?{" "}
                          <Link className="dropdown_link" href={"/register"}>
                            Registrarme
                          </Link>{" "}
                        </span>
                      ) : (
                        <span>
                          ¿Ya tienes cuenta?{" "}
                          <Link className="dropdown_link" href={"/login"}>
                            Ingresar
                          </Link>{" "}
                        </span>
                      )}
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-black text-sm font-medium text-primary-600 hover:underline "
                  >
                    Olvidé mi contraseña
                  </a>
                </div>
                <button
                  value="credentials"
                  type="submit"
                  className="w-full black_btn"
                >
                  Ingresar
                </button>
              </form>
              <p className="line">
                <span>Otras opciones de ingreso</span>
              </p>
              <div className="px-6 sm:px-0 max-w-sm">
                <button
                  onClick={() => {
                    track("Signup");
                    executeSignProvider("google");
                  }}
                  className="text-black w-full bg-white font-black rounded-lg text-md px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2 border border-gray-400 shadow-xl"
                >
                  <img
                    className="mr-2 -ml-1 w-6 h-6"
                    src="/assets/images/google.svg"
                    alt="Encuentralo facil. Los mejores produtos y servicios de Costa Rica"
                    /
                  >
                  Ingresar con Google<div></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
};

export default LoginRegister;
