import { useState } from "react";
import dynamic from "next/dynamic";
import { HareIcon } from "./assets/HareIcon";
import { useAnimationConfig, useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const DynamicMapComponent = dynamic(
  () => import("../MapComponents"),
  { ssr: false }, // This will load the component only on the client side
);

export const ContractData = () => {
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const { data: totalCounter } = useScaffoldContractRead({
    contractName: "ProjectProposal",
    functionName: "totalSupply",
  });

  const { data: currentProposals, isLoading: isProposalsLoading } = useScaffoldContractRead({
    contractName: "ProjectProposal",
    functionName: "getAllProposals",
  });

  const { showAnimation } = useAnimationConfig(totalCounter);

  console.log(currentProposals);

  if (isProposalsLoading) {
    return <></>;
  }

  return (
    <div className="flex flex-col justify-center items-center bg-base-300 py-10 px-5 sm:px-0 lg:py-auto max-w-[100vw]">
      <HareIcon className="absolute right-0 bottom-24" />
      <div
        className={`flex flex-col max-w-md bg-base-200 bg-opacity-70 rounded-2xl shadow-lg px-5 py-2 w-full ${
          showAnimation ? "animate-zoom" : ""
        }`}
      >
        <div className="flex justify-between w-full">
          <button
            className="btn btn-circle btn-ghost relative bg-center bg-black bg-no-repeat"
            onClick={() => {
              setTransitionEnabled(!transitionEnabled);
            }}
          >
            <div
              className={`absolute inset-0 bg-center bg-no-repeat bg-black transition-opacity ${
                transitionEnabled ? "opacity-0" : "opacity-100"
              }`}
            />
          </button>
          <div className="bg-secondary border border-primary rounded-xl flex">
            <div className="p-2 py-1 border-r border-primary flex items-end">Total count</div>
            <div className="text-4xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
              {totalCounter?.toString() || "0"}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col rounded-2xl py-10" style={{ width: "80%", height: "800px" }}>
        <DynamicMapComponent proposals={currentProposals} />
      </div>
    </div>
  );
};
