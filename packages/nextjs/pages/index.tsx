import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { ContractData } from "~~/components/example-ui/ContractData";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">RebuildDAO</span>
          </h1>
          <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
            A DAO-driven platform where citizens and global supporters can propose, vote, and fund reconstruction
            projects using NFTs. Each NFT represents a specific reconstruction project or asset in the city.
          </code>
        </div>
      </div>

      <ContractData />
    </>
  );
};

export default Home;
