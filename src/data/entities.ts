export interface Entity {
  name: string;
  type: 'class' | 'objectProperty' | 'namedIndividual';
  section: 'main' | 'security';
}

export const entities: Entity[] = [
  // Main Classes
  { name: "Analyzed risk", type: "class", section: "main" },
  { name: "Assurance SDA", type: "class", section: "main" },
  { name: "Assurance SDAI", type: "class", section: "main" },
  { name: "Device component", type: "class", section: "main" },
  { name: "Device context", type: "class", section: "main" },
  { name: "Domain specific hazard", type: "class", section: "main" },
  { name: "Event", type: "class", section: "main" },
  { name: "Device function", type: "class", section: "main" },
  { name: "Device problem", type: "class", section: "main" },
  { name: "Harm", type: "class", section: "main" },
  { name: "Hazard", type: "class", section: "main" },
  { name: "Hazardous situation", type: "class", section: "main" },
  { name: "Implementation manifest", type: "class", section: "main" },
  { name: "Controlled risk", type: "class", section: "main" },
  { name: "Patient problem", type: "class", section: "main" },
  { name: "Probability", type: "class", section: "main" },
  { name: "Risk", type: "class", section: "main" },
  { name: "Risk level", type: "class", section: "main" },
  { name: "Risk SDA", type: "class", section: "main" },
  { name: "Risk SDAI", type: "class", section: "main" },
  { name: "SDA", type: "class", section: "main" },
  { name: "SDAI", type: "class", section: "main" },
  { name: "Severity", type: "class", section: "main" },
  { name: "Safety assurance", type: "class", section: "main" },

  // Main Object Properties
  { name: "causes harm", type: "objectProperty", section: "main" },
  { name: "has analyzed risk", type: "objectProperty", section: "main" },
  { name: "has device context", type: "objectProperty", section: "main" },
  { name: "has device component", type: "objectProperty", section: "main" },
  { name: "has device problem", type: "objectProperty", section: "main" },
  { name: "has domain specific hazard", type: "objectProperty", section: "main" },
  { name: "has event", type: "objectProperty", section: "main" },
  { name: "has device function", type: "objectProperty", section: "main" },
  { name: "has harm", type: "objectProperty", section: "main" },
  { name: "has hazard", type: "objectProperty", section: "main" },
  { name: "has hazardous situation", type: "objectProperty", section: "main" },
  { name: "has implementation manifest", type: "objectProperty", section: "main" },
  { name: "has patient problem", type: "objectProperty", section: "main" },
  { name: "has parent hazard", type: "objectProperty", section: "main" },
  { name: "has parent situation", type: "objectProperty", section: "main" },
  { name: "has residual risk level", type: "objectProperty", section: "main" },
  { name: "has initial risk level", type: "objectProperty", section: "main" },
  { name: "has risk level", type: "objectProperty", section: "main" },
  { name: "has preceding event", type: "objectProperty", section: "main" },
  { name: "has safety assurance", type: "objectProperty", section: "main" },
  { name: "has sub SDA", type: "objectProperty", section: "main" },
  { name: "is mitigated by", type: "objectProperty", section: "main" },
  { name: "is part of device component", type: "objectProperty", section: "main" },
  { name: "has probability", type: "objectProperty", section: "main" },
  { name: "has Probability1", type: "objectProperty", section: "main" },
  { name: "has Probability2", type: "objectProperty", section: "main" },
  { name: "has Severity", type: "objectProperty", section: "main" },

  // Security Extension Classes
  { name: "Security hazard", type: "class", section: "security" },
  { name: "Analyzed security risk", type: "class", section: "security" },
  { name: "Controlled security risk", type: "class", section: "security" },
  { name: "Justification", type: "class", section: "security" },
  { name: "Risk level needing justification", type: "class", section: "security" },

  // Security Extension Object Properties
  { name: "has initial risk level justification", type: "objectProperty", section: "security" },
  { name: "has residual risk level justification", type: "objectProperty", section: "security" },

  // Security Extension Named Individuals
  { name: "Availability", type: "namedIndividual", section: "security" },
  { name: "Confidentiality", type: "namedIndividual", section: "security" },
  { name: "Integrity", type: "namedIndividual", section: "security" }
]; 