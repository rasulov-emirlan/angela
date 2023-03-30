import { api } from "angela/utils/api";
import React from "react";

interface Vote {
  value: number;
}

interface Person {
  id: string;
  name: string;
  votes: Vote[];
  currentVote?: number; // used for the form, TODO: not sure if this is the best way to do it
}

interface LeaderboardProps {
  people: Person[];
  updateCallback: () => void;
}

const colorRange = new Map<number, string>(
  Array.from({ length: 11 }, (_, i) => i).map((i) => [
    i,
    `rgb(${255 - i * 25}, ${i * 25}, 0)`,
  ])
);

const computePersonScore = (person: Person): number => {
  if (person.votes.length === 0) {
    return 0;
  }
  // arithmetically average the votes
  const sum = person.votes.reduce((acc, vote) => acc + vote.value, 0);
  return sum / person.votes.length;
};

const Leaderboard = ({ people, updateCallback }: LeaderboardProps) => {
  const voter = api.leaderboard.vote.useMutation();

  const handleVote = (
    e: React.FormEvent<HTMLFormElement>,
    personId: string,
    value: number
  ) => {
    e.preventDefault();
    voter.mutate(
      {
        characterId: personId,
        value: value,
      },
      {
        onSuccess: () => {
          updateCallback();
          alert("Vote submitted!");
        },
        onError: (err) => {
          console.error(err);
          alert("Something went wrong :/");
        },
      }
    );
  };

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
                    backgroundColor: colorRange.get(
                      Math.floor(computePersonScore(person))
                    ),
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-xl"
                >
                  {computePersonScore(person).toFixed(1)}
                </span>
              </div>

              <form
                className="flex h-full border-collapse flex-col overflow-hidden rounded-md bg-[#21262D]"
                onSubmit={(e) =>
                  handleVote(
                    e,
                    person.id,
                    person.currentVote ? person.currentVote : 0
                  )
                }
              >
                <input
                  type="number"
                  min={0}
                  max={10}
                  placeholder="vote..."
                  className="h-1/2 rounded-t-md border border-b-[0.5px] border-[#30373C] bg-[#010409] pl-2 outline-none hover:border-[#495157]"
                  onChange={(e) =>
                    (person.currentVote = parseInt(e.target.value))
                  }
                />
                <input
                  type="submit"
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
