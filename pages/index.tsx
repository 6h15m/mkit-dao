import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";

const Home: NextPage = () => {
  const { user, logout, isAuthenticated } = useMoralis();
  const router = useRouter();
  const Web3Api = useMoralisWeb3Api();
  const [isMemberOfFoxyDrakeDAO, setIsMemberOfFoxyDrakeDAO] =
    useState<boolean>(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/login`).then();
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
        <title>mkitDAO</title>
      </Head>
      <main className="w-full h-screen flex flex-col items-center justify-between bg-zinc-800">
        <div />
        <div className="flex flex-col items-center justify-center gap-y-6">
          <h1 className="text-5xl text-stone-50 font-bold">mkitDAO</h1>
          {isMemberOfFoxyDrakeDAO ? (
            <Link href="/dao/foxy-drake">
              <a className="p-3 bg-stone-700 text-stone-50 block">
                Go to Foxy Drake DAO
              </a>
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
      </main>
    </>
  );
};

export default Home;
