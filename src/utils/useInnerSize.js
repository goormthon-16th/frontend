import { useEffect, useState } from "react";

export const useInnerSize = () => {
  const [innerHeight, setInnerHeight] = useState(0);
  const [innerWidth, setInnerWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setInnerHeight(window.innerHeight);
      setInnerWidth(window.innerWidth);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return {
    innerHeight,
    innerWidth,
  };
};
