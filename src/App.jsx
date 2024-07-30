import { useState, useRef } from "react";

import Start from "./Start";
import Body from "./Body";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function App() {
  const displayRef = useRef();

  const [isStartEnd, setIsStartEnd] = useState(false);

  const [display, setDisplay] = useState(
    <Start setIsStartEnd={setIsStartEnd} />
  );

  useGSAP(
    () => {
      if (isStartEnd) {
        const tl = gsap.timeline();

        tl.to(displayRef.current, { duration: 0.2, opacity: 0 })
          .call(() => {
            setDisplay(<Body />);
          })
          .to(displayRef.current, { duration: 0.2, opacity: 1 });
      }
    },
    { dependencies: [isStartEnd] }
  );

  return <div ref={displayRef}>{display}</div>;
}

export default App;
