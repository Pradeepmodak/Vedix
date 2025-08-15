import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import Lucide React icons
// You'll need to install lucide-react if you haven't already: npm install lucide-react
import { Play, Pause } from 'lucide-react';

export default function SutraVisualizer() {
  const fullTitle = "Sutra 1: Ekadhikena Purvena";

  const [inputNumber, setInputNumber] = useState("");
  const [steps, setSteps] = useState([]);
  const [showSwiper, setShowSwiper] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [animationState, setAnimationState] = useState({});
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const swiperRef = useRef(null);
const [displayedTitle, setDisplayedTitle] = useState("");

useEffect(() => {
  let index = 0;
  let typingTimer;
  let resetTimer;

  const typeCharacter = () => {
    if (index < fullTitle.length) {
      setDisplayedTitle(fullTitle.slice(0, index + 1)); // avoids stale state
      index++;
      typingTimer = setTimeout(typeCharacter, 100);
    } else {
      resetTimer = setTimeout(() => {
        setDisplayedTitle("");
        index = 0;
        typeCharacter();
      }, 3000);
    }
  };

  typeCharacter();

  return () => {
    clearTimeout(typingTimer);
    clearTimeout(resetTimer);
  };
}, []);


  const handleVisualize = () => {
    const num = parseInt(inputNumber);
    if (!inputNumber || isNaN(num) || num % 10 !== 5) {
      setAlertMessage("Please enter a number ending in 5 to visualize this sutra!");
      setShowAlertModal(true);
      return;
    }

    const lastDigit = num % 10;
    const remainingDigits = Math.floor(num / 10);
    const nextNumber = remainingDigits + 1;
    const step2Result = remainingDigits * nextNumber;
    const finalAnswer = `${step2Result}${lastDigit * lastDigit}`;

    // Define the initial introductory step
    const introStep = {
      title: "Introduction to Ekadhikena Purvena Sutra",
      visuals: [
        { type: 'text', value: `This visualization demonstrates the 'Ekadhikena Purvena' Sutra.` },
        { type: 'text', value: `It's primarily used for squaring numbers that end with the digit 5.` },
        { type: 'text', value: `For example, we will calculate the square of ${num}.` },
        { type: 'text', value: `The process involves two main parts: the Right-Hand Side (RHS) and the Left-Hand Side (LHS) of the final answer.` },
      ],
      explanation: `The 'Ekadhikena Purvena' Sutra, meaning "By one more than the previous", simplifies specific multiplication problems, especially squaring numbers ending in 5. This method divides the problem into simpler, easily calculable parts.`
    };

    // Define the calculation steps
    const calculationSteps = [
      {
        title: "Step 1: The Right-hand side (RHS)",
        visuals: [
          { type: 'text', value: `Multiply the last digit by itself.` },
          { type: 'number', value: lastDigit, label: `Last Digit` },
          { type: 'operator', value: '×' },
          { type: 'number', value: lastDigit, label: `Last Digit` },
          { type: 'operator', value: '=' },
          { type: 'result', value: 25, label: `RHS Result` },
        ],
        solution: "25",
        explanation: `The right-hand side of our answer is always 25 when squaring a number ending in 5. This is simply ${lastDigit} multiplied by ${lastDigit}.`
      },
      {
        title: "Step 2: The Left-hand side (LHS)",
        visuals: [
          { type: 'text', value: `Multiply the preceding digits by 'one more than the previous'.` },
          { type: 'number', value: remainingDigits, label: `Preceding Digits` },
          { type: 'operator', value: '×' },
          { type: 'number', value: nextNumber, label: `(${remainingDigits}+1)` },
          { type: 'operator', value: '=' },
          { type: 'result', value: step2Result, label: `LHS Result` },
        ],
        solution: step2Result,
        previousSolution: 25,
        explanation: `For the left-hand side, take the digits before the '5' (${remainingDigits}) and multiply them by the number that is one greater than them (${nextNumber}). This gives us ${step2Result}.`
      },
      {
        title: "Step 3: Combine the results",
        visuals: [
          { type: 'text', value: `Place the Left-hand side result before the Right-hand side result.` },
          { type: 'combine', value1: step2Result, value2: 25, final: finalAnswer }
        ],
        solution: finalAnswer,
        explanation: `Finally, simply place the result from the left-hand side (${step2Result}) in front of the right-hand side result (25). This gives us the complete square: ${finalAnswer}.`
      }
    ];

    setSteps([introStep, ...calculationSteps]); // Combine intro step with calculation steps
    setShowSwiper(true);
    setCurrentStepIndex(0);
    setAnimationState({});
    setIsPlaying(true); // Start playing when visualize is clicked
    if (swiperRef.current) {
      setTimeout(() => swiperRef.current.slideTo(0, 500), 100);
    }
  };

  // Effect for animating elements within a step and auto-advancing slides
  useEffect(() => {
    let timers = [];
    if (steps.length > 0 && showSwiper && isPlaying) {
      const currentVisuals = steps[currentStepIndex].visuals;
      setAnimationState({}); // Reset animation state for the new slide

      let delay = 0;
      currentVisuals.forEach((visual, index) => {
        const timer = setTimeout(() => {
          setAnimationState(prev => ({ ...prev, [`item-${index}`]: true }));
        }, delay);
        timers.push(timer);
        delay += (visual.type === 'text' ? 900 : 1200); // Slower delay for all elements
      });

      // After all animations in the current slide complete, move to the next slide
      const nextSlideTimer = setTimeout(() => {
        if (swiperRef.current) {
          if (currentStepIndex < steps.length - 1) {
            swiperRef.current.slideNext();
          } else {
            // Loop back to the first slide after a delay
            swiperRef.current.slideTo(0);
          }
        }
      }, delay + 3500); // Increased pause before moving to next slide
      timers.push(nextSlideTimer);
    }

    // Cleanup timers when component unmounts or dependencies change
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [currentStepIndex, steps, showSwiper, isPlaying]); // Added isPlaying to dependencies

  const handleSlideChange = (swiper) => {
    setCurrentStepIndex(swiper.activeIndex);
    setAnimationState({}); // Reset animation state for the new slide
    setIsPlaying(true); // Auto-play the new slide when navigated
  };

  const getVisualContent = (visual, index) => {
    switch (visual.type) {
      case 'text':
        return (
          <motion.p
            key={index}
            className="text-lg sm:text-xl md:text-2xl my-2 w-full text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {visual.value}
          </motion.p>
        );
      case 'number':
        return (
          <motion.div
            key={index}
            className="flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-yellow-300 text-brown-800 font-bold text-4xl sm:text-5xl shadow-md p-2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {visual.value}
            {visual.label && <span className="text-xs sm:text-sm mt-1 font-normal text-brown-600">{visual.label}</span>}
          </motion.div>
        );
      case 'operator':
        return (
          <motion.div
            key={index}
            className="text-brown-800 font-extrabold text-4xl sm:text-5xl mx-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {visual.value}
          </motion.div>
        );
      case 'result':
        return (
          <motion.div
            key={index}
            className="flex flex-col items-center justify-center h-20 px-6 sm:h-24 sm:px-8 rounded-full bg-green-300 text-brown-800 font-bold text-4xl sm:text-5xl shadow-lg p-2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {visual.value}
            {visual.label && <span className="text-xs sm:text-sm mt-1 font-normal text-brown-700">{visual.label}</span>}
          </motion.div>
        );
      case 'combine':
        return (
          <motion.div
            key={index}
            className="flex flex-col items-center justify-center text-brown-800 font-bold text-6xl sm:text-7xl mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <p className="text-yellow-600">{visual.value1}</p>
            <p className="text-green-600 -mt-2">{visual.value2}</p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="text-brown-900 font-extrabold text-7xl sm:text-8xl mt-4 border-b-4 border-yellow-500 pb-2"
            >
              = {visual.final}
            </motion.p>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col items-center text-brown-900 bg-amber-100 p-6 font-sans">
      {/* Application Title */}
      {/* Sutra Section - Highlighted Block */}
      <div className="bg-yellow-200 bg-opacity-90 rounded-2xl shadow-lg p-6 mt-8 max-w-4xl w-full text-center border-4 border-yellow-300">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-brown-800 min-h-[50px] flex items-center justify-center">
          {displayedTitle}
        </h1>
        <p className="italic text-xl sm:text-2xl text-brown-700 mt-2">एकाधिकेन पूर्वेण</p>
        <p className="mt-4 text-brown-800 text-base sm:text-lg leading-relaxed">
          This powerful Sutra translates to "<b className="font-bold">By one more than the previous</b>". It's a quick method to solve specific multiplication and division problems.
        </p>
      </div>

      {/* Rules Section - Highlighted Block */}
      <div className="bg-yellow-100 bg-opacity-90 rounded-2xl shadow-md p-4 mt-6 max-w-3xl w-full text-base sm:text-lg border-2 border-yellow-200">
        <h2 className="text-2xl sm:text-3xl font-bold text-brown-800 mb-2 text-center">Rules of Application:</h2>
        <ul className="list-disc list-inside space-y-2 text-brown-800">
          <li className="font-medium">
            To find the <b className="font-bold">square of any number ending with 5</b> (e.g., 25², 75²).
          </li>
          <li className="font-medium">
            Finding the product of two numbers whose unit digits sum to 10 and the remaining digits are the same.
          </li>
          <li className="font-medium">
          To convert a fraction whose denominator ends in 9 into a decimal.
          </li>
        </ul>
      </div>

      {/* Input Section */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8 items-center">
        <input
          type="number"
          placeholder="Enter a number ending with 5 (e.g., 35)"
          className="border border-yellow-400 rounded-lg px-4 py-2 w-72 text-center text-lg sm:text-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-brown-400"
          value={inputNumber}
          onChange={(e) => setInputNumber(e.target.value)}
        />
        <button
          onClick={handleVisualize}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105 active:scale-95 text-xl font-semibold tracking-wide"
        >
          Visualize Steps
        </button>
      </div>

      {/* Steps Slider */}
      <AnimatePresence>
        {showSwiper && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-4/5 lg:w-3/4 xl:w-2/3 mt-10 mx-auto overflow-hidden relative" // Added overflow-hidden and relative
          >
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={handleSlideChange}
              className="bg-white bg-opacity-95 rounded-2xl shadow-xl p-6 border-4 border-yellow-100"
              style={{ height: 'auto', minHeight: '550px', maxHeight: '750px' }} // Adjusted height for more content and padding
            >
              {steps.map((step, idx) => (
                <SwiperSlide key={idx}>
                  <motion.div
                    className="text-center text-xl sm:text-2xl font-semibold text-brown-800 flex flex-col items-center justify-center p-4 h-full"
                    key={currentStepIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-yellow-600 font-bold text-3xl sm:text-4xl mb-4">{step.title}</h3>
                    <div className="flex items-center justify-center flex-wrap gap-4 my-4 flex-grow"> {/* Added flex-grow */}
                      {step.visuals.map((visual, visualIdx) => {
                        // Only render if animationState for this item is true
                        if (animationState[`item-${visualIdx}`]) {
                          return getVisualContent(visual, visualIdx);
                        }
                        return null; // Don't render if not animated yet
                      })}
                    </div>
                    {/* Display Explanation Text */}
                    {step.explanation && (
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (steps[currentStepIndex].visuals.filter(v => typeof v !== 'string' && v.type !== 'text').length * 1.2) + 1, duration: 0.8 }}
                        className="text-lg sm:text-xl text-brown-700 max-w-prose mx-auto mt-4 leading-relaxed"
                      >
                        {step.explanation}
                      </motion.p>
                    )}
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
            {/* Pause/Resume Icon Button */}
            <button
              onClick={() => setIsPlaying(prev => !prev)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white shadow-md transition-colors"
              aria-label={isPlaying ? 'Pause animation' : 'Resume animation'}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Alert Modal */}
      <AnimatePresence>
        {showAlertModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4"
          >
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full text-center border-4 border-yellow-400">
              <h3 className="text-2xl font-bold text-red-600 mb-4">Input Error!</h3>
              <p className="text-lg text-gray-800 mb-6">{alertMessage}</p>
              <button
                onClick={() => setShowAlertModal(false)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105 active:scale-95 text-lg font-semibold"
              >
                Got It!
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
