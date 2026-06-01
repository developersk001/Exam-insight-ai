import { ExamAnalysis } from "./types";

export const SAMPLE_EXAMS: Record<string, { title: string; subject: string; data: ExamAnalysis }> = {
  jee_main_15yr: {
    title: "JEE Main (Last 15 Years 2011-2025 Trends)",
    subject: "Physics, Chemistry & Mathematics",
    data: {
      summary: {
        examName: "JEE Main Cumulative Trends (Last 15 Years)",
        subject: "Physics, Chemistry & Mathematics",
        totalMarks: 300,
        totalQuestions: 90,
        difficultyProfile: {
          easy: 35,
          medium: 50,
          hard: 15
        }
      },
      chapters: [
        {
          chapterName: "Coordinate Geometry, Vectors & 3D",
          questionCount: 15,
          marksAllocated: 60,
          percentage: 20
        },
        {
          chapterName: "Calculus & Limits (Differential & Integral)",
          questionCount: 18,
          marksAllocated: 72,
          percentage: 24
        },
        {
          chapterName: "Electrodynamics & Magnetism",
          questionCount: 16,
          marksAllocated: 64,
          percentage: 21
        },
        {
          chapterName: "Modern Physics & Thermodynamics",
          questionCount: 14,
          marksAllocated: 56,
          percentage: 19
        },
        {
          chapterName: "Organic Chemistry & Coordination Complexes",
          questionCount: 17,
          marksAllocated: 68,
          percentage: 23
        },
        {
          chapterName: "Physical Chemistry Concepts",
          questionCount: 10,
          marksAllocated: 40,
          percentage: 13
        }
      ],
      breakdown: [
        {
          questionNumber: "Maths Q1-Q5",
          coreChapter: "Coordinate Geometry, Vectors & 3D",
          specificTopic: "Shortest Distance between Skew Lines & Vector Projections",
          conceptTested: "Applying the vector formula for the shortest distance between two skewed space lines, determining plane equations passing through line intersections, and scalar triple product relationships.",
          difficulty: "Medium",
          questionType: "Multiple Choice (MCQ)",
          calculatedMarks: 20
        },
        {
          questionNumber: "Maths Q6-Q10",
          coreChapter: "Calculus & Limits (Differential & Integral)",
          specificTopic: "Definite Integral Properties & Leibniz Rule",
          conceptTested: "Evaluating integrals using King's Property (f(x) -> f(a+b-x)), differentiating integral limits using Leibniz's rule, and calculating area under transcendental boundaries.",
          difficulty: "Hard",
          questionType: "Multiple Choice (MCQ)",
          calculatedMarks: 20
        },
        {
          questionNumber: "Physics Q1-Q5",
          coreChapter: "Electrodynamics & Magnetism",
          specificTopic: "Electrostatics, Gauss Law & RLC Circuits",
          conceptTested: "Determining field magnitudes inside spheres with varying volume charge density, calculating time-constants in inductive circuits, and resolving alternating currents resonance factors.",
          difficulty: "Medium",
          questionType: "Multiple Choice (MCQ)",
          calculatedMarks: 20
        },
        {
          questionNumber: "Physics Q6-Q10",
          coreChapter: "Modern Physics & Thermodynamics",
          specificTopic: "Photoelectric Shift & Hydrogen Spectral lines",
          conceptTested: "Calculating stopping voltage dependencies under monochromatic wave shifts, deriving de Broglie orbits, and finding PV indicators in cyclic thermodynamic processes.",
          difficulty: "Easy",
          questionType: "Multiple Choice (MCQ)",
          calculatedMarks: 20
        },
        {
          questionNumber: "Chem Q1-Q5",
          coreChapter: "Organic Chemistry & Coordination Complexes",
          specificTopic: "Aromatic Substitution & Hybridization Geometry",
          conceptTested: "Predicting ortho/para orientation of activating groups in benzene rings, applying Jahn-Teller effects, and determining d2sp3/sp3d2 magnetic moments in cobalt/nickel complexes.",
          difficulty: "Medium",
          questionType: "Multiple Choice (MCQ)",
          calculatedMarks: 20
        },
        {
          questionNumber: "Chem Q6-Q10",
          coreChapter: "Physical Chemistry Concepts",
          specificTopic: "Chemical Kinetics & Thermodynamics",
          conceptTested: "Determining reaction orders using initial rate tables, calculating Gibbs Free Energy deviations with pressure constants, and solving numerical buffer pH mixtures.",
          difficulty: "Medium",
          questionType: "Numerical Response",
          calculatedMarks: 20
        }
      ],
      insights: {
        coreThemes: [
          "High formula recall combined with moderate application steps; speed is of the essence.",
          "Core high-frequency items like Vector 3D equations, Coordination Complexes, and Modern Physics atomic shells recur year-over-year with predictable structures.",
          "Numerical decimal rounding rules require precise calculation buffers."
        ],
        highYieldChapters: [
          {
            chapterName: "Coordinate Geometry, Vectors & 3D",
            roiExplanation: "Accounting for 20% of exam weights, these topics have standardized vector algebra models that can be mastered quickly."
          },
          {
            chapterName: "Modern Physics",
            roiExplanation: "Extremely score-friendly. Questions are based on simple Bohr models, radioactivity decays, and photoelectron curves, offering highest mark-to-time ratio."
          }
        ],
        cognitiveDemand: "Balanced between speed-based retrieval of physical formulas, organic nomenclature reactions, and multi-step math integrals.",
        cognitiveRatios: {
          recall: 30,
          application: 55,
          problemSolving: 15
        },
        strategicAdvice: [
          "In Coordinate Geometry, always check standard equations first (e.g. y = mx + c with parables) to bypass long Cartesian determinants.",
          "Ensure units of Modern Physics constants (Planck's h, Rydberg R) are handled in Electron-volts (eV) where applicable to speed up calculation.",
          "First resolve all 10 integer-type numerical questions to identify the 5 easiest, as there are custom optional choices with high scoring margins."
        ]
      }
    }
  },
  jee_advanced_10yr: {
    title: "JEE Advanced (Last 10 Years 2016-2025 Trends)",
    subject: "Physics, Chemistry & Mathematics",
    data: {
      summary: {
        examName: "JEE Advanced Cumulative Trends (Last 10 Years)",
        subject: "Physics, Chemistry & Mathematics",
        totalMarks: 360,
        totalQuestions: 54,
        difficultyProfile: {
          easy: 5,
          medium: 45,
          hard: 50
        }
      },
      chapters: [
        {
          chapterName: "Advanced Calculus & Complex Numbers",
          questionCount: 12,
          marksAllocated: 80,
          percentage: 22
        },
        {
          chapterName: "Vector 3D & Probability Distributions",
          questionCount: 10,
          marksAllocated: 66,
          percentage: 18
        },
        {
          chapterName: "Rotational Mechanics & Electrodynamics",
          questionCount: 14,
          marksAllocated: 94,
          percentage: 26
        },
        {
          chapterName: "Thermodynamics & Modern Physics",
          questionCount: 8,
          marksAllocated: 54,
          percentage: 15
        },
        {
          chapterName: "Organic Mechanism & Inorganic Chemistry",
          questionCount: 10,
          marksAllocated: 66,
          percentage: 18
        }
      ],
      breakdown: [
        {
          questionNumber: "Maths Sec A, Q1-Q3",
          coreChapter: "Advanced Calculus & Complex Numbers",
          specificTopic: "De Moivre Application & Converging Sequences",
          conceptTested: "Analyzing geometric locations of complex numbers under complex polynomial roots, solving limiting sum sequences, and calculating multi-variable definite integrals.",
          difficulty: "Hard",
          questionType: "Multi-Correct Multiple Choice",
          calculatedMarks: 12
        },
        {
          questionNumber: "Maths Sec B, Q4-Q6",
          coreChapter: "Vector 3D & Probability Distributions",
          specificTopic: "Bayes Theorem with Conditional Matrices",
          conceptTested: "Multiplying probability distributions with matrix transformations, finding eigenvalue traits, and calculating spatial tetrahedron dimensions using vector cross-products.",
          difficulty: "Hard",
          questionType: "Paragraph Comprehension",
          calculatedMarks: 12
        },
        {
          questionNumber: "Physics Sec A, Q1-Q4",
          coreChapter: "Rotational Mechanics & Electrodynamics",
          specificTopic: "Angular Momentum Conservation & Faraday Ring Charge",
          conceptTested: "Combining linear momentum with pure rotational inertia on non-uniform rods, calculating inductive eddy currents on conducting loops under magnetic gradients.",
          difficulty: "Hard",
          questionType: "Multi-Correct Multiple Choice",
          calculatedMarks: 16
        },
        {
          questionNumber: "Physics Sec B, Q5-Q7",
          coreChapter: "Thermodynamics & Modern Physics",
          specificTopic: "Carnot Engine Entropy & Nuclear Binding Spills",
          conceptTested: "Evaluating non-standard gaseous thermal expansions with varying molar heat capacities, calculating Q value splits in fission processes, and deriving Bohr radius variables.",
          difficulty: "Medium",
          questionType: "Numerical Grid",
          calculatedMarks: 12
        },
        {
          questionNumber: "Chem Sec A, Q1-Q4",
          coreChapter: "Organic Mechanism & Inorganic Chemistry",
          specificTopic: "Stereocentered Named Reactions & Qualitative Analysis",
          conceptTested: "Predicting optical configuration (R/S) of compounds under aldol condensation, hydroboration-oxidation mechanisms, and identifying anions in salt mixtures via colored precipitates.",
          difficulty: "Hard",
          questionType: "Multi-Correct Multiple Choice",
          calculatedMarks: 16
        }
      ],
      insights: {
        coreThemes: [
          "Extreme emphasis on multi-concept synthesis; a single question frequently blends calculus with vector fields or thermodynamics with chemical equilibrium.",
          "Negative marking rules demand extreme caution on Multi-Correct options.",
          "Highly non-traditional questions testing primary academic derivations."
        ],
        highYieldChapters: [
          {
            chapterName: "Calculus & Complex Coordinates",
            roiExplanation: "Over 22% weight. Requires deep conceptual reasoning but has a systematic logical boundary if geometry is used."
          },
          {
            chapterName: "Rotational Dynamics & Fields",
            roiExplanation: "Represents 26% of score. Rigorous mechanics linked to Maxwell electric field lines. Practice rigid body physics combined with Gauss fluxes."
          }
        ],
        cognitiveDemand: "Severely demanding. Rote patterns are actively avoided by examiners. Strong geometric intuition and mental integration are required.",
        cognitiveRatios: {
          recall: 10,
          application: 35,
          problemSolving: 55
        },
        strategicAdvice: [
          "In Multi-Correct questions, never guess the final choice unless backed by strict proof, since partial negative marks are extremely costly.",
          "Draw clear physical diagrams for rotational constraints: identify instantaneous center of zero velocity first to simplify rolling equations.",
          "Analyze previous-year question derivations: since the JEE Advanced committee loves modifying textbook assumptions (e.g. constant gravity or rigid strings), practicing basic derivations yields high adaptability."
        ]
      }
    }
  },
  ap_calculus: {
    title: "AP Calculus BC Practice Exam",
    subject: "Calculus / Advanced Mathematics",
    data: {
      summary: {
        examName: "AP Calculus BC Practice Paper",
        subject: "Calculus",
        totalMarks: 108,
        totalQuestions: 17,
        difficultyProfile: {
          easy: 25,
          medium: 55,
          hard: 20
        }
      },
      chapters: [
        {
          chapterName: "Limits & Continuity",
          questionCount: 2,
          marksAllocated: 12,
          percentage: 11
        },
        {
          chapterName: "Differentiation Rules & Applications",
          questionCount: 4,
          marksAllocated: 24,
          percentage: 22
        },
        {
          chapterName: "Integrals & Fundamental Theorem",
          questionCount: 5,
          marksAllocated: 32,
          percentage: 30
        },
        {
          chapterName: "Differential Equations",
          questionCount: 2,
          marksAllocated: 16,
          percentage: 15
        },
        {
          chapterName: "Infinite Sequences & Series",
          questionCount: 4,
          marksAllocated: 24,
          percentage: 22
        }
      ],
      breakdown: [
        {
          questionNumber: "FRQ 1",
          coreChapter: "Integrals & Fundamental Theorem",
          specificTopic: "Accumulation & Rate of Change",
          conceptTested: "Applying the Fundamental Theorem of Calculus to contextual rate-of-flow tables, evaluating definite integrals numerically using Riemann sums, and calculating average value.",
          difficulty: "Medium",
          questionType: "Free Response (Short)",
          calculatedMarks: 9
        },
        {
          questionNumber: "FRQ 2",
          coreChapter: "Differentiation Rules & Applications",
          specificTopic: "Particle Motion in 2D",
          conceptTested: "Using parametric equations and vector-valued functions, finding velocity and acceleration vectors, calculating speed, and solving for particle position via accumulation of rates.",
          difficulty: "Hard",
          questionType: "Free Response (Multi-part)",
          calculatedMarks: 9
        },
        {
          questionNumber: "FRQ 3",
          coreChapter: "Differential Equations",
          specificTopic: "Slope Fields & Euler's Method",
          conceptTested: "Drawing tangents on grid coordinates, executing Euler's stepping method with step size Δx, finding particular analytic solutions using separation of variables, and verifying domain validity.",
          difficulty: "Medium",
          questionType: "Free Response (Multi-part)",
          calculatedMarks: 9
        },
        {
          questionNumber: "FRQ 4",
          coreChapter: "Differentiation Rules & Applications",
          specificTopic: "Related Rates & Implicit Curves",
          conceptTested: "Mating linear variables with geometric rates, differentiating implicitly for dy/dx and higher derivatives, and locating critical tangent point locations on a conic curve.",
          difficulty: "Medium",
          questionType: "Free Response (Short)",
          calculatedMarks: 9
        },
        {
          questionNumber: "FRQ 5",
          coreChapter: "Integrals & Fundamental Theorem",
          specificTopic: "Area and Volume of Revolution",
          conceptTested: "Evaluating intersection bounds, calculating area between transcendental and algebraic lines, projecting cross-sections with known shapes, and rotating boundary areas around nominal axises.",
          difficulty: "Hard",
          questionType: "Free Response (Multi-part)",
          calculatedMarks: 9
        },
        {
          questionNumber: "FRQ 6",
          coreChapter: "Infinite Sequences & Series",
          specificTopic: "Taylor & Maclaurin Polynomials",
          conceptTested: "Constructing polynomial terms of sin(x) and cos(x) derivatives, evaluating radius of convergence using Ratio Test, stating Lagrange error bound constraints, and proving series conditionally converges.",
          difficulty: "Hard",
          questionType: "Free Response (Multi-part)",
          calculatedMarks: 9
        },
        {
          questionNumber: "Q1-Q3",
          coreChapter: "Limits & Continuity",
          specificTopic: "L'Hopital's Rule & Continuity",
          conceptTested: "Analyzing limits for indeterminate forms of type 0/0 and ∞/∞, validating continuity rules through left vs right boundaries, and using the Squeeze Theorem of lower/upper bounds.",
          difficulty: "Easy",
          questionType: "Multiple Choice",
          calculatedMarks: 12
        },
        {
          questionNumber: "Q4-Q6",
          coreChapter: "Differentiation Rules & Applications",
          specificTopic: "Mean Value Theorem & Extrema",
          conceptTested: "Applying the Mean Value Theorem (MVT) and Intermediate Value Theorem (IVT) over closed intervals, and analyzing critical derivative turning points on curve charts.",
          difficulty: "Easy",
          questionType: "Multiple Choice",
          calculatedMarks: 6
        },
        {
          questionNumber: "Q7-Q10",
          coreChapter: "Integrals & Fundamental Theorem",
          specificTopic: "Integration by Substitution & Parts",
          conceptTested: "Applying u-substitution variables with trigonometric modifiers, resolving algebraic parts integrals of x*e^x, and solving partial fraction expansions on rational functions.",
          difficulty: "Medium",
          questionType: "Multiple Choice",
          calculatedMarks: 14
        },
        {
          questionNumber: "Q11-Q12",
          coreChapter: "Differential Equations",
          specificTopic: "Logistic Growth Models",
          conceptTested: "Solving standard differential logistic equations, determining carrying capacity bounds from linear growth models, and finding point of maximal growth rate.",
          difficulty: "Medium",
          questionType: "Multiple Choice",
          calculatedMarks: 7
        },
        {
          questionNumber: "Q13-Q17",
          coreChapter: "Infinite Sequences & Series",
          specificTopic: "Series Convergence Tests",
          conceptTested: "Applying standard tests (Integral Test, Alternating Series Test, Limit Comparison, P-Series Test) to determine convergence or divergence parameters of diverse series.",
          difficulty: "Medium",
          questionType: "Multiple Choice",
          calculatedMarks: 15
        }
      ],
      insights: {
        coreThemes: [
          "Integration-heavy focus involving physical accumulation, average rate analysis, and volume projections.",
          "High graphical and tabular analysis skills required to interpret limits, slope grids, and motion paths without direct formula prompts.",
          "Rigorous emphasis on formal mathematical justifications (MVT, Taylor bounds, series limits) rather than simple algebraic evaluation."
        ],
        highYieldChapters: [
          {
            chapterName: "Integrals & Fundamental Theorem",
            roiExplanation: "Represents 30% of total exam marks. Master u-substitution, parts, and definite integration as rate accumulators first, since it links to Free Response scenarios."
          },
          {
            chapterName: "Differentiation Applications",
            roiExplanation: "Contributes over 20% of exam marks. Extremely structured questions based on particle velocity vectors, related rates of volumes, and curve slope analysis."
          },
          {
            chapterName: "Infinite Sequences & Series",
            roiExplanation: "Allocated 22% of exam marks. Often feared by students, but standard series templates (Taylor/Maclaurin) are highly predictable and repeat identically year-over-year."
          }
        ],
        cognitiveDemand: "Highly application and reasoning heavy. Rote formulas are not provided, and the exam forces students to synthesize definitions to justify qualitative answers.",
        cognitiveRatios: {
          recall: 15,
          application: 50,
          problemSolving: 35
        },
        strategicAdvice: [
          "Do not skip the Series Taylor-Maclaurin expansions: they yield easy marks if you memorize the basic formulas for e^x, sin(x), cos(x).",
          "When solving Parametric vectors, remember speed is the magnitude of the velocity vector: √[(dx/dt)² + (dy/dt)²]. Use your calculator carefully for definite integrals.",
          "Practice writing full mathematical conditions (e.g. 'Since f(x) is continuous on [a,b] and differentiable on (a,b)...') before invoking theorems, as graders deduct marks for omitted assumptions."
        ]
      }
    }
  },
  cbse_physics: {
    title: "CBSE Grade 12 Physics Board Paper",
    subject: "Physics",
    data: {
      summary: {
        examName: "CBSE Grade 12 Physics (AISSCE)",
        subject: "Physics",
        totalMarks: 70,
        totalQuestions: 33,
        difficultyProfile: {
          easy: 35,
          medium: 45,
          hard: 20
        }
      },
      chapters: [
        {
          chapterName: "Electrostatics & Capacitance",
          questionCount: 6,
          marksAllocated: 15,
          percentage: 21
        },
        {
          chapterName: "Current Electricity & Magnetism",
          questionCount: 8,
          marksAllocated: 16,
          percentage: 23
        },
        {
          chapterName: "Electromagnetic Induction & AC",
          questionCount: 5,
          marksAllocated: 12,
          percentage: 17
        },
        {
          chapterName: "Optics (Ray & Wave)",
          questionCount: 7,
          marksAllocated: 15,
          percentage: 21
        },
        {
          chapterName: "Modern Physics & Semiconductors",
          questionCount: 7,
          marksAllocated: 12,
          percentage: 17
        }
      ],
      breakdown: [
        {
          questionNumber: "Section A, Q1-Q5",
          coreChapter: "Electrostatics & Capacitance",
          specificTopic: "Electric Field Line and Potential",
          conceptTested: "Properties of equipotential surfaces, polarization vector inside parallel dielectric plates, and electric field lines due to negative line charges.",
          difficulty: "Easy",
          questionType: "MCQ",
          calculatedMarks: 5
        },
        {
          questionNumber: "Section A, Q6-Q10",
          coreChapter: "Current Electricity & Magnetism",
          specificTopic: "Drift Velocity & Magnetic Flux",
          conceptTested: "Deriving temperature coefficient of resistance limits, and applying Biot-Savart law to verify helical charges paths inside uniform fields.",
          difficulty: "Medium",
          questionType: "MCQ",
          calculatedMarks: 5
        },
        {
          questionNumber: "Section B, Q17",
          coreChapter: "Modern Physics & Semiconductors",
          specificTopic: "De Broglie Wavelength",
          conceptTested: "Comparing thermal electron wavelength profiles with alpha particles under identical accelerating voltages, and showing mass relationships.",
          difficulty: "Easy",
          questionType: "Short Answer",
          calculatedMarks: 2
        },
        {
          questionNumber: "Section C, Q23",
          coreChapter: "Electromagnetic Induction & AC",
          specificTopic: "LCR Resonant Circuit",
          conceptTested: "Deriving the expression for impedence under resonance, solving for power factor Cos(Φ) values, and explaining Q-factor quality metrics.",
          difficulty: "Medium",
          questionType: "Numerical & Derivative",
          calculatedMarks: 3
        },
        {
          questionNumber: "Section D, Q29",
          coreChapter: "Optics (Ray & Wave)",
          specificTopic: "Lens Maker Formula Derivation",
          conceptTested: "Executing a complete geometrical optical refraction analysis on curved glass boundaries and combining dual interfaces to prove Lens Formula.",
          difficulty: "Hard",
          questionType: "Long Derivation",
          calculatedMarks: 5
        },
        {
          questionNumber: "Section E, Q31",
          coreChapter: "Electrostatics & Capacitance",
          specificTopic: "Gauss Law and Applications",
          conceptTested: "Deducing Coulomb's Law directly from standard Gauss flux envelopes around isolated sphere, and finding potential levels at a boundary.",
          difficulty: "Medium",
          questionType: "Long Answer (5 Marks)",
          calculatedMarks: 5
        },
        {
          questionNumber: "Section E, Q33",
          coreChapter: "Modern Physics & Semiconductors",
          specificTopic: "p-n Junction Diode characteristics",
          conceptTested: "Drawing clean schematic band diagrams of Biased diodes, deriving depletion layer variations, and sketching output ripple profiles of full-wave rectifiers.",
          difficulty: "Hard",
          questionType: "Long Technical Answer",
          calculatedMarks: 5
        }
      ],
      insights: {
        coreThemes: [
          "Substantial weight allocated to standard logical derivations (Lens Maker, Gauss spheres, LCR circuits).",
          "Increasing number of conceptual assertion-reasoning items targeting semiconductor bands and photoelectric equations.",
          "Moderate portion of mathematical multi-step numericals (40%) embedded directly within standard descriptive questions."
        ],
        highYieldChapters: [
          {
            chapterName: "Current Electricity & Magnetism",
            roiExplanation: "Accounted for 23% of total score. Relies on straightforward loops (Kirchhoff's rules) and magnetic solenoid calculations, which can be easily practiced."
          },
          {
            chapterName: "Electrostatics & Capacitance",
            roiExplanation: "Delivers 15 marks (21%). Standard questions on capacitor dielectric filling, sphere capacity, and physical dipole electrostatic fields recur consistently."
          }
        ],
        cognitiveDemand: "Balanced heavily between memory of standard derivations (40%), conceptual physical understanding of light/fields (30%), and mathematical numerical execution (30%).",
        cognitiveRatios: {
          recall: 40,
          application: 40,
          problemSolving: 20
        },
        strategicAdvice: [
          "Practice standard vector-diagram notations for alternating current impedance triangles and optical lens ray directions; missing arrows in drawings will lead to mark deduction.",
          "Do not lose marks on simple numericals: write down final derived numerical SI units (e.g. Farads, Tesla, Volts) clearly, as board guidelines allocate 0.5 marks solely for physical units.",
          "Memorize the semiconductor energy gap threshold equations and the difference between intrinsic vs doped valence band patterns as they yield immediate marks in short-answer sections."
        ]
      }
    }
  }
};
