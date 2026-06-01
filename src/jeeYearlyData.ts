import { ExamAnalysis } from "./types";

export const JEE_YEARLY_EXAMS: Record<string, { title: string; subject: string; data: ExamAnalysis }> = {
  jee_main_2025: {
    title: "JEE Main 2025 Paper Analysis",
    subject: "Physics, Chemistry & Mathematics",
    data: {
      summary: {
        examName: "JEE Main 2025 (Official Shift Analysis)",
        subject: "Physics, Chemistry & Mathematics",
        totalMarks: 300,
        totalQuestions: 75,
        difficultyProfile: {
          easy: 40,
          medium: 48,
          hard: 12
        }
      },
      chapters: [
        {
          chapterName: "Modern Physics & Optics",
          questionCount: 10,
          marksAllocated: 40,
          percentage: 13
        },
        {
          chapterName: "Coordinate Geometry",
          questionCount: 8,
          marksAllocated: 32,
          percentage: 11
        },
        {
          chapterName: "Electrostatics & Current Electricity",
          questionCount: 9,
          marksAllocated: 36,
          percentage: 12
        },
        {
          chapterName: "Organic Chemistry (Carbonyls)",
          questionCount: 11,
          marksAllocated: 44,
          percentage: 15
        },
        {
          chapterName: "Vector Algebra & 3D Geometry",
          questionCount: 7,
          marksAllocated: 28,
          percentage: 9
        },
        {
          chapterName: "Thermodynamics & Kinetics",
          questionCount: 10,
          marksAllocated: 40,
          percentage: 13
        }
      ],
      breakdown: [
        {
          questionNumber: "Q1",
          coreChapter: "Modern Physics & Optics",
          specificTopic: "De Broglie Wavelength of Charged Particle",
          conceptTested: "Ratio of wavelength of proton and alpha particle accelerated under same potential difference.",
          difficulty: "Easy",
          questionType: "Single Correct MCQ",
          calculatedMarks: 4
        },
        {
          questionNumber: "Q2",
          coreChapter: "Organic Chemistry (Carbonyls)",
          specificTopic: "Aldol Condensation & Cannizzaro reaction mixed",
          conceptTested: "Identify the final major product formed through self aldol of acetaldehyde followed by reduction.",
          difficulty: "Medium",
          questionType: "Single Correct MCQ",
          calculatedMarks: 4
        },
        {
          questionNumber: "Q3",
          coreChapter: "Vector Algebra & 3D Geometry",
          specificTopic: "Shortest Distance between Two Skew Lines",
          conceptTested: "Vector projection to evaluate shortest normal distance between symmetric lines in 3-space.",
          difficulty: "Hard",
          questionType: "Numerical Value",
          calculatedMarks: 4
        },
        {
          questionNumber: "Q4",
          coreChapter: "Coordinate Geometry",
          specificTopic: "Tangent and Normal to Parabola",
          conceptTested: "Find condition of common tangent between y^2 = 8x and x^2 + y^2 = 2.",
          difficulty: "Medium",
          questionType: "Single Correct MCQ",
          calculatedMarks: 4
        },
        {
          questionNumber: "Q5",
          coreChapter: "Thermodynamics & Kinetics",
          specificTopic: "Gibbs Free Energy & Equilibrium",
          conceptTested: "Calculating dG from dH and dS at varying temperatures to determine spontaneity boundaries.",
          difficulty: "Easy",
          questionType: "Single Correct MCQ",
          calculatedMarks: 4
        }
      ],
      insights: {
        coreThemes: [
          "Physics continued the trend of being highly formula-centric with direct computational questions.",
          "Chemistry focused intensively on NCERT guidelines, especially in reaction kinetics and inorganic transitions.",
          "Mathematics emerged as highly verbose and calculation-intensive, with a major focus on Skew Lines and Vector systems."
        ],
        highYieldChapters: [
          {
            chapterName: "Modern Physics & Optics",
            roiExplanation: "Extremely high yield with 10 questions. Most problems solved by direct application of Bohr model and Snell's formulas."
          },
          {
            chapterName: "Organic Chemistry (Carbonyls)",
            roiExplanation: "Formed 15% of the test. Grignard reagents and named reactions like Aldol yielded predictable score avenues."
          }
        ],
        cognitiveDemand: "Balanced. The physics and chemistry sections rewarded speed, while mathematics required rigorous step-by-step algebraic processing.",
        cognitiveRatios: {
          recall: 30,
          application: 45,
          problemSolving: 25
        },
        strategicAdvice: [
          "Solve NCERT Exemplar problems line-by-line for chemistry chemistry inorganic blocks to score quick marks under 30 seconds per question.",
          "Start your math section with independent vector questions; they have high mark guarantees compared to complex integration parts."
        ]
      }
    }
  },
  jee_main_2024: {
    title: "JEE Main 2024 Paper Analysis",
    subject: "Physics, Chemistry & Mathematics",
    data: {
      summary: {
        examName: "JEE Main 2024 (Cumulative Shift Trends)",
        subject: "Physics, Chemistry & Mathematics",
        totalMarks: 300,
        totalQuestions: 75,
        difficultyProfile: {
          easy: 45,
          medium: 42,
          hard: 13
        }
      },
      chapters: [
        {
          chapterName: "Electromagnetism & AC Current",
          questionCount: 11,
          marksAllocated: 44,
          percentage: 15
        },
        {
          chapterName: "Calculus & Limits",
          questionCount: 9,
          marksAllocated: 36,
          percentage: 12
        },
        {
          chapterName: "Chemical Bonding & Coordination Chemistry",
          questionCount: 10,
          marksAllocated: 40,
          percentage: 13
        },
        {
          chapterName: "Mechanics & Gravitation",
          questionCount: 8,
          marksAllocated: 32,
          percentage: 11
        },
        {
          chapterName: "Matrices & Probability",
          questionCount: 7,
          marksAllocated: 28,
          percentage: 9
        }
      ],
      breakdown: [
        {
          questionNumber: "Q1",
          coreChapter: "Electromagnetism & AC Current",
          specificTopic: "LCR Resonance Frequency",
          conceptTested: "Calculate quality factor and band width at resonant impedance state.",
          difficulty: "Easy",
          questionType: "Single Correct MCQ",
          calculatedMarks: 4
        },
        {
          questionNumber: "Q2",
          coreChapter: "Calculus & Limits",
          specificTopic: "Leibniz Rule of Differentiation",
          conceptTested: "Differentiating integral equations to evaluate limits in indeterminate form.",
          difficulty: "Hard",
          questionType: "Numerical Value",
          calculatedMarks: 4
        },
        {
          questionNumber: "Q3",
          coreChapter: "Chemical Bonding & Coordination Chemistry",
          specificTopic: "Hybridization and Magnetic Moment",
          conceptTested: "Count unpaired electrons in spin complexes using Crystal Field Splitting Theory.",
          difficulty: "Easy",
          questionType: "Single Correct MCQ",
          calculatedMarks: 4
        }
      ],
      insights: {
        coreThemes: [
          "Physics featured 28 out of 30 direct formula-based questions accessible to moderate-level aspirants.",
          "Coordination chemistry and d-block transition complexes formed the majority of the inorganic section.",
          "Integration problems in math utilized heavy integration limits, standard substitutions, and special functions."
        ],
        highYieldChapters: [
          {
            chapterName: "Electromagnetism & AC Current",
            roiExplanation: "Consistently yielding 15% of the total score. Easily conquered by memorizing inductive reactors and phase angle formulas."
          },
          {
            chapterName: "Chemical Bonding & Coordination Chemistry",
            roiExplanation: "Formed 13% of the paper. High-yield rewards for understanding high/low spin crystal splits and d2sp3 geometry structures."
          }
        ],
        cognitiveDemand: "Average complexity, heavily requiring factual recall in Chemistry and formula application in Physics.",
        cognitiveRatios: {
          recall: 38,
          application: 42,
          problemSolving: 20
        },
        strategicAdvice: [
          "Memorize the direct formula formulas for the dipole moment of standard symmetric coordinates.",
          "In math, avoid tedious integrations by checking if definite boundary limits are symmetric; apply odd-even function shortcuts first."
        ]
      }
    }
  },
  jee_main_2023: {
    title: "JEE Main 2023 Paper Analysis",
    subject: "Physics, Chemistry & Mathematics",
    data: {
      summary: {
        examName: "JEE Main 2023 (Official Paper trends)",
        subject: "Physics, Chemistry & Mathematics",
        totalMarks: 300,
        totalQuestions: 75,
        difficultyProfile: {
          easy: 30,
          medium: 52,
          hard: 18
        }
      },
      chapters: [
        {
          chapterName: "Thermal Physics & Mechanics",
          questionCount: 12,
          marksAllocated: 48,
          percentage: 16
        },
        {
          chapterName: "Mathematical Reasoning & Statistics",
          questionCount: 6,
          marksAllocated: 24,
          percentage: 8
        },
        {
          chapterName: "Physical Chemistry (Thermodynamics, Solutions)",
          questionCount: 11,
          marksAllocated: 44,
          percentage: 15
        },
        {
          chapterName: "Algebra (Complex numbers, Binomial)",
          questionCount: 8,
          marksAllocated: 32,
          percentage: 11
        }
      ],
      breakdown: [
        {
          questionNumber: "Q1",
          coreChapter: "Thermal Physics & Mechanics",
          specificTopic: "Carnot Engine Efficiency",
          conceptTested: "Efficiency relationship under varying sink temperatures; ratio calculations.",
          difficulty: "Easy",
          questionType: "Single Correct MCQ",
          calculatedMarks: 4
        },
        {
          questionNumber: "Q2",
          coreChapter: "Mathematical Reasoning & Statistics",
          specificTopic: "Tautology and Fallacy",
          conceptTested: "Proving dynamic logical equivalent clauses using primary Boolean tables.",
          difficulty: "Easy",
          questionType: "Single Correct MCQ",
          calculatedMarks: 4
        }
      ],
      insights: {
        coreThemes: [
          "Mathematical Reasoning was included in every single shift, yielding high-ROI marks.",
          "Thermodynamics in chemistry was highly calculation-oriented, with values calling for logarithm estimations.",
          "Mechanics segment focused heavily on the conservation of linear momentum and projectile trajectories."
        ],
        highYieldChapters: [
          {
            chapterName: "Thermal Physics & Mechanics",
            roiExplanation: "Highly profitable domain representing a solid 16%. Standard problems based on Stefan-Boltzmann and ideal gas state laws."
          }
        ],
        cognitiveDemand: "Slightly higher algebraic demand across physics and mathematics compared to subsequent years.",
        cognitiveRatios: {
          recall: 25,
          application: 50,
          problemSolving: 25
        },
        strategicAdvice: [
          "Identify truth tables for logic gates; they represent a guaranteed 4 marks with zero chance of negative calculations.",
          "Solidify ideal gas equations to address physical chemistry and thermal physics simultaneously."
        ]
      }
    }
  },
  jee_advanced_2025: {
    title: "JEE Advanced 2025 Paper Analysis",
    subject: "Physics, Chemistry & Mathematics",
    data: {
      summary: {
        examName: "JEE Advanced 2025 (Predicted Trend Blueprint)",
        subject: "Physics, Chemistry & Mathematics",
        totalMarks: 360,
        totalQuestions: 54,
        difficultyProfile: {
          easy: 10,
          medium: 40,
          hard: 50
        }
      },
      chapters: [
        {
          chapterName: "Rotational Mechanics & Gravity",
          questionCount: 10,
          marksAllocated: 67,
          percentage: 19
        },
        {
          chapterName: "Integral Calculus & Differential Equations",
          questionCount: 12,
          marksAllocated: 80,
          percentage: 22
        },
        {
          chapterName: "Physical Chemistry (Electrochemistry & Cells)",
          questionCount: 11,
          marksAllocated: 73,
          percentage: 20
        },
        {
          chapterName: "Vector-3D Space",
          questionCount: 8,
          marksAllocated: 53,
          percentage: 15
        }
      ],
      breakdown: [
        {
          questionNumber: "Sec A, Q1",
          coreChapter: "Rotational Mechanics & Gravity",
          specificTopic: "Rolling on an Inclined Plane",
          conceptTested: "Conservation of energy combined with friction constraints for asymmetric shapes (hollow cylinder vs solid sphere).",
          difficulty: "Hard",
          questionType: "Multi-Correct MCQ",
          calculatedMarks: 4
        },
        {
          questionNumber: "Sec A, Q2",
          coreChapter: "Physical Chemistry (Electrochemistry & Cells)",
          specificTopic: "Nernst Equation for Concentrated Cells",
          conceptTested: "Deriving EMF of hydrogen electrode with varying pH values and dynamic solubility products (Ksp).",
          difficulty: "Hard",
          questionType: "Multi-Correct MCQ",
          calculatedMarks: 4
        },
        {
          questionNumber: "Sec B, Q1",
          coreChapter: "Integral Calculus & Differential Equations",
          specificTopic: "First-Order Linear Differential Equations",
          conceptTested: "Integrating factor calculation with logarithmic parameters, and applying boundary constraints.",
          difficulty: "Medium",
          questionType: "Single Option Integer",
          calculatedMarks: 3
        }
      ],
      insights: {
        coreThemes: [
          "Extremely complex multi-concept items where Physics merges mechanical torque with surface charges.",
          "Highly non-trivial integrations combined with inequalities and functional equations.",
          "Inorganic chemistry focused on deep coordinate isomers and orbital configuration calculations."
        ],
        highYieldChapters: [
          {
            chapterName: "Integral Calculus & Differential Equations",
            roiExplanation: "Dominates math with 22% of total weightage. Highly recursive patterns based on Newton-Leibniz integrals."
          },
          {
            chapterName: "Rotational Mechanics & Gravity",
            roiExplanation: "Formed 19% of the marks. Multi-coordinate torque, center of mass shifts, and angular momentum equations dominate."
          }
        ],
        cognitiveDemand: "Brutal. Requires strong analytical deduction, rigorous proofs, and very fast mental mathematical transformations.",
        cognitiveRatios: {
          recall: 5,
          application: 35,
          problemSolving: 60
        },
        strategicAdvice: [
          "In multi-correct MCQs, mark only those choices of which you are 100% sure; partial positive marking protects parameters from drastic failures.",
          "Always sketch a coordinate figure in mechanics first to identify geometric symmetries immediately."
        ]
      }
    }
  },
  jee_advanced_2024: {
    title: "JEE Advanced 2024 Paper Analysis",
    subject: "Physics, Chemistry & Mathematics",
    data: {
      summary: {
        examName: "JEE Advanced 2024 (Shift Analysis)",
        subject: "Physics, Chemistry & Mathematics",
        totalMarks: 360,
        totalQuestions: 54,
        difficultyProfile: {
          easy: 12,
          medium: 43,
          hard: 45
        }
      },
      chapters: [
        {
          chapterName: "Thermodynamics & Heat Transfer",
          questionCount: 9,
          marksAllocated: 60,
          percentage: 17
        },
        {
          chapterName: "Matrices & Probability Theory",
          questionCount: 11,
          marksAllocated: 73,
          percentage: 20
        },
        {
          chapterName: "Organic Mechanism & Carbonyls",
          questionCount: 12,
          marksAllocated: 80,
          percentage: 22
        },
        {
          chapterName: "Optics & Wave Symmetries",
          questionCount: 7,
          marksAllocated: 47,
          percentage: 13
        }
      ],
      breakdown: [
        {
          questionNumber: "Sec 1, Q1",
          coreChapter: "Organic Mechanism & Carbonyls",
          specificTopic: "Hoffmann Bromamide rearrangement with isotope tracking",
          conceptTested: "Tracking Nitrogen-15 isotopes throughout a multi-step amine inversion pathway with chiral centers.",
          difficulty: "Hard",
          questionType: "Multi-Correct MCQ",
          calculatedMarks: 4
        },
        {
          questionNumber: "Sec 2, Q1",
          coreChapter: "Matrices & Probability Theory",
          specificTopic: "System of Linear Equations (Cramer's Rule)",
          conceptTested: "Analysing non-trivial solution count of 3x3 matrices with trigonometric entry variables.",
          difficulty: "Medium",
          questionType: "Numerical Value",
          calculatedMarks: 3
        }
      ],
      insights: {
        coreThemes: [
          "Chemistry was heavily skewed towards organic synthesis mechanisms with detailed stereocenter tracking.",
          "Mathematics matrices was highly abstract, using determinant properties to check for system consistency.",
          "Physics section highlighted classic thermodynamics engines and heat distribution profiles across concentric cylinders."
        ],
        highYieldChapters: [
          {
            chapterName: "Organic Mechanism & Carbonyls",
            roiExplanation: "An absolute powerhouse representing 22%. Demands extensive familiarity with isotope tracking and chiral configurations."
          }
        ],
        cognitiveDemand: "Expert. Heavy focus on spatial visualization in biology, physics vectors, and symmetric chemical formulas.",
        cognitiveRatios: {
          recall: 8,
          application: 37,
          problemSolving: 55
        },
        strategicAdvice: [
          "Prepare mechanism maps for named reactions; the examiners rely heavily on stereoselective reagents.",
          "In linear algebra matrices, test simple singular matrices (eg, with all entries 1 or 0) to eliminate incorrect criteria options."
        ]
      }
    }
  },
  jee_advanced_2023: {
    title: "JEE Advanced 2023 Paper Analysis",
    subject: "Physics, Chemistry & Mathematics",
    data: {
      summary: {
        examName: "JEE Advanced 2023 (Official Paper)",
        subject: "Physics, Chemistry & Mathematics",
        totalMarks: 360,
        totalQuestions: 54,
        difficultyProfile: {
          easy: 15,
          medium: 45,
          hard: 40
        }
      },
      chapters: [
        {
          chapterName: "Electrodynamics & Gauss LawS",
          questionCount: 11,
          marksAllocated: 73,
          percentage: 20
        },
        {
          chapterName: "Complex Numbers & Quadratic equations",
          questionCount: 10,
          marksAllocated: 67,
          percentage: 19
        },
        {
          chapterName: "Chemical Kinetics & Equilibrium",
          questionCount: 11,
          marksAllocated: 73,
          percentage: 20
        },
        {
          chapterName: "Modern Physics",
          questionCount: 9,
          marksAllocated: 60,
          percentage: 17
        }
      ],
      breakdown: [
        {
          questionNumber: "Sec A, Q1",
          coreChapter: "Electrodynamics & Gauss LawS",
          specificTopic: "Concentric Conductive Spheres with dielectric filling",
          conceptTested: "Calculating electrostatic potential, energy states, and bound charge densities of varying spheres.",
          difficulty: "Hard",
          questionType: "Multi-Correct MCQ",
          calculatedMarks: 4
        },
        {
          questionNumber: "Sec B, Q1",
          coreChapter: "Complex Numbers & Quadratic equations",
          specificTopic: "De Moivre Theorem roots of unity",
          conceptTested: "Summation of algebraic complex terms using de Moivre theorem and trigonometric polar relations.",
          difficulty: "Medium",
          questionType: "Numerical Value",
          calculatedMarks: 4
        }
      ],
      insights: {
        coreThemes: [
          "Physics was heavily electrodynamics dominant, focusing on electrostatic capacitance fields.",
          "Chemistry was numerical intensive, with detailed titration steps and physical gas laws.",
          "Complex numbers section utilized trigonometric properties of roots to evaluate complex product terms."
        ],
        highYieldChapters: [
          {
            chapterName: "Electrodynamics & Gauss LawS",
            roiExplanation: "Extremely high yield on electrostatic forces, capacitors, and electromagnet inputs."
          }
        ],
        cognitiveDemand: "Robust application. Demands strong connection between physical laws and complex integration calculus steps.",
        cognitiveRatios: {
          recall: 10,
          application: 40,
          problemSolving: 50
        },
        strategicAdvice: [
          "Always verify Gauss law surface boundaries; symmetric surfaces can turn complex triple integrals into simple multiplication.",
          "In titration equations, write down balanced stoichiometric ratios to prevent factor errors."
        ]
      }
    }
  }
};
