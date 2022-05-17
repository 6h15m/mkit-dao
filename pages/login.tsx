import { useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMoralis } from "react-moralis";
import styles from "../styles/Home.module.css";

const Login: NextPage = () => {
  const { authenticate, isAuthenticated } = useMoralis();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push(`/`).then();
    }
  }, [isAuthenticated]);

  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({ signingMessage: "Log in...." })
        .then(() => {
          router.push(`/`).then();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>mkitDAO | Login</title>
        <meta name="description" content="mkitDAO" />
      </Head>
      <main className={styles.main}>
        <div className="w-full h-screen flex flex-col items-center justify-center bg-zinc-800">
          <div className="flex flex-col items-center justify-center gap-y-6">
            <h1 className="text-5xl text-stone-50 font-bold">mkitDAO</h1>
            <button className="p-3 bg-stone-700 text-stone-50" onClick={login}>
              Metamask Login
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
