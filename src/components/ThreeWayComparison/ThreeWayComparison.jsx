import React, { useRef, useState } from 'react';
import './ThreeWayComparison.css';

const ThreeWayComparison = ({ imageA, imageB, imageC }) => {
  const containerRef = useRef(null);
  const [leftWidth, setLeftWidth] = useState(33);
  const [middleWidth, setMiddleWidth] = useState(33);

  const handleMouseMove = (e, handleType) => {
    const container = containerRef.current;
    const bounds = container.getBoundingClientRect();
    const relativeX = e.clientX - bounds.left;
    const percentage = (relativeX / bounds.width) * 100;

    if (handleType === 'left' && percentage < leftWidth + middleWidth - 5) {
      setLeftWidth(Math.max(5, Math.min(percentage, 90)));
    }

    if (handleType === 'right' && percentage > leftWidth + 5 && percentage < 95) {
      setMiddleWidth(Math.max(5, Math.min(percentage - leftWidth, 90 - leftWidth)));
    }
  };

  const addMouseListeners = (type) => {
    const moveHandler = (e) => handleMouseMove(e, type);
    const upHandler = () => {
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mouseup', upHandler);
    };
    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('mouseup', upHandler);
  };

  return (
    <div className="three-way-container" ref={containerRef}>
      <div className="image-section" style={{ width: `${leftWidth}%` }}>
        <h6 className='font-bold'>2005</h6>
        <img src={imageA} alt="A" />
      </div>
      <div className="absolute inset-y-0 bg-white w-0.5 -ml-px" style={{ left: `${leftWidth}%` }}></div>
      <div
        className="h-10 w-10 -ml-5 -mt-5 rounded-full bg-white absolute top-1/2 shadow-2xl flex items-center justify-center cursor-pointer"
        onMouseDown={() => addMouseListeners('left')}
        style={{ left: `${leftWidth}%` }}
      >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-gray-400 rotate-90 transform"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
            />
          </svg>
      </div>
      <div className="image-section" style={{ width: `${middleWidth}%` }}>
        <h6 className='font-bold'>2013</h6>
        <img src={imageB} alt="B" />
      </div>
      <div className="absolute inset-y-0 bg-white w-0.5 -ml-px" style={{ left: `${leftWidth + middleWidth}%` }}></div>
      <div
        className="h-10 w-10 -ml-5 -mt-5 rounded-full bg-white absolute top-1/2 shadow-2xl flex items-center justify-center cursor-pointer"
        onMouseDown={() => addMouseListeners('right')}
        style={{ left: `${leftWidth + middleWidth}%` }}
      >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-gray-400 rotate-90 transform"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
            />
          </svg>
      </div>
      <div
        className="image-section"
        style={{ width: `${100 - leftWidth - middleWidth}%` }}
      >
        <h6 className='font-bold'>2024</h6>
        <img src={imageC} alt="C" />
      </div>
    </div>
  );
};

export default ThreeWayComparison;
