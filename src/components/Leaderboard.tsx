import React from "react";

interface Person {
  name: string;
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
    <article className="h-full w-full flex-1 border-x border-[#30373C] bg-[#010409] p-2 text-white">
      <h1 className="my-6 text-center text-3xl">Leaderboard</h1>
      <ol className="flex flex-col gap-2">
        {people.map((person, i) => (
          <li
            key={i}
            className="flex max-h-20 overflow-hidden rounded-md border border-[#30373C] bg-[#0C1017] p-1"
          >
            <div className="flex w-full justify-between">
              <div className="flex h-full flex-col pl-2">
                <span className="text-2xl">{person.name}</span>
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
                className="flex h-full border-collapse flex-col overflow-hidden rounded-md bg-[#21262D]"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="number"
                  min={0}
                  max={10}
                  className="h-1/2 rounded-t-md border border-b-[0.5px] border-[#30373C] bg-[#010409] pl-2 outline-none hover:border-[#495157]"
                />
                <input
                  type="button"
                  value="save"
                  className="h-1/2 rounded-b-md border border-[#30373C] bg-inherit hover:border-[#495157]"
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
