import React from "react";
import { useGlobalContext } from "../../Context/GlobalContextOne";

import GoBackCom from "../GoBackCom";
const StartThread = () => {
  const { selectedThread } = useGlobalContext();
  console.log(selectedThread);
  return (
    <div>
      <GoBackCom page={"Start Discussion"} link={"/MyIdeas"} />
    </div>
  );
};
export default StartThread;
