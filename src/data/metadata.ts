export interface Metadata {
  title: string;
  description: string;
  abstract?: string;
  links: {
    documentation: string;
    ontology: string;
    shapes: string;
    github: string;
  };
  dates: {
    creation: string;
    modification: string;
  };
  license: {
    name: string;
    url: string;
    imageUrl: string;
  };
}

export const mainMetadata: Metadata = {
  title: "The Riskman Ontology",
  description: "The Riskman Ontology defines various notions related to risk management for medical devices.",
  abstract: "The Riskman Ontology defines various notions related to risk management for medical devices. It builds on terms from ISO 14971. The central notion of the Riskman ontology is that of a Safe Design Argument (SDA), a reusable artifact that aims to demonstrate how a specific hazard occurring with a device has been mitigated (possibly using further context information and assumptions).",
  links: {
    documentation: "https://w3id.org/riskman",
    ontology: "https://w3id.org/riskman/ontology",
    shapes: "https://w3id.org/riskman/shapes",
    github: "https://w3id.org/riskman/repo"
  },
  dates: {
    creation: "2023-09-12",
    modification: "2024-04-13"
  },
  license: {
    name: "CC BY 4.0",
    url: "https://creativecommons.org/licenses/by/4.0/",
    imageUrl: "https://licensebuttons.net/l/by/4.0/88x31.png"
  }
};

export const securityMetadata: Metadata = {
  title: "Extension of the Riskman Ontology for Security",
  description: "An extension of the Riskman ontology that also takes in account security aspects of medical devices.",
  links: {
    documentation: "https://w3id.org/riskman",
    ontology: "https://w3id.org/riskman/ontology/security",
    shapes: "https://w3id.org/riskman/shapes/security",
    github: "https://w3id.org/riskman/repo"
  },
  dates: {
    creation: "2024-08-20",
    modification: "2024-11-17"
  },
  license: {
    name: "CC BY 4.0",
    url: "https://creativecommons.org/licenses/by/4.0/",
    imageUrl: "https://licensebuttons.net/l/by/4.0/88x31.png"
  }
}; 