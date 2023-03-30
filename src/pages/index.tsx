import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "angela/utils/api";
import Leaderboard from "angela/components/Leaderboard";

const Home: NextPage = () => {
  const people = [
    {
      name: "Angela",
      score: 5,
      smashCount: 3,
      passCount: 1,
      addedByEmail: "rasulov.emirlan@gmail.com",
      addedByName: "Emirlan Rasulov",
      avatar: "https://i.imgur.com/8Km9tLL.png",
    },
    {
      name: "Emirlan",
      score: 10,
      smashCount: 2,
      passCount: 1,
      addedByEmail: "rasulov.emirlan@gmail.com",
      addedByName: "Emirlan Rasulov",
      avatar: "https://i.imgur.com/8Km9tLL.png",
    },
  ];
  return (
    <>
      <Head>
        <title>Angela</title>
        <meta
          name="description"
          content="Leaderboard for evaluating appearances"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-18 flex w-full bg-[#171A22]">
        <AuthShowcase />
      </div>

      <main className="mx-auto flex min-h-screen max-w-[1280px] flex-col">
        <Leaderboard people={people} />
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();
  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between p-2 text-white">
      <p>
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-md border border-[#30373C] bg-[#21262D] p-2 hover:border-[#495157] hover:bg-[#3f454d]"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
