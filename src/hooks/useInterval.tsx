import {useEffect, useRef} from 'react';

// Credit to Dan Abramov for Custom useInterval Hook
// https://overreacted.io/making-setinterval-declarative-with-react-hooks/

type IntervalFunction = () => unknown | void;

function useInterval(callback: IntervalFunction, delay: number | null) {
  const savedCallback = useRef<IntervalFunction | null>(null);

  // Remember the latest callback.
  useEffect(() => {
    if (delay === null) {
      return;
    }
    savedCallback.current = callback;
  });

  // Set up the interval.
  useEffect(() => {
    if (delay === null) {
      return;
    }
    function tick() {
      savedCallback.current !== null && savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval;
