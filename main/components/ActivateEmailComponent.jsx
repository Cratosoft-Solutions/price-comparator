"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setLoading } from "@app/redux/slices/loading";
import axios from "axios";
import Link from "next/link";
import Alert from "./Alert";
import Loading from "@app/loading";
import { IoMailOutline } from "react-icons/io5";

const ActivateEmailComponent = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const userId = searchParams.get("ui");
  const [result, setResult] = useState({ updated: "WAITING", message: "" });

  useEffect(() => {
    const updateEmail = async () => {
      try {
        const response = await axios.put("/api/email/activate-final", {
          id: userId,
        });
        setResult(response.data);
        dispatch(setLoading(false));
      } catch (error) {
        setResult({ updated: false, message: error.message });
        dispatch(setLoading(true));
      }
    };
    dispatch(setLoading(true));
    updateEmail();
  }, []);

  if (result.updated == "WAITING") return <Loading />;

  return (
    <div className="bg-dark-bg min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="rounded-2xl border border-dark-border/30 bg-dark-surface/40 backdrop-blur-sm p-8 lg:p-10 text-center">
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${
              result.updated
                ? "bg-green-500/10 border border-green-500/20"
                : "bg-red-500/10 border border-red-500/20"
            }`}
          >
            <IoMailOutline
              className={`w-8 h-8 ${
                result.updated ? "text-green-400" : "text-red-400"
              }`}
            />
          </div>

          <h2 className="text-dark-text font-bold text-xl lg:text-2xl mb-3">
            Activación de cuenta
          </h2>

          <Alert
            message={result.message}
            title={"Activación de cuenta"}
            type={result.updated ? "SUCCESS" : "ALERT"}
          />

          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-5 py-2.5 mt-6 rounded-xl bg-gradient-to-r from-accent-primary to-accent-glow text-white text-sm font-bold shadow-lg shadow-accent-primary/20 hover:shadow-accent-primary/40 transition-all duration-300"
          >
            Ingresar a la plataforma
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ActivateEmailComponent;
