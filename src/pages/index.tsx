import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "angela/utils/api";
import Leaderboard from "angela/components/Leaderboard";
import Form from "angela/components/Form";
import Footer from "angela/components/Footer";

const Home: NextPage = () => {
  const data = api.leaderboard.paginate.useQuery({
    page: 0,
    pageSize: 100,
  });

  if (data.status === "loading") {
    return <div>Loading...</div>;
  }

  if (data.status === "error") {
    return <div>Error: {data.error.message}</div>;
  }

  const updateCallback = () => {
    data.refetch().catch((err) => {
      console.error(err);
    });
  };

  return (
    <>
      <Head>
        <title>Angela</title>
        <meta
          name="description"
          content="Leaderboard for evaluating appearances"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className="h-18 flex w-full bg-[#171A22]">
        <AuthShowcase />
      </div>

      <div className="mx-auto flex min-h-screen max-w-[1280px] gap-4 px-2">
        <main className="flex min-h-screen w-2/3 flex-col">
          <Leaderboard people={data.data} updateCallback={updateCallback} />
        </main>

        <aside className="my-1 w-1/3">
          <Form updateCallback={updateCallback} />
        </aside>
      </div>

      <Footer />
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
