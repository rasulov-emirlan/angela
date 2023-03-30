import React from "react";

interface Person {
  name: string;
  addedByEmail?: string;
  addedByName?: string;
  avatar?: string;
  score: number;
}

interface LeaderboardProps {
  people: Person[];
}

const colorRange = new Map<number, string>(
  Array.from({ length: 11 }, (_, i) => i).map((i) => [
    i,
    `rgb(${255 - i * 25}, ${i * 25}, 0)`,
  ])
);

const Leaderboard = ({ people }: LeaderboardProps) => {
  console.log(colorRange);
  return (
    <article className="w-full rounded-md bg-gray-900 p-2 text-white">
      <h1 className="my-6 text-center text-3xl">Leaderboard</h1>
      <ol className="flex flex-col gap-2">
        {people.map((person, i) => (
          <li
            key={i}
            className="flex max-h-20 overflow-hidden rounded-md border-2 border-gray-400"
          >
            <img
              src={person.avatar}
              alt={"avatar-" + person.name}
              className=""
            />

            <div className="flex w-full justify-between">
              <div className="flex h-full flex-col pl-2">
                <span className="text-2xl">
                  {person.name}
                  <span className="pl-2 text-xl text-gray-400">
                    from:{" "}
                    {person.addedByName
                      ? person.addedByName
                      : person.addedByEmail}
                  </span>
                </span>
                <span
                  style={{
                    backgroundColor: colorRange.get(Math.floor(person.score)),
                  }}
                  className="h-8 w-8 rounded-full text-center text-2xl"
                >
                  {person.score}
                </span>
              </div>

              <form
                className="flex h-full flex-col"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="number"
                  min={0}
                  max={10}
                  className="h-1/2 border-none bg-[#2e026d] pl-2 outline-none"
                />
                <input
                  type="button"
                  value="save"
                  className="h-1/2 bg-white/10 px-10 py-3 text-center text-xl font-semibold text-white no-underline transition hover:bg-white/20"
                />
              </form>
            </div>
          </li>
        ))}
      </ol>
    </article>
  );
};

export default Leaderboard;
