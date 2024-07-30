import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import image1 from "./assets/image1.jpeg";
import image2 from "./assets/image2.jpeg";
import image3 from "./assets/image3.jpeg";
import image4 from "./assets/image4.jpeg";
import image5 from "./assets/image5.jpeg";
import image6 from "./assets/image6.jpeg";
// Add more image imports here

const Background = () => {
  const imagesRef = useRef(null);
  const imageRef = useRef(null);
  const images = [
    image1,
    image2,
    image3,
    image4,
    image6,
    image5,
    image1,
    image2,
    image3,
    image4,
    image6,
    image5,
    // Add more image URLs here
  ];

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1 });

    tl.to(imagesRef.current, {
      x:
        (-imageRef.current.width * images.length - 12 * (images.length - 1)) /
        2,
      duration: 20,
      ease: "none",
    });
  });

  return (
    <div
      ref={imagesRef}
      className="fixed -z-50 top-0 left-0 w-full h-full py-60 flex items-start justify-start space-x-3"
    >
      {images.map((image, index) => (
        <img
          ref={imageRef}
          key={index}
          src={image}
          alt={`Image ${index + 1}`}
          className="h-full aspect-[9/16] object-cover"
        />
      ))}
    </div>
  );
};

export default Background;
