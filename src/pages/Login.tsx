import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { authenticate, isAuthenticated } = useMoralis();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/`);
    }
  }, [isAuthenticated]);

  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({ signingMessage: "Log in...." })
        .then(function () {
          navigate(`/`);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-zinc-800">
      <div className="flex flex-col items-center justify-center gap-y-6">
        <h1 className="text-5xl text-stone-50 font-bold">mkitDAO</h1>
        <button className="p-3 bg-stone-700 text-stone-50" onClick={login}>
          Metamask Login
        </button>
      </div>
    </div>
  );
};
