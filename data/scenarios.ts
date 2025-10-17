export type ScenarioSection = {
    phases: { name: string; description?: string; references?: string[] }[];
    keyActivities: string[];
    roles: { role: string; responsibilities: string[] }[];
    artifacts: string[];
    decisionGates: { gate: string }[];
    references: string[];
    tailoring: string[];
};

export type ScenarioStatic = {
    key: "custom_software" | "innovative_product" | "gov_project";
    title: string;
    context: string;
    deliverable: string;
    data: ScenarioSection;
};

export const SCENARIO_LIST: ScenarioStatic[] = [
    {
        key: "custom_software",
        title: "Custom Software Development Project",
        context: "Well-defined requirements, <6 months, <7 team members",
        deliverable: "A lightweight process optimized for speed and flexibility",
        data: {
            phases: [
                { name: "Initiation", description: "Define objectives, clarify project scope, and confirm feasibility. Secure approvals from the client and establish the development environment.", references: ["PMBOK (Initiating)", "PRINCE2 (Starting Up a Project)", "ISO 21500 (Concept Stage)"] },
                { name: "Planning", description: "Create a simple project plan covering deliverables, schedule, resources, and risks. Use iterative planning to refine requirements throughout the project.", references: ["PMBOK (Planning Process Group)", "PRINCE2 (Initiation Stage)"] },
                { name: "Execution", description: "Conduct short development sprints with continuous integration and testing. Hold daily stand-ups for progress tracking and risk identification.", references: ["PMBOK (Execution)", "PRINCE2 (Controlling a Stage)"] },
                { name: "Review & Closure", description: "Deliver MVP, collect feedback, and finalize documentation. Conduct post-project review to capture lessons learned.", references: ["PMBOK (Closing Process)", "ISO 9001 (Quality Management)"] },
            ],
            keyActivities: [
                "Gather requirements from client stakeholders",
                "Define architecture and technology stack",
                "Implement iterative development sprints",
                "Conduct code reviews and unit testing",
                "Deploy MVP and gather feedback",
                "Conduct project retrospective",
            ],
            roles: [
                { role: "Project Manager", responsibilities: ["coordination", "scheduling", "client reporting"] },
                { role: "Tech Lead", responsibilities: ["architecture", "sprint planning"] },
                { role: "Developers", responsibilities: ["implementation", "testing"] },
                { role: "QA Engineer", responsibilities: ["test automation", "regression validation"] },
                { role: "Client Representative", responsibilities: ["requirements validation"] },
            ],
            artifacts: [
                "Project Charter",
                "Requirements Specification Document",
                "Source Code Repository",
                "Test Plan and Results",
                "MVP Release Report",
                "Final Review Document",
            ],
            decisionGates: [
                { gate: "Gate 1 – Requirement Validation: Confirmed and approved by client." },
                { gate: "Gate 2 – Sprint Review: Feature set validated before final delivery." },
                { gate: "Gate 3 – Closure Approval: MVP deployed and accepted by stakeholders." },
            ],
            references: [
                "PMBOK: Initiating, Planning, Executing, Closing",
                "PRINCE2: Product-based planning and lightweight governance",
                "ISO 21500: Process integration and performance tracking",
            ],
            tailoring: [
                "This approach reduces documentation and approvals, optimizing delivery speed.",
                "Lightweight governance ensures control while enabling agility and flexibility.",
            ],
        },
    },
    {
        key: "innovative_product",
        title: "Innovative Product Development Project",
        context: "R&D-heavy, uncertain outcomes, ~1 year duration",
        deliverable: "A hybrid/adaptive process balancing innovation, iteration, and stakeholder management",
        data: {
            phases: [
                { name: "Concept Exploration", description: "Identify opportunities, research trends, and define the innovation hypothesis.", references: ["PMBOK (Concept Phase)", "PRINCE2 (Starting Up a Project)"] },
                { name: "Prototyping & Experimentation", description: "Develop and test prototypes. Conduct experiments and validate assumptions through stakeholder feedback.", references: ["ISO 56002 (Innovation Management)"] },
                { name: "Validation & Refinement", description: "Gather feedback, measure prototype success, and iterate based on findings. Prepare for production scalability.", references: ["PMBOK (Monitoring & Controlling)", "PRINCE2 Agile (Adapting stages)"] },
                { name: "Pre-Launch Planning", description: "Plan transition from prototype to product. Ensure readiness in terms of technology, marketing, and regulatory compliance." },
            ],
            keyActivities: [
                "Conduct research and proof-of-concept studies",
                "Prototype innovative features",
                "Gather stakeholder and user feedback",
                "Iterate on design and functionality",
                "Evaluate commercial viability and IP considerations",
            ],
            roles: [
                { role: "R&D Lead", responsibilities: ["manages innovation streams"] },
                { role: "Product Owner", responsibilities: ["prioritizes value delivery"] },
                { role: "UX Designer", responsibilities: ["user validation", "feedback loop"] },
                { role: "Developers", responsibilities: ["build and iterate prototypes"] },
                { role: "Data Analyst", responsibilities: ["interpret experimental data", "measure performance metrics"] },
            ],
            artifacts: [
                "Concept Paper & Hypothesis Summary",
                "Research Documentation",
                "Prototype Builds",
                "User Feedback Reports",
                "Final Concept Validation Report",
            ],
            decisionGates: [
                { gate: "Gate 1 – Concept Approval: Management validation of innovation idea." },
                { gate: "Gate 2 – Prototype Review: At least one successful proof-of-concept." },
                { gate: "Gate 3 – Launch Readiness: Verified performance, compliance, and ROI." },
            ],
            references: [
                "PMBOK: Adaptive/Hybrid lifecycle",
                "PRINCE2 Agile: Iterative control and feedback",
                "ISO 56002: Systematic innovation management framework",
            ],
            tailoring: [
                "The hybrid process allows structured tracking of unpredictable outcomes.",
                "Balances PMBOK’s discipline with PRINCE2 Agile’s flexibility, guided by ISO 56002.",
            ],
        },
    },
    {
        key: "gov_project",
        title: "Large Government Project",
        context: "Civil, electrical, and IT components, 2-year duration",
        deliverable: "Comprehensive process with governance, compliance, procurement, risk management, and reporting",
        data: {
            phases: [
                { name: "Feasibility & Concept Approval", description: "Conduct needs assessment, stakeholder consultations, and feasibility studies. Secure funding and initial approval.", references: ["PMBOK (Initiating)", "ISO 21500 (Concept)"] },
                { name: "Detailed Planning & Procurement", description: "Develop master plans, schedules, and risk registers. Prepare procurement documentation and evaluate vendors.", references: ["PRINCE2 (Initiation & Stage Planning)"] },
                { name: "Execution & Monitoring", description: "Manage construction, deployment, and integration. Monitor performance using KPIs and ensure vendor compliance.", references: ["PMBOK (Execution & Monitoring)"] },
                { name: "Handover & Operations", description: "Conduct inspections, acceptance tests, and finalize transition to operations. Archive project documentation and audit reports.", references: ["ISO 9001 (Quality)", "ISO 31000 (Risk)"] },
            ],
            keyActivities: [
                "Prepare feasibility reports and cost-benefit analysis",
                "Obtain regulatory clearances and funding approvals",
                "Conduct vendor selection and contract negotiation",
                "Implement works in stages with milestone monitoring",
                "Audit compliance and manage risk continuously",
                "Finalize project handover to operational body",
            ],
            roles: [
                { role: "Program Director", responsibilities: ["Provides strategic direction", "Oversees benefits realization"] },
                { role: "Project Manager", responsibilities: ["Day-to-day planning and monitoring", "Schedule and scope control"] },
                { role: "Procurement Officer", responsibilities: ["Vendor contracts", "Tenders and evaluations"] },
                { role: "Compliance Officer", responsibilities: ["Ensures adherence to standards", "Quality and audit readiness"] },
                { role: "Steering Committee", responsibilities: ["Stage approvals", "Decision-making and escalation"] },
            ],
            artifacts: [
                "Feasibility & Environmental Reports",
                "Project Management Plan",
                "Procurement Contracts",
                "Risk & Issue Logs",
                "Progress Reports",
                "Final Acceptance Certificate",
            ],
            decisionGates: [
                { gate: "Gate 1 – Feasibility Approval: Based on financial and environmental viability." },
                { gate: "Gate 2 – Procurement Clearance: Contracts signed and budget released." },
                { gate: "Gate 3 – Commissioning & Handover: Verified by quality and compliance audits." },
            ],
            references: [
                "PMBOK: Integration, Risk, and Procurement Management",
                "PRINCE2: Governance and Stage Control",
                "ISO 21500 / ISO 31000: Project and Risk Framework",
            ],
            tailoring: [
                "Extensive governance layers and documentation are mandatory for public accountability.",
                "Processes are adapted for cross-domain coordination, vendor transparency, and regulatory alignment.",
            ],
        },
    },
];


