import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Main Component
export default function SutraVisualizer() {
    // --- State for Inputs ---
    const [inputs, setInputs] = useState({ rule1: "", rule2_1: "", rule2_2: "", rule3_num: "", rule3_den: "" });

    // --- State for Visualizers ---
    const [activeVisualizer, setActiveVisualizer] = useState(null);
    const [steps, setSteps] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [accumulatedAnswer, setAccumulatedAnswer] = useState("0."); // For Rule 3's appending answer

    const handleInputChange = (rule, value) => setInputs(prev => ({ ...prev, [rule]: value }));

    const resetVisualizer = () => {
        setSteps([]);
        setCurrentPage(0);
        setAccumulatedAnswer("0."); // Reset for Rule 3
    };

    // --- RULE 1: SQUARING A NUMBER ENDING IN 5 ---
    const handleVisualizeRule1 = () => {
        resetVisualizer();
        setActiveVisualizer('rule1');
        // ... (Logic for Rule 1 remains the same)
        const num = parseInt(inputs.rule1);
        if (!inputs.rule1 || isNaN(num) || num % 10 !== 5) {
            setSteps([{ type: 'error', message: "Please enter a valid number ending in 5." }]);
            return;
        }
        const precedingDigits = Math.floor(num / 10);
        const lhsResult = precedingDigits * (precedingDigits + 1);
        const rhsResult = 25;
        const finalAnswer = `${lhsResult}${rhsResult}`;
        setSteps([
            { type: 'rhs', calculation: `5 × 5`, result: rhsResult, explanation: "The Right-Hand Side (RHS) is always the square of 5." },
            { type: 'lhs', calculation: `${precedingDigits} × ${precedingDigits + 1}`, result: lhsResult, explanation: "The Left-Hand Side (LHS) is the preceding digit(s) multiplied by the next consecutive number." },
            { type: 'combine', lhs: lhsResult, rhs: rhsResult, final: finalAnswer, explanation: "Combine the LHS and RHS to get the final answer." },
        ]);
    };

    // --- RULE 2: SPECIAL MULTIPLICATION ---
    const handleVisualizeRule2 = () => {
        resetVisualizer();
        setActiveVisualizer('rule2');
        // ... (Logic for Rule 2 remains the same)
         const num1 = parseInt(inputs.rule2_1);
        const num2 = parseInt(inputs.rule2_2);
        if (isNaN(num1) || isNaN(num2)) {
            setSteps([{ type: 'error', message: "Please enter two valid numbers." }]);
            return;
        }
        const lastDigit1 = num1 % 10, lastDigit2 = num2 % 10;
        const preceding1 = Math.floor(num1 / 10), preceding2 = Math.floor(num2 / 10);
        if (lastDigit1 + lastDigit2 !== 10 || preceding1 !== preceding2) {
            setSteps([{ type: 'error', message: "Conditions not met: Last digits must sum to 10 and preceding digits must be the same." }]);
            return;
        }
        const rhsResult = lastDigit1 * lastDigit2;
        const lhsResult = preceding1 * (preceding1 + 1);
        const finalAnswer = `${lhsResult}${String(rhsResult).padStart(2, '0')}`;
        setSteps([
            { type: 'rhs', calculation: `${lastDigit1} × ${lastDigit2}`, result: String(rhsResult).padStart(2, '0'), explanation: "The RHS is the product of the last digits." },
            { type: 'lhs', calculation: `${preceding1} × ${preceding1 + 1}`, result: lhsResult, explanation: "The LHS is the common preceding digit multiplied by the next number." },
            { type: 'combine', lhs: lhsResult, rhs: String(rhsResult).padStart(2, '0'), final: finalAnswer, explanation: "Combine the results to get the final answer." },
        ]);
    };

    // --- RULE 3: DECIMAL CONVERSION ---
    const handleVisualizeRule3 = () => {
        resetVisualizer();
        setActiveVisualizer('rule3');
        // ... (Logic for Rule 3 remains the same, detecting repetition to stop the loop)
        const num = parseInt(inputs.rule3_num);
        const den = parseInt(inputs.rule3_den);
        if (isNaN(num) || isNaN(den) || den <= 0) {
            setSteps([{ type: 'error', message: "Please enter a valid numerator and denominator." }]);
            return;
        }
        if (den % 10 !== 9) {
            setSteps([{ type: 'error', message: "Not Feasible: The denominator must end in 9." }]);
            return;
        }
        const workingDivisor = Math.floor(den / 10) + 1;
        let currentDividend = num;
        const generatedSteps = [];
        const seenDividends = new Map();
        for (let i = 0; i < den; i++) {
            if (seenDividends.has(currentDividend)) {
                generatedSteps[seenDividends.get(currentDividend)].isRepeatingStart = true;
                break;
            }
            seenDividends.set(currentDividend, i);
            const quotient = Math.floor(currentDividend / workingDivisor);
            const remainder = currentDividend % workingDivisor;
            const newDividend = parseInt(`${remainder}${quotient}`);
            generatedSteps.push({
                type: 'division', dividend: currentDividend, divisor: workingDivisor,
                quotient, remainder, newDividend, explanation: `New Dividend = R(${remainder}) prefixed to Q(${quotient})`
            });
            currentDividend = newDividend;
        }
        setSteps(generatedSteps);
    };

    // Updated paginate function to handle Rule 3's appending answer
    const paginate = (direction) => {
        const newPage = currentPage + direction;
        if (newPage >= 0 && newPage < steps.length) {
            if (activeVisualizer === 'rule3') {
                if (direction > 0) {
                    setAccumulatedAnswer(prev => prev + steps[currentPage].quotient);
                } else {
                    setAccumulatedAnswer(prev => prev.slice(0, -1));
                }
            }
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="min-h-screen bg-[#f5e5c7] text-stone-800 p-6 sm:p-12 font-serif relative overflow-hidden">
            {/* Decorative Background Numbers */}
            <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
                <span className="absolute top-[5%] left-[10%] text-9xl">4</span>
                <span className="absolute top-[15%] right-[8%] text-9xl">5</span>
                <span className="absolute top-[35%] left-[20%] text-8xl">8</span>
                <span className="absolute top-[50%] right-[25%] text-9xl">2</span>
                <span className="absolute bottom-[10%] left-[5%] text-9xl">7</span>
                <span className="absolute bottom-[5%] right-[10%] text-9xl">6</span>
            </div>
            
            <div className="max-w-4xl mx-auto relative z-10">
                <section className="text-center my-8">
                    <h1 className="text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-stone-700">
                        Ekadhikena Purvena
                    </h1>
                    <p className="italic text-2xl text-amber-800 mt-2">एकाधिकेन पूर्वेण</p>
                </section>
                
                <section className="card">
                    <h2 className="card-title">What does it mean?</h2>
                    <p className="card-text">
                        The Sutra translates to "<b className="font-bold">By one more than the previous one</b>". It's a versatile mental math technique that simplifies specific calculations.
                    </p>
                </section>
                
                <section className="card">
                    <h2 className="card-title">Where can we use it?</h2>
                     <ul className="list-disc list-inside space-y-2 card-text">
                        <li><b>Application 1:</b> To find the square of any number ending in 5.</li>
                        <li><b>Application 2:</b> To multiply two numbers whose last digits sum to 10 and whose preceding digits are identical.</li>
                        <li><b>Application 3:</b> To convert a fraction with a denominator ending in 9 into a recurring decimal.</li>
                    </ul>
                </section>
                
                {/* --- Applications --- */}
                <ApplicationShell title="Application 1: Squaring Numbers Ending in 5" description="..." onVisualize={handleVisualizeRule1} isActive={activeVisualizer === 'rule1'} visualizerProps={{ steps, currentPage, paginate, visualizerId: 'rule1', accumulatedAnswer }}>
                    <input type="number" placeholder="e.g., 85" className="input-vedic w-full" value={inputs.rule1} onChange={(e) => handleInputChange('rule1', e.target.value)} />
                </ApplicationShell>
                
                <ApplicationShell title="Application 2: Special Multiplication" description="..." onVisualize={handleVisualizeRule2} isActive={activeVisualizer === 'rule2'} visualizerProps={{ steps, currentPage, paginate, visualizerId: 'rule2', accumulatedAnswer }}>
                    <div className="flex gap-4 w-full">
                        <input type="number" placeholder="Num 1 (e.g., 42)" className="input-vedic" value={inputs.rule2_1} onChange={(e) => handleInputChange('rule2_1', e.target.value)} />
                        <input type="number" placeholder="Num 2 (e.g., 48)" className="input-vedic" value={inputs.rule2_2} onChange={(e) => handleInputChange('rule2_2', e.target.value)} />
                    </div>
                </ApplicationShell>

                <ApplicationShell title="Application 3: Decimal Conversion" description="..." onVisualize={handleVisualizeRule3} isActive={activeVisualizer === 'rule3'} visualizerProps={{ steps, currentPage, paginate, visualizerId: 'rule3', accumulatedAnswer }}>
                    <div className="flex gap-4 w-full">
                        <input type="number" placeholder="Numerator (e.g., 4)" className="input-vedic" value={inputs.rule3_num} onChange={(e) => handleInputChange('rule3_num', e.target.value)} />
                        <input type="number" placeholder="Denominator (e.g., 89)" className="input-vedic" value={inputs.rule3_den} onChange={(e) => handleInputChange('rule3_den', e.target.value)} />
                    </div>
                </ApplicationShell>
            </div>
        </div>
    );
}

function ApplicationShell({ title, description, children, onVisualize, isActive, visualizerProps }) {
    return (
        <section className="mb-12">
            <div className="card">
                <h3 className="card-title">{title}</h3>
                <div className="flex flex-col items-center">
                    {children}
                    <button onClick={onVisualize} className="button-vedic mt-6">{isActive ? "Visualize Again" : "Visualize"}</button>
                </div>
                <AnimatePresence>{isActive && <VisualizerStage key={visualizerProps.visualizerId} {...visualizerProps} />}</AnimatePresence>
            </div>
        </section>
    );
}

function VisualizerStage({ steps, currentPage, paginate, visualizerId, accumulatedAnswer }) {
    if (!steps || steps.length === 0) return null;
    const currentStep = steps[currentPage];

    // --- Answer Rendering Logic ---
    const AnswerDisplay = () => {
        if (visualizerId === 'rule3') {
             return (
                 <div className="font-mono text-4xl mt-2 p-2 bg-amber-100/50 rounded-lg inline-block tracking-widest text-stone-800 break-all">
                     {accumulatedAnswer}
                     <motion.span layoutId={`q-${currentPage}`} className="text-orange-600 font-extrabold">{currentStep.quotient}</motion.span>
                 </div>
             );
        } else {
            const finalAnswer = (currentPage === steps.length - 1 && currentStep.type === 'combine') ? currentStep.final : "";
            return (
                <div className="font-mono text-5xl mt-8 p-2 text-stone-800 h-full flex items-center justify-center">
                    {finalAnswer && <motion.span layoutId="final-answer">{finalAnswer}</motion.span>}
                </div>
            );
        }
    };

    return (
        <motion.div initial={{ opacity: 0, height: 0, marginTop: 0 }} animate={{ opacity: 1, height: 'auto', marginTop: '2.5rem' }} exit={{ opacity: 0, height: 0, marginTop: 0 }} className="w-full bg-amber-100 rounded-2xl shadow-inner border border-amber-300/50 p-6 relative min-h-[450px] flex flex-col overflow-hidden">
            {currentStep.type === 'error' ? (
                <div className="m-auto text-center"><h3 className="text-3xl font-bold text-red-600">Input Error</h3><p className="text-xl mt-2">{currentStep.message}</p></div>
            ) : (
                <>
                    <div className="text-center mb-6 h-24"><p className="text-lg text-amber-800">Result</p><AnswerDisplay /></div>
                    <div className="flex-grow flex items-center justify-center relative h-64">
                        <AnimatePresence mode="wait"><motion.div key={currentPage} initial={{ opacity: 0, x: 200 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -200 }} transition={{ duration: 0.5, ease: "easeInOut" }} className="w-full h-full absolute flex flex-col items-center justify-center p-4"><StepContent step={currentStep} page={currentPage} steps={steps}/></motion.div></AnimatePresence>
                    </div>
                    <div className="flex justify-between items-center mt-6">
                        <button onClick={() => paginate(-1)} disabled={currentPage === 0} className="nav-button-vedic"><ChevronLeft size={24}/> Previous</button>
                        <span className="text-lg text-amber-800">Step {currentPage + 1} / {steps.length}</span>
                        <button onClick={() => paginate(1)} disabled={currentPage >= steps.length - 1} className="nav-button-vedic">Next <ChevronRight size={24}/></button>
                    </div>
                </>
            )}
        </motion.div>
    );
}

function StepContent({ step, page, steps }) {
    const commonMotionProps = { initial:{opacity: 0}, animate:{opacity: 1}, transition:{delay: 0.2} };

    if (step.type === 'rhs' || step.type === 'lhs') {
        const isRHS = step.type === 'rhs';
        return (
            <div className="text-center">
                <p className="text-2xl text-amber-800 mb-4">{isRHS ? "Step 1: Right-Hand Side" : "Step 2: Left-Hand Side"}</p>
                <motion.div {...commonMotionProps} className="flex items-center justify-center gap-6 text-4xl font-mono">
                    <span>{step.calculation}</span><span>=</span><motion.span layoutId={isRHS ? 'rhs-result' : 'lhs-result'} className={`font-extrabold ${isRHS ? 'text-teal-600' : 'text-orange-600'}`}>{step.result}</motion.span>
                </motion.div>
                <motion.p {...commonMotionProps} transition={{delay: 1}} className="text-lg mt-8 text-stone-700">{step.explanation}</motion.p>
            </div>
        );
    }
    if (step.type === 'combine') {
        const prevLHS = steps[page-1].result; const prevRHS = steps[page-2].result;
        return (
            <div className="text-center">
                 <p className="text-2xl text-amber-800 mb-4">Step 3: Combine Results</p>
                 <div className="flex items-center justify-center gap-4 text-5xl font-mono font-extrabold">
                     <motion.span layoutId="lhs-result" className="text-orange-600">{prevLHS}</motion.span><motion.span layoutId="rhs-result" className="text-teal-600">{prevRHS}</motion.span>
                 </div>
                 <motion.p {...commonMotionProps} transition={{delay: 1.5}} className="text-lg mt-8 text-stone-700">{step.explanation}</motion.p>
            </div>
        );
    }
    if (step.type === 'division') {
         return (
            <div className="text-center">
                {step.isRepeatingStart && <motion.p {...commonMotionProps} className="text-green-600 font-bold text-lg mb-4">Repetition Detected! The sequence now repeats.</motion.p>}
                <motion.div {...commonMotionProps} className="flex items-center justify-center gap-4 sm:gap-6 text-3xl sm:text-4xl font-mono">
                    <span>{step.dividend} ÷ {step.divisor}</span><span className="text-amber-700">=</span><span layoutId={`q-${page}`} className="text-orange-600 font-extrabold">{step.quotient}</span><span className="text-sm text-amber-800">(Q)</span><span className="text-amber-700">...</span><span className="text-teal-600 font-extrabold">{step.remainder}</span><span className="text-sm text-amber-800">(R)</span>
                </motion.div>
                <motion.div {...commonMotionProps} transition={{delay: 1.2}} className="mt-12 text-xl">
                     <p className="text-amber-800 mb-2">{step.explanation}</p><div className="flex items-center justify-center font-mono text-3xl p-3 bg-amber-100/50 rounded-lg text-stone-800 font-extrabold">{step.newDividend}</div>
                </motion.div>
            </div>
        );
    }
    return null;
}