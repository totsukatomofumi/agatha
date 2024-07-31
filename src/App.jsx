import { useState, useRef } from "react";

import Start from "./Start";
import Body from "./Body";
import Background from "./Background";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function App() {
  const displayRef = useRef();

  const [isStartEnd, setIsStartEnd] = useState(false);
  const [isBodyEnd, setIsBodyEnd] = useState(false);

  const [display, setDisplay] = useState(
    <Start setIsStartEnd={setIsStartEnd} />
  );

  useGSAP(
    () => {
      if (isStartEnd) {
        const tl = gsap.timeline();

        tl.to(displayRef.current, { duration: 0.2, opacity: 0 })
          .call(() => {
            setDisplay(<Body setIsBodyEnd={setIsBodyEnd} />);
          })
          .to(displayRef.current, { duration: 0.2, opacity: 1 });
      }
    },
    { dependencies: [isStartEnd] }
  );

  useGSAP(
    () => {
      if (isBodyEnd) {
        const tl = gsap.timeline({ delay: 15 });

        tl.to(displayRef.current, { duration: 0.2, opacity: 0 })
          .call(() => {
            setDisplay(<Background />);
          })
          .to(displayRef.current, { duration: 0.2, opacity: 1 });
      }
    },
    { dependencies: [isBodyEnd] }
  );

  return <div ref={displayRef}>{display}</div>;
}

export default App;
