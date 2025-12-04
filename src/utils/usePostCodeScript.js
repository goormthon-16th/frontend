import { useEffect, useState } from "react";

export function useDaumPostcodeScript() {
  const isAlreadyLoaded =
    typeof window !== "undefined" &&
    document.getElementById("daum-postcode-script") !== null;

  const [loaded, setLoaded] = useState(isAlreadyLoaded);

  useEffect(() => {
    if (isAlreadyLoaded) return;

    const script = document.createElement("script");
    script.id = "daum-postcode-script";
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    script.onload = () => setLoaded(true);

    document.body.appendChild(script);

    return () => {
      document.getElementById("daum-postcode-script")?.remove();
    };
  }, [isAlreadyLoaded]);

  return loaded;
}
