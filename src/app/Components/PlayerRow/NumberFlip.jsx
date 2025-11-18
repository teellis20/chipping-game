import React, { useEffect, useRef, useState } from 'react';

// Two-card flip implementation. Renders front (old) and back (new) cards and
// animates front -> rotateX(-90deg), then back -> rotateX(0deg).
const NumberFlip = ({ value, duration = 700, className = '' }) => {
  const prevRef = useRef(value);
  const [frontValue, setFrontValue] = useState(value);
  const [backValue, setBackValue] = useState(value);
  const [phase, setPhase] = useState('idle'); // idle | animating
  const [flash, setFlash] = useState(false);
  const timersRef = useRef([]);

  useEffect(() => {
    if (value === prevRef.current) return;

    const half = Math.max(60, Math.floor(duration / 2));

    // prepare values
    setFrontValue(prevRef.current);
    setBackValue(value);
    setPhase('animating');

    // clear old timers
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    // end animation after full duration
    const t = setTimeout(() => {
      prevRef.current = value;
      setFrontValue(value);
      setPhase('idle');
      // trigger a brief flash on the wrapper to highlight the completed card
      setFlash(true);
      const tf = setTimeout(() => setFlash(false), 200);
      timersRef.current.push(tf);
    }, duration + 20);
    timersRef.current.push(t);

    return () => timersRef.current.forEach(clearTimeout);
  }, [value, duration]);

  useEffect(() => () => timersRef.current.forEach(clearTimeout), []);

//   const showEIfIdleZero = (v) => (phase === 'idle' && v === 0 ? 'E' : (v > 0 ? `+${v}` : `${v}`));

  const halfDuration = Math.max(60, Math.floor(duration / 2));

  return (
    <div
      className={`flip-wrapper ${className} `}
      style={{ ['--half-duration']: `${halfDuration}ms` }}
    >
      {/* front card: current visible, flips out */}
      <div className={`flip-card front ${phase === 'animating' ? 'flip-out' : ''}`}>
        {/* {showEIfIdleZero(frontValue)} */}
        {frontValue}
      </div>

      {/* back card: hidden below, flips in */}
      <div className={`flip-card back ${phase === 'animating' ? 'flip-in' : ''}`}>
        {/* {showEIfIdleZero(backValue)} */}
        {backValue}
      </div>
    </div>
  );
};

export default NumberFlip;
