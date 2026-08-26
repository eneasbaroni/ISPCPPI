import { useState, useEffect } from "react";

const useScreenSize = () => {
  const [width, setWidth] = useState(0); // Initialize to a default value
  const [height, setHeight] = useState(0); // Initialize to a default value

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
      };

      // Set initial values on mount (client-side)
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);


  return { height, width }
}

export default useScreenSize;