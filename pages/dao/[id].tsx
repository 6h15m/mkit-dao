import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";

type NFT = {
  token_address: string;
  token_uri: string | null;
  token_id: string;
  name: string;
  metadata: string | null;
};

const Dao = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user, isAuthenticated, logout } = useMoralis();
  const Web3Api = useMoralisWeb3Api();
  const [myFoxyDrakes, setMyFoxyDrakes] = useState<Array<NFT>>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/login`).then();
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
      return router.push(`/`).then();
    }
    setMyFoxyDrakes(
      testnetNFTs.result.map((result) => ({
        token_address: result.token_address,
        token_uri: result.token_uri ?? null,
        token_id: result.token_id,
        name: result.name,
        metadata: result.metadata ?? null,
      })),
    );
  };

  const logOut = async () => {
    await logout()
      .then(() => {
        router.push(`/login`).then();
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("logout");
  };

  return (
    <>
      <Head>
        <title>Foxy Drake Club | mkitDAO</title>
      </Head>
      <main className="w-full h-screen flex flex-col items-center justify-between bg-zinc-800">
        <div />
        <div className="flex flex-col items-center justify-center gap-y-6">
          <h1 className="text-5xl text-stone-50 font-bold">Foxy Drake Club</h1>
          <ul>
            {myFoxyDrakes?.map((myFoxyDrake) => (
              <li className="text-white mb-2">
                <a
                  href={`https://testnets.opensea.io/assets/${myFoxyDrake.token_address}/${myFoxyDrake.token_id}`}
                  target="_blank"
                >
                  {myFoxyDrake.token_address} ????
                </a>
              </li>
            )) ?? (
              <span className="text-white">Loading Your Foxy Drakes....</span>
            )}
          </ul>
        </div>
        <button className="p-3 bg-stone-800 text-stone-50" onClick={logOut}>
          Metamask Logout
        </button>
      </main>
    </>
  );
};

export default Dao;
