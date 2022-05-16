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
    <div className="w-full h-screen flex flex-col items-center justify-between bg-zinc-800">
      <div />
      <div className="flex flex-col items-center justify-center gap-y-6">
        <h1 className="text-5xl text-stone-50 font-bold">mkitDAO</h1>
        {isMemberOfFoxyDrakeDAO ? (
          <Link className="p-3 bg-stone-700 text-stone-50" to="/dao/foxy-drake">
            Go to Foxy Drake DAO
          </Link>
        ) : (
          <p className="p-3 text-stone-50 text-center">
            You are not in Foxy Drake DAO!
            <br />
            Go to Salt in Hurt Discord Channel.
          </p>
        )}
      </div>
      <button className="p-3 bg-stone-800 text-stone-50" onClick={logOut}>
        Metamask Logout
      </button>
    </div>
  );
};
