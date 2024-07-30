import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import walkingCatSpriteSheet from "./assets/walking-cat-sprite-sheet.png";
import holdingFlowersCatImage from "./assets/holding-flowers-cat.png";
import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";

function Body() {
  const walkingCatRef = useRef();
  const catDisplayRef = useRef();
  const dialogRef = useRef();
  const yesButtonRef = useRef();
  const noButtonRef = useRef();
  const buttonRef = useRef();
  const [isHover, setIsHover] = useState(false);

  const [catDisplay, setCatDisplay] = useState(
    <div
      ref={walkingCatRef}
      className="w-full h-full bg-no-repeat"
      style={{
        backgroundImage: `url(${walkingCatSpriteSheet})`,
      }}
    ></div>
  );

  // cat animation
  useGSAP(() => {
    const tl = gsap.timeline();

    // dialog set to 0 opacity
    tl.set(dialogRef.current, { opacity: 0 });

    for (let i = 0; i < 63; i++) {
      tl.set(
        walkingCatRef.current,
        { backgroundPositionX: `${-i * 225}px` },
        i * 0.05
      );
    }

    tl.from(
      walkingCatRef.current,
      { scale: 0.5, duration: 3, ease: "none" },
      0
    );

    tl.to(catDisplayRef.current, { duration: 0.2, opacity: 0 });

    tl.call(() => {
      setCatDisplay(
        <div className="relative">
          <img
            src={holdingFlowersCatImage}
            alt="Holding flowers cat"
            className="relative z-0 scale-125"
          />
          {/* shadow */}
          <div className="absolute -z-10 left-[45px] bottom-[-20px] w-[45%] h-5 bg-black blur-lg opacity-100 rounded-full"></div>
        </div>
      );
    });

    tl.to(catDisplayRef.current, { duration: 0.2, opacity: 1 });
    tl.to(dialogRef.current, { duration: 0.2, opacity: 1, delay: 0.5 });

    tl.from(buttonRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.5,
      delay: 1,
    });
  }, []);

  // run away button animation
  const windowSize = useWindowSize();
  const [isClick, setIsClick] = useState(false);
  const [numOfTries, setNumOfTries] = useState(0);

  // max x min x, max y min y
  const [rect, setRect] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const maxX = windowSize.width - rect.x - rect.width;
  const minX = -rect.x;
  const maxY = windowSize.height - rect.y - rect.height;
  const minY = -rect.y;

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(() => {
    setRect(noButtonRef.current.getBoundingClientRect());
  }, []);

  useGSAP(
    () => {
      if (isHover || isClick) {
        gsap.to(noButtonRef.current, {
          x: getRandomNumber(minX, maxX),
          y: getRandomNumber(minY, maxY),
          duration: 0.1,
          onComplete: () => {
            setNumOfTries(numOfTries + 1);
          },
        });
      }
    },
    { dependencies: [isHover, isClick] }
  );

  useGSAP(
    () => {
      if (numOfTries === 10) {
        const tl = gsap.timeline();

        tl.to(dialogRef.current, {
          opacity: 0,
          duration: 0.2,
        })
          .call(() => {
            dialogRef.current.innerText = "pleaseee 😢";
          })
          .to(dialogRef.current, { opacity: 1, duration: 0.2 });
      } else if (numOfTries === 20) {
        alert("lmao enough ah, click yes 💀");
      }
    },
    { dependencies: [numOfTries] }
  );

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
      <div
        className="relative w-[225px] h-[351px] flex justify-center items-center lg:scale-125"
        ref={catDisplayRef}
      >
        {catDisplay}

        {/* dialog */}
        <div className="absolute top-14 left-[180px] w-[100px]" ref={dialogRef}>
          will you please be my girlfriend? 🥺
        </div>
      </div>

      {/* yes or no */}
      <div
        ref={buttonRef}
        className="fixed top-0 left-0 w-full h-full text-7xl text-white"
      >
        <div className="absolute left-0 w-[50%] h-full flex justify-center items-center">
          <button
            ref={yesButtonRef}
            className="relative bg-green-500 px-8 py-4 rounded-full transition hover:scale-125 hover:bg-green-400"
          >
            YES
          </button>
        </div>
        <div className="absolute right-0 w-[50%] h-full flex justify-center items-center">
          <button
            ref={noButtonRef}
            className="relative bg-red-500 px-8 py-4 rounded-full transition hover:scale-125 hover:bg-red-400"
            onMouseEnter={() => {
              setIsHover(true);
            }}
            onMouseLeave={() => {
              setIsHover(false);
            }}
            onMouseDown={() => {
              setIsClick(true);
            }}
            onMouseUp={() => {
              setIsClick(false);
            }}
          >
            NO
          </button>
        </div>
      </div>
    </div>
  );
}

export default Body;
