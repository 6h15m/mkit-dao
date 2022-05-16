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
    <div className="w-full h-screen flex flex-col items-center justify-center bg-neutral-200">
      <h1 className="text-4xl mb-6">mkitDAO</h1>
      <div className="flex justify-center gap-x-8">
        <button className="p-3 bg-stone-800 text-stone-50" onClick={login}>
          Metamask Login
        </button>
      </div>
    </div>
  );
};
