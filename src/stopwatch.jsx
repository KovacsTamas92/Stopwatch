import { useRef, useState } from "react";

const Stopwatch = () => {
  const [startTime, setStartTime] = useState(null);
  const [lapStartTime, setLapStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const [lapTimes, setLapTimes] = useState([]);

  const intervalRef = useRef(null);

  const handleStart = () => {
    if (startTime != null && now != null) {
      const totalMsPassed = now - startTime;
      setStartTime(Date.now() - totalMsPassed);

      const lapMsPassed = now - lapStartTime;
      setLapStartTime(Date.now() - lapMsPassed);
    } else {
      setStartTime(Date.now());
      setLapStartTime(Date.now());
    }
    setNow(Date.now());

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  };

  const handleClear = () => {
    clearInterval(intervalRef.current);

    setStartTime(null);
    setLapStartTime(null);
    setNow(null);
    setLapTimes([]);
    setZIndex(-1);
  };

  const handleStop = () => {
    clearInterval(intervalRef.current);
  };

  let totalSecondsPassed = 0;
  let lapSecondsPassed = 0;
  if (startTime != null && lapStartTime != null && now != null) {
    totalSecondsPassed = (now - startTime) / 1000;
    lapSecondsPassed = (now - lapStartTime) / 1000;
  }

  const [zIndex, setZIndex] = useState(-1);

  const handleLap = () => {
    setLapTimes([...lapTimes, lapSecondsPassed]);
    setLapStartTime(Date.now());
    setNow(Date.now());
    setZIndex((x) => x + 1);
  };

  return (
    <div className="w-full h-full flex items-center justify-center   ">
      <div className="h-14 bg-gradient-to-r from-cyan-500 to-blue-500 w-96 h-80 flex items-center flex-col justify-center rounded-xl">
        <div className="flex items-center justify-center m-6">
          <h1 className="text-6xl">{totalSecondsPassed.toFixed(3)}</h1>
        </div>
        <div className="text-base flex items-center justify-center m-6 ">
          <h2>Lap: {lapSecondsPassed.toFixed(3)}</h2>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="m-3 border-2 text-center rounded-lg px-4 py-3 m-2 bg-gradient-to-r from-sky-500 to-indigo-500 font-bold text-lg"
            onClick={handleStart}
          >
            Start
          </button>
          <button
            className="m-3 border-2 text-center rounded-lg px-4 py-3 m-2 bg-gradient-to-r from-sky-500 to-indigo-500 font-bold text-lg"
            onClick={handleStop}
          >
            Stop
          </button>
          <button
            className="m-3 border-2 text-center rounded-lg px-4 py-3 m-2 bg-gradient-to-r from-sky-500 to-indigo-500 font-bold text-lg"
            onClick={handleClear}
          >
            Clear
          </button>
          {startTime != null && now != null && (
            <button
              className="m-3 border-2 text-center rounded-lg px-4 py-3 m-2 bg-gradient-to-r from-sky-500 to-indigo-500 font-bold text-lg"
              onClick={handleLap}
            >
              Lap
            </button>
          )}
        </div>
        <div
          id="laps"
          className="overflow-scroll w-32 "
          style={{ zIndex: zIndex }}
        >
          {lapTimes.map((lapTime, index) => {
            return (
              <p>
                {index + 1}. lap: <i>{lapTime.toFixed(3)}</i>
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;
