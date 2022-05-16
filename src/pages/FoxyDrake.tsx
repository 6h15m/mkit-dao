import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

type NFT = {
  token_address: string;
  name: string;
  metadata: string | null;
};

export const FoxyDrake = () => {
  const { user, isAuthenticated, logout } = useMoralis();
  const navigate = useNavigate();
  const Web3Api = useMoralisWeb3Api();
  const [myFoxyDrakes, setMyFoxyDrakes] = useState<Array<NFT> | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(`/login`);
    }

    fetchNFTsForContract().then(() => console.log("fetched!"));
  }, [isAuthenticated, user, setMyFoxyDrakes]);

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
    if (testnetNFTs.result == null) {
      return navigate(`/`);
    }
    setMyFoxyDrakes(
      testnetNFTs.result.map((result) => ({
        token_address: result.token_address,
        name: result.name,
        metadata: result.metadata ?? null,
      })),
    );
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
        <h1 className="text-5xl text-stone-50 font-bold">Foxy Drake Club</h1>
        <ul>
          {myFoxyDrakes?.map((myFoxyDrake) => (
            <li className="text-white">{myFoxyDrake.token_address} 🦊</li>
          )) ?? (
            <span className="text-white">Loading Your Foxy Drakes....</span>
          )}
        </ul>
      </div>
      <button className="p-3 bg-stone-800 text-stone-50" onClick={logOut}>
        Metamask Logout
      </button>
    </div>
  );
};
