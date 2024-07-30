import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import walkingCatSpriteSheet from "./assets/walking-cat-sprite-sheet.png";
import holdingFlowersCatImage from "./assets/holding-flowers-cat.png";
import happyCatGif from "./assets/happy-cat.gif";
import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";

function Body() {
  const walkingCatRef = useRef();
  const catDisplayRef = useRef();
  const dialogRef = useRef();
  const noButtonRef = useRef();
  const buttonRef = useRef();
  const [isNoButtonHover, setIsNoButtonHover] = useState(false);

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
  const [isNoButtonClick, setIsNoButtonClick] = useState(false);
  const [numOfTries, setNumOfTries] = useState(0);
  const [noButtonRunAwayDuration, setNoButtonRunAwayDuration] = useState(0.5);

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
      if (isNoButtonHover || isNoButtonClick) {
        gsap.to(noButtonRef.current, {
          x: getRandomNumber(minX, maxX),
          y: getRandomNumber(minY, maxY),
          duration: noButtonRunAwayDuration,
          onComplete: () => {
            setNumOfTries(numOfTries + 1);
            setNoButtonRunAwayDuration(noButtonRunAwayDuration - 0.05);
          },
        });
      }
    },
    { dependencies: [isNoButtonHover, isNoButtonClick] }
  );

  useGSAP(
    () => {
      if (numOfTries === 10 || numOfTries === 20) {
        const tl = gsap.timeline();

        tl.to(dialogRef.current, {
          opacity: 0,
          duration: 0.2,
        })
          .call(() => {
            numOfTries === 10
              ? (dialogRef.current.innerText = "pleaseee 😢")
              : (dialogRef.current.innerText = "lmao enough ah 💀");
          })
          .to(dialogRef.current, { opacity: 1, duration: 0.2 });
      }
    },
    { dependencies: [numOfTries] }
  );

  // blinking yes button animation
  const yesButtonRef = useRef();
  const [isYesButtonHover, setIsYesButtonHover] = useState(false);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.to(yesButtonRef.current, {
        duration: 0.5,
        scale: isYesButtonHover ? 1.2 : 1.05,
        ease: "power1.inOut",
        yoyo: true,
        repeat: isYesButtonHover ? 0 : -1,
      });
    },
    { dependencies: [isYesButtonHover], revertOnUpdate: true }
  );

  // click yes button animation
  const [isYesButtonClick, setIsYesButtonClick] = useState(false);

  useGSAP(
    () => {
      if (isYesButtonClick) {
        const tl = gsap.timeline();

        tl.fromTo(
          yesButtonRef.current,
          {
            scale: 1,
            duration: 0.1,
          },
          {
            scale: 1.25,
            duration: 0.1,
          }
        );

        tl.to(catDisplayRef.current, { duration: 0.2, opacity: 0 });
        tl.to(dialogRef.current, { duration: 0.2, opacity: 0 }, "<");
        tl.to(buttonRef.current, { duration: 0.2, opacity: 0 }, "<");

        tl.call(() => {
          setCatDisplay(
            <div className="relative">
              <img
                src={happyCatGif}
                alt="Happy cat"
                className="relative z-0 scale-125"
              />
              {/* shadow */}
              <div className="absolute -z-10 left-[45px] bottom-[-10px] w-[60%] h-5 bg-black blur-xl opacity-50 rounded-full"></div>
            </div>
          );
        });

        tl.to(catDisplayRef.current, { duration: 0.2, opacity: 1 });
        tl.call(() => {
          dialogRef.current.innerText = "yay! 🥰";
        });

        tl.to(dialogRef.current, { duration: 0.2, opacity: 1, delay: 0.5 });
      }
    },
    { dependencies: [isYesButtonClick] }
  );

  const [hearts, setHearts] = useState([]);
  const heartsRef = useRef([]);

  useGSAP(
    () => {
      setHearts([]);

      for (let i = 0; i < 1000; i++) {
        const heart = (
          <div
            ref={(el) => heartsRef.current.push(el)}
            key={i}
            className="fixed top-full left-0 z-50 w-5 h-5 lg:text-7xl text-6xl"
            style={{
              transform: `translate(${getRandomNumber(0, windowSize.width)}px`,
            }}
          >
            ❤️
          </div>
        );

        setHearts((prev) => [...prev, heart]);
      }

      if (isYesButtonClick) {
        const tl = gsap.timeline();

        heartsRef.current.map((heartRef) => {
          tl.to(
            heartRef,
            {
              duration: 1,
              y: -windowSize.height - 100,
              ease: "power1.in",
            },
            "<+0.01"
          );
        });
      }
    },
    { dependencies: [windowSize, isYesButtonClick] }
  );

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
      <div
        className="relative w-[225px] h-[351px] flex justify-center items-center lg:scale-125"
        ref={catDisplayRef}
      >
        {catDisplay}

        {/* dialog */}
        <div className="absolute top-14 left-[180px] w-[100px] h-[90px] flex items-center justify-center">
          <div className="w-[100px]" ref={dialogRef}>
            will you please be my girlfriend? 🥺
          </div>
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
            className="relative bg-green-500 px-4 py-2 rounded-3xl hover:bg-green-300"
            onMouseEnter={() => {
              setIsYesButtonHover(true);
            }}
            onMouseLeave={() => {
              setIsYesButtonHover(false);
            }}
            onMouseDown={() => {
              setIsYesButtonClick(true);
            }}
            onMouseUp={() => {
              setIsYesButtonClick(false);
            }}
          >
            YES
          </button>
        </div>
        <div className="absolute right-0 w-[50%] h-full flex justify-center items-center">
          <button
            ref={noButtonRef}
            className="relative bg-red-500 px-4 py-2 rounded-3xl transition hover:scale-125 hover:bg-red-400"
            onMouseEnter={() => {
              setIsNoButtonHover(true);
            }}
            onMouseLeave={() => {
              setIsNoButtonHover(false);
            }}
            onMouseDown={() => {
              setIsNoButtonClick(true);
            }}
            onMouseUp={() => {
              setIsNoButtonClick(false);
            }}
          >
            NO
          </button>
        </div>
      </div>
      {hearts}
    </div>
  );
}

export default Body;
