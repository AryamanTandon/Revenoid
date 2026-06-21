/* ============================================================
   Project data
   ------------------------------------------------------------
   Add / edit your projects here. Each project becomes a card.

   Fields:
     title    - project name
     tag      - short category label (e.g. "Featured Project")
     desc     - 1-2 sentence summary
     image    - path to image OR "" to show a placeholder
     tags     - array of tools/skills used
     links    - array of { label, url }
   ============================================================ */
const PROJECTS = [
  {
    title: "Project BatNAV",
    tag: "Featured Project",
    desc: "A wearable, shoe-mounted navigation device for the visually impaired — an inconspicuous alternative to the white cane. Ultrasonic sensors detect obstacles and vibration motors give haptic feedback that scales with proximity, with gyroscope filtering to ignore false ground readings during the foot's bending phase. Received an Open Source Hardware (OSHWA) certification for its fully documented, reproducible design.",
    image: "assets/projects/batnav-device.jpg",
    tags: ["SolidWorks", "Custom PCB", "Arduino Nano", "3D Printing", "Laser Cutting", "HC-SR04", "MPU6050"],
    links: [
      { label: "Project Page", url: "https://www.makersasylum.com/project/project-bat-nav/" },
      { label: "GitHub Docs", url: "https://github.com/AryamanTandon/Project-Bat-NAV" },
      { label: "OSHWA License", url: "https://certification.oshwa.org/in000035.html" }
    ]
  },
  {
    title: "Orca Aircraft — Design/Build/Fly",
    tag: "Aerospace",
    desc: "Designed wing configurations and Fowler flaps for the Orca aircraft using OpenVSP and XFLR5, optimizing NACA airfoils for turning radius and takeoff distance across competition missions. Wrote MATLAB scripts to automate parameter sweeps over 15+ design iterations and validated CFD results with 5+ hours of testing in UW's 3x3 wind tunnel. Team placed 3rd out of 106 at the 2024 AIAA Design/Build/Fly competition.",
    image: "assets/projects/dbf-plane.avif",
    tags: ["OpenVSP", "XFLR5", "MATLAB", "CFD", "Wind Tunnel Testing", "NACA Airfoils"],
    links: [
      { label: "UW DBF Team", url: "https://www.dbfuw.com" }
    ]
  },
  {
    title: "Mechanical Engineering Internship — Autev",
    tag: "Internship",
    desc: "Designed enclosures and structural housings in SolidWorks, iterating on geometry and tolerances for fit and manufacturability. Built and tested prototypes to validate design decisions and debug mechanical and integration issues, working alongside a cross-functional team of electrical and software engineers.",
    image: "assets/projects/autev.jpg",
    tags: ["SolidWorks", "Prototyping", "GD&T", "DFM", "Cross-functional"],
    links: []
  },
  {
    title: "Stirling Engine",
    tag: "Machining",
    desc: "Machining the power piston, piston rod, crank journal, and cylinder base to tight tolerances from tool steel and brass using lathe, mill, bandsaw, and hand tools. Translating CAD drawings into process plans with sequenced operations, tool selection, and tolerance documentation, then assembling and testing the functional engine with a team for an inter-section competition.",
    image: "assets/projects/stirling-engine.png",
    tags: ["Manual Machining", "Lathe", "Mill", "Bandsaw", "Process Planning", "GD&T"],
    links: []
  }
];
