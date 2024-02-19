import { useState } from "react";

export default function useStepper(numSteps: number) {
  
  const [stepIdx, setStepIdx] = useState(0);

  const next = () => {
    setStepIdx(idx => {
      if(idx == numSteps-1) return idx;
      return idx + 1;
    })
  }

  const prev = () => {
    setStepIdx(idx => {
      if(idx === 0) return idx;
      return idx - 1;
    })
  }

  const goTo = (idx: number) => {
    if(idx < numSteps) setStepIdx(idx);
  }

  return {
    prev,
    next,
    stepIdx,
    goTo
  }
}