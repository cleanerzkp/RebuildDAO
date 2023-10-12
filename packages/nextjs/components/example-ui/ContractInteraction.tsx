import { useState } from "react";
import { CopyIcon } from "./assets/CopyIcon";
import { DiamondIcon } from "./assets/DiamondIcon";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const ContractInteraction = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [fundingGoal, setFundingGoal] = useState("");
  const [location, setLocation] = useState("");
  const [url, setUrl] = useState("");

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "ProjectProposal",
    functionName: "createProposal",
    args: [name, description, url, BigInt(fundingGoal), location],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <div className="flex bg-base-300 relative pb-10">
      <DiamondIcon className="absolute top-24" />
      <CopyIcon className="absolute bottom-0 left-36" />
      <div className="flex flex-col w-full mx-5 sm:mx-8 2xl:mx-20">

        <div className="flex flex-col mt-6 px-7 py-8 bg-base-200 opacity-80 rounded-2xl shadow-lg border-2 border-primary">
          <span className="text-4xl sm:text-6xl text-black">Create Proposal</span>

          <div className="mt-8 flex flex-col items-start gap-2 sm:gap-5">
            <input
              type="text"
              placeholder="Name"
              className="input font-bai-jamjuree w-full px-5 bg-black border border-primary text-lg sm:text-2xl text-gold placeholder-white uppercase"
              onChange={e => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Description"
              className="input font-bai-jamjuree w-full px-5 bg-black border border-primary text-gold text-lg sm:text-2xl placeholder-white uppercase"
              onChange={e => setDescription(e.target.value)}
            />

            <input
              type="text"
              placeholder="Location"
              className="input font-bai-jamjuree w-full px-5 bg-black border border-primary text-gold text-lg sm:text-2xl placeholder-white uppercase"
              onChange={e => setLocation(e.target.value)}
            />

            <input
              type="text"
              placeholder="URL"
              className="input font-bai-jamjuree w-full px-5 bg-black border border-primary text-gold text-lg sm:text-2xl placeholder-white uppercase"
              onChange={e => setUrl(e.target.value)}
            />

            <input
              type="number"
              
              placeholder="Funding Goal"
              className="input font-bai-jamjuree w-full px-5 bg-black border border-primary text-gold text-lg sm:text-2xl placeholder-white uppercase"
              onChange={e => setFundingGoal(e.target.value)}
            />

            <div className="flex rounded-full border border-primary p-1 flex-shrink-0">
              <div className="flex rounded-full border-2 border-primary p-1">
                <button
                  className="btn btn-primary rounded-full capitalize font-normal font-white w-24 flex items-center gap-1 hover:gap-2 transition-all tracking-widest"
                  onClick={() => writeAsync()}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <>
                      Send <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-2 items-start">
            <span className="text-sm leading-tight">Price:</span>
            <div className="badge badge-warning">0.01 ETH + Gas</div>
          </div>
        </div>
      </div>
    </div >
  );
};
