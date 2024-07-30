import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function Start({ setIsStartEnd }) {
  const clickMeRef = useRef();
  const [isClickMeHover, setIsClickMeHover] = useState(false);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.to(clickMeRef.current, {
        duration: 0.5,
        scale: 1.2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: isClickMeHover ? 0 : -1,
      });
    },
    { dependencies: [isClickMeHover], revertOnUpdate: true }
  );

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
      <button
        ref={clickMeRef}
        className="text-5xl hover:text-green-400"
        onMouseEnter={() => {
          setIsClickMeHover(true);
        }}
        onMouseLeave={() => {
          setIsClickMeHover(false);
        }}
        onMouseDown={() => {
          setIsStartEnd(true);
        }}
      >
        click me! 🐱
      </button>
    </div>
  );
}

export default Start;
