"use client";

import { createContext, useContext } from "react";

import { useMeasure } from "react-use";
import { useInnerSize } from "@/utils/useInnerSize";

export const useMobileContainerWidth = () => {
  return useContext(ScreenContext);
};

export const ScreenContext = createContext(480);

export const MobileContainer = (props) => {
  const [ref, { width }] = useMeasure();
  const { children } = props;
  const { innerHeight } = useInnerSize();

  return (
    <ScreenContext.Provider value={width}>
      <div
        ref={ref}
        style={{
          maxWidth: "480px",
          marginLeft: "auto",
          marginRight: "auto",
          minHeight: innerHeight > 0 ? innerHeight : "100vh",
          backgroundColor: "white",
        }}
      >
        {children}
      </div>
    </ScreenContext.Provider>
  );
};
