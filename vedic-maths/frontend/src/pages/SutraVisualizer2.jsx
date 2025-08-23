import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { useTranslation } from "react-i18next"; // 👈 Import the hook

// Main Component
export default function Sutra2Nikhilam() {
    const { t } = useTranslation(); // 👈 Use the hook

    // --- State for Inputs ---
    const [inputs, setInputs] = useState({ app1_base: "", app1_num: "", app2_num1: "", app2_num2: "" });

    // --- State for Visualizer ---
    const [activeVisualizer, setActiveVisualizer] = useState(null);
    const [steps, setSteps] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    const handleInputChange = (inputName, value) => {
        setInputs(prev => ({ ...prev, [inputName]: value }));
    };

    const resetVisualizer = () => {
        setSteps([]);
        setCurrentPage(0);
    };

    // --- Logic for Application 1: Nikhilam Subtraction ---
    const handleVisualizeSubtraction = () => {
        resetVisualizer();
        setActiveVisualizer('app1');
        const base = parseInt(inputs.app1_base);
        const num = parseInt(inputs.app1_num);

        if (isNaN(base) || isNaN(num)) {
            setSteps([{ type: 'error', message: t("error_valid_base_number") }]); // 👈 Translated
            return;
        }
        // Validate if the base is a power of 10
        if (base <= 0 || Math.log10(base) % 1 !== 0) {
            setSteps([{ type: 'error', message: t("error_base_power_of_10") }]); // 👈 Translated
            return;
        }
        if (num >= base) {
            setSteps([{ type: 'error', message: t("error_number_smaller_than_base") }]); // 👈 Translated
            return;
        }

        const numStr = String(num).padStart(String(base).length - 1, '0');
        const generatedSteps = [{ type: 'sub_base', num, base }];

        const digits = numStr.split('').map(Number);
        let deficiency = "";

        digits.forEach((digit, index) => {
            const isLast = index === digits.length - 1;
            const from = isLast ? 10 : 9;
            const result = from - digit;
            deficiency += result;
            generatedSteps.push({ type: 'sub_step', digit, from, result, isLast, index: index + 1 });
        });

        generatedSteps.push({ type: 'sub_combine', num, base, deficiency: parseInt(deficiency) });
        setSteps(generatedSteps);
    };

    // --- Logic for Application 2: Nikhilam Multiplication ---
    const handleVisualizeMultiplication = () => {
        resetVisualizer();
        setActiveVisualizer('app2');
        const num1 = parseInt(inputs.app2_num1);
        const num2 = parseInt(inputs.app2_num2);

        if (isNaN(num1) || isNaN(num2)) {
            setSteps([{ type: 'error', message: t("error_valid_two_numbers") }]); // 👈 Translated
            return;
        }

        const len1 = String(num1).length;
        const len2 = String(num2).length;
        const candidateBases = new Set([Math.pow(10, len1 - 1), Math.pow(10, len1), Math.pow(10, len2 - 1), Math.pow(10, len2)]);
        let bestBase = -1;
        let minDifference = Infinity;

        for (const b of candidateBases) {
            if (b === 0) continue;
            const totalDifference = Math.abs(num1 - b) + Math.abs(num2 - b);
            if (totalDifference < minDifference) {
                minDifference = totalDifference;
                bestBase = b;
            }
        }

        const base = bestBase;
        const numZeros = String(base).length - 1;
        const generatedSteps = [{ type: 'base', num1, num2, base }];
        const def1 = num1 - base;
        const def2 = num2 - base;
        generatedSteps.push({ type: 'deficiency', num1, num2, def1, def2 });
        const rhsRaw = def1 * def2;
        generatedSteps.push({ type: 'rhs', def1, def2, result: rhsRaw });

        let rhsFinal = String(Math.abs(rhsRaw));
        let carryOver = 0;
        if (rhsRaw >= 0) {
            if (rhsFinal.length > numZeros) {
                carryOver = parseInt(rhsFinal.slice(0, -numZeros));
                rhsFinal = rhsFinal.slice(-numZeros);
            } else {
                rhsFinal = rhsFinal.padStart(numZeros, '0');
            }
            generatedSteps.push({ type: 'rhs_adjust', raw: rhsRaw, final: rhsFinal, carry: carryOver, numZeros });
            const lhsRaw = num1 + def2;
            const lhsFinal = lhsRaw + carryOver;
            generatedSteps.push({ type: 'lhs', num1, num2, def1, def2, result: lhsRaw, carry: carryOver, final: lhsFinal });
            const finalAnswer = `${lhsFinal}${rhsFinal}`;
            generatedSteps.push({ type: 'combine', lhs: lhsFinal, rhs: rhsFinal, final: finalAnswer });
        } else {
            const lhsRaw = num1 + def2;
            const lhsFinal = lhsRaw - 1;
            const rhsVinculum = base - Math.abs(rhsRaw);
            const finalAnswer = `${lhsFinal}${String(rhsVinculum).padStart(numZeros, '0')}`;
            generatedSteps.push({ type: 'vinculum_intro', lhs: lhsRaw, rhs: rhsRaw });
            generatedSteps.push({ type: 'vinculum_process', lhsRaw, base, rhsRaw, lhsFinal, rhsFinal: String(rhsVinculum).padStart(numZeros, '0') });
            generatedSteps.push({ type: 'combine', lhs: lhsFinal, rhs: String(rhsVinculum).padStart(numZeros, '0'), final: finalAnswer });
        }
        setSteps(generatedSteps);
    };

    const paginate = (direction) => {
        setCurrentPage(prev => Math.max(0, Math.min(steps.length - 1, prev + direction)));
    };

    return (
        <div className="min-h-screen bg-[#f5e5c7] text-stone-800 p-6 sm:p-12 font-serif relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
                <span className="absolute top-[10%] left-[15%] text-9xl">3</span><span className="absolute top-[20%] right-[10%] text-9xl">7</span><span className="absolute bottom-[15%] left-[20%] text-9xl">9</span><span className="absolute bottom-[25%] right-[15%] text-9xl">1</span>
            </div>
            <div className="max-w-4xl mx-auto relative z-10">
                <section className="text-center my-10">
<h1 className="text-4xl sm:text-6xl font-bold text-amber-800">
    {t("sutra2_title")}
</h1>

                </section>

                <section className="card">
                    <h2 className="card-title">{t("sutra2_meaning_title")}</h2> {/* 👈 Translated */}
                    <p className="card-text">
                        {t("sutra2_meaning_text_part1")}
                        <b className="font-bold">{t("sutra2_meaning_text_part2")}</b> {/* 👈 Translated */}
                        {t("sutra2_meaning_text_part3")} {/* 👈 Translated */}
                    </p>
                </section>

                {/* --- Application 1: Subtraction (Interactive) --- */}
                <ApplicationShell
                    title={t("app1_subtraction_title")} // 👈 Translated
                    onVisualize={handleVisualizeSubtraction}
                    isActive={activeVisualizer === 'app1'}
                    visualizerProps={{ steps, currentPage, paginate }}
                >
                    <div className="flex gap-4 w-full">
                        <input
                            type="number"
                            placeholder={t("app1_placeholder_base")} // 👈 Translated
                            className="input-vedic"
                            value={inputs.app1_base}
                            onChange={(e) => handleInputChange('app1_base', e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder={t("app1_placeholder_number")} // 👈 Translated
                            className="input-vedic"
                            value={inputs.app1_num}
                            onChange={(e) => handleInputChange('app1_num', e.target.value)}
                        />
                    </div>
                </ApplicationShell>

                {/* --- Application 2: Multiplication (Interactive) --- */}
                <ApplicationShell
                    title={t("app2_multiplication_title")} // 👈 Translated
                    onVisualize={handleVisualizeMultiplication}
                    isActive={activeVisualizer === 'app2'}
                    visualizerProps={{ steps, currentPage, paginate }}
                >
                    <div className="flex gap-4 w-full">
                        <input
                            type="number"
                            placeholder={t("app2_placeholder_num1")} // 👈 Translated
                            className="input-vedic"
                            value={inputs.app2_num1}
                            onChange={(e) => handleInputChange('app2_num1', e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder={t("app2_placeholder_num2")} // 👈 Translated
                            className="input-vedic"
                            value={inputs.app2_num2}
                            onChange={(e) => handleInputChange('app2_num2', e.target.value)}
                        />
                    </div>
                </ApplicationShell>
            </div>
        </div>
    );
}

// --- Reusable Components ---
function ApplicationShell({ title, children, onVisualize, isActive, visualizerProps }) {
    const { t } = useTranslation(); // 👈 Use the hook

    return (
        <section className="mb-12">
            <div className="card">
                <h3 className="card-title">{title}</h3>
                <div className="flex flex-col items-center">
                    {children}
                    <button onClick={onVisualize} className="button-vedic mt-6">
                        {isActive ? t("visualize_again") : t("visualize_button")} {/* 👈 Translated */}
                    </button>
                </div>
                <AnimatePresence>{isActive && <VisualizerStage {...visualizerProps} />}</AnimatePresence>
            </div>
        </section>
    );
}

function VisualizerStage({ steps, currentPage, paginate }) {
    const { t } = useTranslation(); // 👈 Use the hook

    if (!steps || steps.length === 0) return null;
    const currentStep = steps[currentPage];
    const finalAnswer = (currentPage === steps.length - 1 && (currentStep.type === 'combine' || currentStep.type === 'sub_combine')) ? currentStep.final || currentStep.deficiency : "";

    return (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto', marginTop: '2.5rem' }} exit={{ opacity: 0, height: 0 }} className="w-full bg-amber-100 rounded-2xl shadow-inner border border-amber-300/50 p-6 relative min-h-[450px] flex flex-col overflow-hidden">
            {currentStep.type === 'error' ? (
                <div className="m-auto text-center">
                    <h3 className="text-3xl font-bold text-red-600">{t("error_input_title")}</h3> {/* 👈 Translated */}
                    <p className="text-xl mt-2">{currentStep.message}</p>
                </div>
            ) : (
                <>
                    <div className="text-center mb-6 h-24">
                        <p className="text-lg text-amber-800">{t("result")}</p> {/* 👈 Translated */}
                        <div className="font-mono text-5xl mt-8 p-2 text-stone-800 h-full flex items-center justify-center">
                            {finalAnswer && <motion.span layoutId="final-answer">{finalAnswer}</motion.span>}
                        </div>
                    </div>
                    <div className="flex-grow flex items-center justify-center relative h-64">
                        <AnimatePresence mode="wait"><motion.div key={currentPage} className="w-full h-full absolute flex flex-col items-center justify-center p-4"><StepContent step={currentStep} /></motion.div></AnimatePresence>
                    </div>
                    <div className="flex justify-between items-center mt-6">
                        <button onClick={() => paginate(-1)} disabled={currentPage === 0} className="nav-button-vedic">
                            <ChevronLeft size={24} /> {t("previous")} {/* 👈 Translated */}
                        </button>
                        <span className="text-lg text-amber-800">
                            {t("step")} {currentPage + 1} / {steps.length} {/* 👈 Translated */}
                        </span>
                        <button onClick={() => paginate(1)} disabled={currentPage >= steps.length - 1} className="nav-button-vedic">
                            {t("next")} <ChevronRight size={24} /> {/* 👈 Translated */}
                        </button>
                    </div>
                </>
            )}
        </motion.div>
    );
}

function StepContent({ step }) {
    const { t } = useTranslation(); // 👈 Use the hook

    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.3 } } };
    const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
    const popVariants = { hidden: { opacity: 0, scale: 0.5 }, visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 10 } } };

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="text-center w-full">
            <motion.p variants={itemVariants} className="text-2xl text-amber-800 mb-4">
                {
                    {
                        'sub_base': t("step1_identify_sub"), // 👈 Translated
                        'sub_step': t("step2_all_from_9_last_from_10"), // 👈 Translated
                        'sub_combine': t("step3_final_deficiency"), // 👈 Translated
                        'base': t("step1_find_best_base"), // 👈 Translated
                        'deficiency': t("step2_find_deficiencies"), // 👈 Translated
                        'rhs': t("step3_calculate_rhs"), // 👈 Translated
                        'rhs_adjust': t("step4_adjust_rhs"), // 👈 Translated
                        'lhs': t("step5_cross_add_lhs"), // 👈 Translated
                        'vinculum_intro': t("special_case_negative_rhs"), // 👈 Translated
                        'vinculum_process': t("vinculum_process"), // 👈 Translated
                        'combine': t("final_step_combine") // 👈 Translated
                    }[step.type]
                }
            </motion.p>

            {
                {
                    'sub_base': (
                        <motion.div variants={itemVariants} className="font-mono text-3xl space-y-4">
                            <p>{t("sub_base_description", { num: step.num, base: step.base })}</p> {/* 👈 Translated with interpolation */}
                        </motion.div>
                    ),
                    'sub_step': (
                        <motion.div variants={itemVariants} className="font-mono text-3xl space-y-4">
                            <p className="text-xl">{step.isLast ? t("sub_step_last_digit", { digit: step.digit }) : t("sub_step_digit", { index: step.index, digit: step.digit })}</p> {/* 👈 Translated with interpolation */}
                            <div className="flex items-center justify-center gap-4 text-4xl">
                                <motion.span variants={itemVariants}>{step.from} - {step.digit}</motion.span>
                                <motion.span variants={itemVariants}>=</motion.span>
                                <motion.span variants={popVariants} className="font-extrabold text-orange-600">{step.result}</motion.span>
                            </div>
                        </motion.div>
                    ),
                    'sub_combine': (
                        <motion.div variants={itemVariants} className="font-mono text-3xl space-y-4">
                            <p>{t("sub_combine_description", { num: step.num, base: step.base })}</p> {/* 👈 Translated with interpolation */}
                            <p className="text-5xl font-bold text-red-600">{step.deficiency}</p>
                        </motion.div>
                    ),
                    'base': (
                        <motion.div variants={itemVariants} className="font-mono text-3xl space-y-4">
                            <p>{t("base_description_part1", { num1: step.num1, num2: step.num2 })}</p> {/* 👈 Translated with interpolation */}
                            <p>{t("base_description_part2")}<motion.span variants={popVariants} className="p-2 bg-amber-200 rounded-md font-bold">{step.base}</motion.span>.</p> {/* 👈 Translated with interpolation */}
                        </motion.div>
                    ),
                    'deficiency': (
                        <motion.div variants={itemVariants} className="flex justify-center items-center gap-8 font-mono text-4xl">
                            <motion.div variants={itemVariants} className="flex flex-col items-center"><p>{step.num1}</p><motion.p variants={popVariants} className={`font-bold ${step.def1 >= 0 ? 'text-green-600' : 'text-red-600'}`}>{step.def1 > 0 ? '+' : ''}{step.def1}</motion.p></motion.div>
                            <motion.p variants={itemVariants} className="text-2xl">×</motion.p>
                            <motion.div variants={itemVariants} className="flex flex-col items-center"><p>{step.num2}</p><motion.p variants={popVariants} className={`font-bold ${step.def2 >= 0 ? 'text-green-600' : 'text-red-600'}`}>{step.def2 > 0 ? '+' : ''}{step.def2}</motion.p></motion.div>
                        </motion.div>
                    ),
                    'rhs': (
                        <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 text-4xl font-mono">
                            <motion.span variants={itemVariants}>{t("rhs_calculation", { def1: step.def1, def2: step.def2 })}</motion.span> {/* 👈 Translated with interpolation */}
                            <motion.span variants={itemVariants}>=</motion.span>
                            <motion.span variants={popVariants} className="font-extrabold text-orange-600">{step.result}</motion.span>
                        </motion.div>
                    ),
                    'rhs_adjust': (
                        <motion.div variants={itemVariants} className="font-mono text-3xl space-y-4">
                            <p>{t("rhs_adjust_description_part1", { raw: step.raw, numZeros: step.numZeros })}</p> {/* 👈 Translated with interpolation */}
                            <p>{t("rhs_adjust_description_part2")}<motion.span variants={popVariants} layoutId="rhs-final" className="p-2 bg-teal-100 rounded-md font-bold text-teal-700">{step.final}</motion.span>.</p> {/* 👈 Translated with interpolation */}
                            {step.carry > 0 && <p>{t("rhs_adjust_description_part3", { carry: step.carry })}</p>} {/* 👈 Translated with interpolation */}
                        </motion.div>
                    ),
                    'lhs': (
                        <motion.div variants={itemVariants} className="font-mono text-3xl space-y-4 relative w-64 mx-auto">
                            <div className="flex justify-between text-4xl"><motion.p variants={itemVariants}>{step.num1}</motion.p><motion.p variants={itemVariants} className={`${step.def1 >= 0 ? 'text-green-600' : 'text-red-600'}`}>{step.def1 > 0 ? '+' : ''}{step.def1}</motion.p></div>
                            <div className="flex justify-between text-4xl"><motion.p variants={itemVariants}>{step.num2}</motion.p><motion.p variants={itemVariants} className={`${step.def2 >= 0 ? 'text-green-600' : 'text-red-600'}`}>{step.def2 > 0 ? '+' : ''}{step.def2}</motion.p></div>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} transition={{ delay: 0.8 }}><ArrowDownRight className="absolute top-0 left-4 h-16 w-16 text-orange-500" strokeWidth={1.5} /><ArrowUpRight className="absolute bottom-0 left-4 h-16 w-16 text-teal-500" strokeWidth={1.5} /></motion.div>
                            <div className="text-2xl text-left pt-6 space-y-2">
                                <motion.p variants={itemVariants} className="flex items-center gap-2"><span className="w-4 h-4 rounded-full bg-orange-500"></span><span>{t("lhs_calculation_1", { num1: step.num1, def2: step.def2, result: step.result })} = <span className="font-bold">{step.result}</span></span></motion.p> {/* 👈 Translated with interpolation */}
                                <motion.p variants={itemVariants} className="flex items-center gap-2"><span className="w-4 h-4 rounded-full bg-teal-500"></span><span>{t("lhs_calculation_2", { num2: step.num2, def1: step.def1, result: step.result })} = <span className="font-bold">{step.result}</span></span></motion.p> {/* 👈 Translated with interpolation */}
                            </div>
                            {step.carry > 0 && <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 text-3xl mt-4 pt-4 border-t border-amber-300"><span>{t("lhs_carry_addition", { result: step.result, carry: step.carry })}</span><span>=</span><motion.span variants={popVariants} layoutId="lhs-final" className="p-2 bg-orange-100 rounded-md font-bold text-orange-700">{step.final}</motion.span></motion.div>} {/* 👈 Translated with interpolation */}
                            {step.carry === 0 && <motion.div layoutId="lhs-final" className="hidden">{step.final}</motion.div>}
                        </motion.div>
                    ),
                    'vinculum_intro': (
                        <motion.div variants={itemVariants} className="font-mono text-3xl space-y-4">
                            <p>{t("vinculum_intro_description_part1", { lhs: step.lhs, rhs: step.rhs })}</p> {/* 👈 Translated with interpolation */}
                            <p className="text-xl">{t("vinculum_intro_description_part2")}</p> {/* 👈 Translated */}
                        </motion.div>
                    ),
                    'vinculum_process': (
                        <motion.div variants={itemVariants} className="font-mono text-3xl space-y-2">
                            <p className="text-xl">{t("vinculum_process_description_part1", { lhsRaw: step.lhsRaw, lhsFinal: step.lhsFinal, base: step.base })}</p> {/* 👈 Translated with interpolation */}
                            <div className="flex items-center justify-center gap-4 text-4xl pt-4">
                                <motion.span variants={itemVariants}>{t("vinculum_process_calculation", { base: step.base, absRhsRaw: Math.abs(step.rhsRaw) })}</motion.span> {/* 👈 Translated with interpolation */}
                                <motion.span variants={itemVariants}>=</motion.span>
                                <motion.span variants={popVariants} className="text-teal-600 font-bold">{step.rhsFinal}</motion.span>
                            </div>
                            <motion.div layoutId="lhs-final" className="hidden">{step.lhsFinal}</motion.div>
                            <motion.div layoutId="rhs-final" className="hidden">{step.rhsFinal}</motion.div>
                        </motion.div>
                    ),
                    'combine': (
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-0 text-5xl font-mono font-extrabold">
                                <motion.span layoutId="lhs-final" className="text-orange-600">{step.lhs}</motion.span>
                                <motion.span layoutId="rhs-final" className="text-teal-600">{step.rhs}</motion.span>
                            </div>
                        </div>
                    )
                }[step.type]
            }
        </motion.div>
    );
}