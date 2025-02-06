import { createFileRoute } from "@tanstack/react-router";
import TopImage from "/logo.png";
import ClassCard from "../utils/class";
import ClassCard2 from "../utils/class2";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  type OntologyData = {
    title: string;
    iri: string;
    description?: string;
    classs?: string;
    subclassOf?: string[];
    superclassOf?: string[];
    domainOf?: string[];
    rangeOf?: string[];
  };
  const [ontologyData, setOntologyData] = useState<OntologyData[]>([]);
  const [ontologyData2, setOntologyData2] = useState<OntologyData[]>([]);
  const [ontologyData3, setOntologyData3] = useState<OntologyData[]>([]);
  const [ontologyData4, setOntologyData4] = useState<OntologyData[]>([]);
  const [ontologyData5, setOntologyData5] = useState<OntologyData[]>([]);
  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        setOntologyData(data.data1 || []); // Ensure it defaults to an empty array if undefined
        setOntologyData2(data.data2 || []); // Ensure it defaults to an empty array if undefined
        setOntologyData3(data.data3 || []); // Ensure it defaults to an empty array if undefined
        setOntologyData4(data.data4 || []); // Ensure it defaults to an empty array if undefined
        setOntologyData5(data.data5 || []);
      });
  }, []);

  return (
    <>
      <div className="bg-[#181818] min-h-screen p-8 font-sans text-[#EBEBEBA3]">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <header className="flex items-center justify-between border-b-2 border-white pb-4 mb-6">
            <img src={TopImage} alt="Riskman Ontology Logo" className="h-20" />
            <div className="flex-1 text-center">
              <h1 className="text-3xl font-bold text-[#EBEBEBA3]">
                The Riskman Ontology
              </h1>
              <p className="mt-2 text-[#EBEBEBA3]">
                Digital Risk Management Ontology
              </p>
            </div>
          </header>

          {/* Links and License Section */}
          <section className="mb-8">
            <div className="flex flex-col lg:flex-row">
              {/* Links */}
              <div className="lg:w-1/3">
                <h2 className="text-2xl font-semibold pb-2 mb-4">Links:</h2>
                <ul className="space-y-1 ml-5">
                  <li>
                    <span className="font-bold">Documentation:</span>{" "}
                    <a
                      href="https://w3id.org/riskman"
                      className="text-[#00bd7e] hover:underline"
                    >
                      https://w3id.org/riskman
                    </a>
                  </li>
                  <li>
                    <span className="font-bold">Ontology:</span>{" "}
                    <a
                      href="https://w3id.org/riskman/ontology"
                      className="text-[#00bd7e] hover:underline"
                    >
                      https://w3id.org/riskman/ontology
                    </a>
                  </li>
                  <li>
                    <span className="font-bold">Shapes:</span>{" "}
                    <a
                      href="https://w3id.org/riskman/shapes"
                      className="text-[#00bd7e] hover:underline"
                    >
                      https://w3id.org/riskman/shapes
                    </a>
                  </li>
                  <li>
                    <span className="font-bold">GitHub repo:</span>{" "}
                    <a
                      href="https://w3id.org/riskman/repo"
                      className="text-[#00bd7e] hover:underline"
                    >
                      https://w3id.org/riskman/repo
                    </a>
                  </li>
                </ul>
                <div className="mt-4 text-lg text-gray-400 ml-5">
                  <p>Creation date: 2023-09-12</p>
                  <p>Modification date: 2024-04-13</p>
                </div>
              </div>

              {/* License */}
              <div className="lg:w-1/3 lg:mt-0 mt-8">
                <h2 className="text-2xl font-semibold pb-2 mb-4">License:</h2>
                <div className="flex items-center space-x-6 ml-6">
                  <a href="https://creativecommons.org/licenses/by/4.0/">
                    <div className="px-3 py-1 border border-green-500 text-green-500 rounded">
                      CC BY 4.0
                    </div>
                  </a>
                  <img
                    src="https://licensebuttons.net/l/by/4.0/88x31.png"
                    alt="CC BY 4.0"
                    className="h-10"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="border-b-2 border-white"></div>
            <div className="flex flex-col lg:flex-row">
              {/* Creators Section */}

              <div className="lg:w-1/3">
                <h2 className="text-2xl font-semibold pb-2 mb-4 pt-5">
                  Creators:
                </h2>
                <ul className="space-y-0 ml-5">
                  {[
                    "Dörthe Arndt (ICCL, TU Dresden)",
                    "Martin Diller (ICCL, TU Dresden)",
                    "Piotr Gorczyca (ICCL, TU Dresden)",
                    "Pascal Kettmann (ICCL, TU Dresden)",
                    "Stephan Mennicke (ICCL, TU Dresden)",
                    "Hannes Straß (ICCL, TU Dresden)",
                  ].map((creator, index) => (
                    <li key={index} className="text-[#00bd7e]">
                      {creator}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contributors Section */}
              <div className="lg:w-1/3 lg:mt-5 mt-8">
                <h2 className="text-2xl font-semibold  pb-2 mb-4">
                  Contributors:
                </h2>
                <ul className="space-y-0 ml-5">
                  {[
                    "Evi Hartig (EKFZ, TU Dresden)",
                    "Sarah Tsurkan (EKFZ, TU Dresden)",
                    "Georg Heidenreich (Siemens Healthineers)",
                  ].map((contributor, index) => (
                    <li key={index} className="text-gray-300">
                      {contributor}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Description Section */}
          <section className="mb-8">
            <div className="border-b-2 border-white"></div>
            <h2 className="text-2xl font-semibold pb-2 mb-4 pt-5">
              Description:
            </h2>
            <p className=" ml-6 text-gray-300">
              The Riskman Ontology defines various notions related to risk
              management for medical devices.
            </p>
          </section>

          {/* Abstract Section */}
          <section>
            <h2 className="text-2xl font-semibold pb-2 mb-4">Abstract:</h2>
            <p className="pl-5 text-gray-300">
              The Riskman Ontology defines various notions related to risk
              management for medical devices. It builds on terms from ISO 14971.
              The central notion of the Riskman ontology is that of a Safe
              Design Argument (SDA), a reusable artifact that aims to
              demonstrate how a specific hazard occurring with a device has been
              mitigated (possibly using further context information and
              assumptions).
            </p>
          </section>
          {/* Classes Section */}
          <section className="border border-white p-4 mt-12">
            <h2 className="text-3xl font-bold text-center mb-4">Classes</h2>
            <div className="flex flex-wrap gap-x-7 gap-y-0">
              {[
                "Analyzed risk",
                "Assurance SDA",
                "Assurance SDAI",
                "Device component",
                "Device context",
                "Domain specific hazard",
                "Event",
                "Device function",
                "Device problem",
                "Harm",
                "Hazard",
                "Hazardous situation",
                "Implementation manifest",
                "Controlled risk",
                "Patient problem",
                "Probability",
                "Risk",
                "Risk level",
                "Risk SDA",
                "Risk SDAI",
                "SDA",
                "SDAI",
                "Severity",
                "Safety assurance",
              ].map((classItem) => (
                <a
                  key={classItem}
                  href={`#${classItem.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-[#00bd7e] hover:underline whitespace-nowrap"
                >
                  {classItem}
                </a>
              ))}
            </div>
          </section>

          {/* Detailed Class Section */}
          <section
            className="border border-white-100 p-1 mt-12"
            id="#analyzed-risk"
          >
            <h3 className="text-lg ">Analyzed risk</h3>
            <div className="border border-white-100"></div>

            <p className=" break-words mt-4 text-sm ">
              IRI:{" "}
              <i>
                <a
                  href="https://w3id.org/riskman/ontology#AnalyzedRisk"
                  className="hover:underline"
                >
                  https://w3id.org/riskman/ontology#AnalyzedRisk
                </a>
              </i>
            </p>
            <p className="mt-4 font-bold">
              <span className="">Combination of:</span> one or more
              domain-specific hazard(s) with one hazardous situation and one
              harm with reference to a device context and a specification of an
              initial risk level.
            </p>
            <div className="border-dashed border p-2 border-white-100 space-y-0 mt-4 ml-3 mb-3">
              <p>
                <span className="text-sm">Superclass of:</span>
              </p>
              <ul className="list-disc  ml-8">
                <li className="text-[#00bd7e]">
                  <a href="#has-domain-specific-hazard">
                    (has domain specific hazard
                  </a>{" "}
                  <span className="text-gray-300">some </span> Thing){" "}
                  <span className="text-gray-300">and</span>{" "}
                  <a href="#has-harm">(has harm</a>{" "}
                  <span className="text-gray-300">some </span>
                  Thing) <span className="text-gray-300">and</span>{" "}
                  <a href="#has-device-context">(has device context</a>{" "}
                  <span className="text-gray-300">some </span> Thing){" "}
                  <span className="text-gray-300">and </span>{" "}
                  <a href="#has-hazardous-situation">
                    (has hazardous situation
                  </a>{" "}
                  <span className="text-gray-300">some </span> Thing){" "}
                  <span className="text-gray-300">and </span>{" "}
                  <a href="#has-initial-risk-level">(has initial risk level</a>{" "}
                  <span className="text-gray-300">some </span> Thing)
                </li>
              </ul>
              <p>
                <span className="text-sm">Domain of:</span>
              </p>
              <ul className="list-disc list-inside ml-4">
                <li className="text-[#00bd7e]">
                  <a href="#has-device-context">has device context</a>
                </li>
                <li className="text-[#00bd7e]">
                  <a href="#has-domain-specific-hazard">
                    has domain specific hazard
                  </a>
                </li>
                <li className="text-[#00bd7e]">
                  <a href="#has-hazardous-situation">has hazardous situation</a>
                </li>
                <li className="text-[#00bd7e]">
                  <a href="#has-patient-problem">has patient problem</a>
                </li>
                <li className="text-[#00bd7e]">
                  <a href="#has-initial-risk-level">has initial risk level</a>
                </li>
              </ul>
              <p>
                <span className="text-sm">Range of:</span>
              </p>
              <ul className="list-disc list-inside ml-4">
                <a href="#has-analyzed-risk">
                  <li className="text-[#00bd7e]">has analyzed risk</li>
                </a>
              </ul>
            </div>
          </section>
          {ontologyData.map((item, index) => (
            <ClassCard
              key={index}
              title={item.title}
              iri={item.iri}
              description={item.description || ""}
              subclassOf={item.subclassOf}
              superclassOf={item.superclassOf}
              domainOf={item.domainOf}
              rangeOf={item.rangeOf}
              id={item.title.toLowerCase().replace(/\s+/g, "-")} // Generate ID
            />
          ))}

          <section className="border border-white p-4 mt-12">
            <h2 className="text-3xl font-bold text-center mb-4">
              Object properties
            </h2>
            <div className="flex flex-wrap gap-x-7 gap-y-0">
              {[
                "causes harm",
                "has analyzed risk",
                "has device context",
                "has device component",
                "has device problem",
                "has domain specific hazard",
                "has event",
                "has device function",
                "has harm",
                "has hazard",
                "has hazardous situation",
                "has implementation manifest",
                "has patient problem",
                "has parent hazard",
                "has parent situation",
                "has residual risk level",
                "has initial risk level",
                "has risk level",
                "Risk SDA",
                "has preceding event",
                "SDA",
                "has safety assurance",
                "has sub SDA",
                "is mitigated by",
                "is part of device component",
                "has probability",
                "has Probability1",
                "has Probability2",
                "has Severity",
              ].map((classItem) => (
                <a
                  key={classItem}
                  href={`#${classItem.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-[#00bd7e] hover:underline whitespace-nowrap"
                >
                  {classItem}
                </a>
              ))}
            </div>
          </section>
          {ontologyData2.map((item, index) => (
            <ClassCard2
              key={index}
              title={item.title}
              iri={item.iri}
              description={item.description || ""}
              subclassOf={item.subclassOf}
              superclassOf={item.superclassOf}
              domainOf={item.domainOf}
              rangeOf={item.rangeOf}
              id={item.title.toLowerCase().replace(/\s+/g, "-")} // Generate ID
            />
          ))}

          <div className="border-b-2 my-12 border-white"></div>

          <h2 className="text-3xl font-bold text-center mb-4">
            Extension of the Riskman Ontology for Security
          </h2>
          <p className={"text-l font-bold text-center mb-4"}>
            Experimental section
          </p>

          <div className="border-b-2 my-12 border-white"></div>

          <div className="lg:w-1/3">
            <h2 className="text-2xl font-semibold pb-2 mb-4">Metadata:</h2>
            <ul className="space-y-1 ml-5">
              <li>
                <span className="font-bold">Documentation:</span>{" "}
                <a
                  href="https://w3id.org/riskman"
                  className="text-[#00bd7e] hover:underline"
                >
                  https://w3id.org/riskman
                </a>
              </li>
              <li>
                <span className="font-bold">Ontology:</span>{" "}
                <a
                  href="https://w3id.org/riskman/ontology/security"
                  className="text-[#00bd7e] hover:underline"
                >
                  https://w3id.org/riskman/ontology/security
                </a>
              </li>
              <li>
                <span className="font-bold">Shapes:</span>{" "}
                <a
                  href="https://w3id.org/riskman/shapes/security"
                  className="text-[#00bd7e] hover:underline"
                >
                  https://w3id.org/riskman/shapes/security
                </a>
              </li>
              <li>
                <span className="font-bold">GitHub repo:</span>{" "}
                <a
                  href="https://w3id.org/riskman/repo"
                  className="text-[#00bd7e] hover:underline"
                >
                  https://w3id.org/riskman/repo
                </a>
              </li>
            </ul>
            <div className="mt-4 text-lg text-gray-400 ml-5">
              <p>Creation date: 2024-08-20</p>
              <p>Modification date: 2024-11-17</p>
            </div>
          </div>

          <div className="border-b-2 my-12 border-white"></div>

          <h2 className="text-3xl font-bold  mb-4">Description:</h2>
          <p className="pl-5 text-gray-300">
            An extension of the Riskman ontology that also takes in account
            security aspects of medical devices.
          </p>

          <section className="border border-white p-4 mt-12">
            <h2 className="text-3xl font-bold text-center mb-4">Classes</h2>
            <div className="flex flex-wrap gap-x-7 gap-y-0">
              {[
                "Security hazard",
                "Analyzed security risk",
                "Controlled security risk",
                "Justification",
                "Risk level needing justification",
              ].map((classItem) => (
                <a
                  key={classItem}
                  href={`#${classItem.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-[#00bd7e] hover:underline whitespace-nowrap"
                >
                  {classItem}
                </a>
              ))}
            </div>
          </section>

          {ontologyData3.map((item, index) => (
            <ClassCard
              key={index}
              title={item.title}
              iri={item.iri}
              description={item.description || ""}
              subclassOf={item.subclassOf}
              superclassOf={item.superclassOf}
              domainOf={item.domainOf}
              rangeOf={item.rangeOf}
              id={item.title.toLowerCase().replace(/\s+/g, "-")} // Generate ID
            />
          ))}
          <section className="border border-white p-4 mt-12">
            <h2 className="text-3xl font-bold text-center mb-4">
              Object properties
            </h2>
            <div className="flex flex-wrap gap-x-7 gap-y-0">
              {[
                "has initial risk level justification",
                "has residual risk level justification",
              ].map((classItem) => (
                <a
                  key={classItem}
                  href={`#${classItem.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-[#00bd7e] hover:underline whitespace-nowrap"
                >
                  {classItem}
                </a>
              ))}
            </div>
          </section>
          {ontologyData4.map((item, index) => (
            <ClassCard2
              key={index}
              title={item.title}
              iri={item.iri}
              subclassOf={item.subclassOf}
              superclassOf={item.superclassOf}
              domainOf={item.domainOf}
              rangeOf={item.rangeOf}
              id={item.title.toLowerCase().replace(/\s+/g, "-")} // Generate ID
            />
          ))}
          <section className="border border-white p-4 mt-12">
            <h2 className="text-3xl font-bold text-center mb-4">
              Named individuals
            </h2>
            <div className="flex flex-wrap gap-x-7 gap-y-0">
              {["Availability", "Confidentiality", "Integrity"].map(
                (classItem) => (
                  <a
                    key={classItem}
                    href={`#${classItem.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-[#00bd7e] hover:underline whitespace-nowrap"
                  >
                    {classItem}
                  </a>
                )
              )}
            </div>
          </section>
          {ontologyData5.map((item, index) => (
            <ClassCard2
              key={index}
              title={item.title}
              iri={item.iri}
              classs={item.classs}
              id={item.title.toLowerCase().replace(/\s+/g, "-")} // Generate ID
            />
          ))}

          <div className="text-center justify-center mt-12 mb-11">
            Made with <span className="text-[#00bd7e]">ontoglimpse</span> in
            Dresden.
          </div>
        </div>
      </div>
    </>
  );
}
