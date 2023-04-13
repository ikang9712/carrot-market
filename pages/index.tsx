import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div>
      <input type="file" className="file:cursor-pointer file:hover:text-purple-400 file:hover:bg-white file:hover:border-purple-400 file:transition-colors file:border-0 file:rounded-xl file:px-5 file:text-white file:bg-purple-400">

      </input>
    </div>
  );
};

export default Home;