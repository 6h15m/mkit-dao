import React, { useEffect, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { Link, useNavigate } from "react-router-dom";

export const Main = () => {
  const { user, logout, isAuthenticated } = useMoralis();
  const navigate = useNavigate();
  const Web3Api = useMoralisWeb3Api();
  const [isMemberOfFoxyDrakeDAO, setIsMemberOfFoxyDrakeDAO] =
    useState<boolean>(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(`/login`);
    }

    fetchNFTsForContract().then(() => console.log("fetched!"));
  }, [isAuthenticated]);

  const fetchNFTsForContract = async () => {
    if (user == null) {
      return;
    }
    const testnetNFTs = await Web3Api.Web3API.account.getNFTs({
      chain: "rinkeby" as const,
      address: user.get("ethAddress"),
      token_addresses: [
        "0x45cdce3a5b54fd19bb834bebef15f76c0075b3eb",
        "0x45cdce3a5b54fd19bb834bebef15f76c0075b3eb",
        "0x45cdce3a5b54fd19bb834bebef15f76c0075b3eb",
        "0x45cdce3a5b54fd19bb834bebef15f76c0075b3eb",
        "0x45cdce3a5b54fd19bb834bebef15f76c0075b3eb",
      ],
    });
    setIsMemberOfFoxyDrakeDAO((testnetNFTs.result?.length ?? 0) > 0);
  };

  const logOut = async () => {
    await logout()
      .then(function () {
        navigate(`/login`);
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log("logout");
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-neutral-200">
      <h1 className="text-4xl mb-6">mkitDAO Main</h1>
      <div className="flex justify-center gap-x-8">
        {isMemberOfFoxyDrakeDAO && (
          <Link className="p-3 bg-stone-800 text-stone-50" to="/dao/foxy-drake">
            Foxy Drake DAO
          </Link>
        )}
        <button className="p-3 bg-stone-800 text-stone-50" onClick={logOut}>
          Metamask Logout
        </button>
      </div>
    </div>
  );
};
