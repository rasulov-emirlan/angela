import { api } from "angela/utils/api";
import { useState } from "react";
import StdBtn from "./ui/button";

interface FormProps {
  updateCallback: () => void;
}

const Form = ({ updateCallback }: FormProps) => {
  const [name, setName] = useState<string>("");

  const mutator = api.leaderboard.create.useMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutator.mutate(name, {
      onSuccess: () => {
        updateCallback();
        setName("");
      },
      onError: (err) => {
        console.error(err);
        alert("Something went wrong :/");
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 overflow-hidden rounded-md border border-[#30373C] bg-[#0C1017] p-2 text-white"
    >
      <h3 className="text-center text-xl">add a character</h3>
      <input
        type="text"
        className="w-full rounded-md border border-[#30373C] bg-[#010409] pl-2 outline-none"
        placeholder="fullname..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <StdBtn
        text="Create"
        onClick={() => {
          console.log("clicked");
        }}
        btnType="submit"
      />
    </form>
  );
};

export default Form;
