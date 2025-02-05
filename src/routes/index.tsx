import { createFileRoute } from "@tanstack/react-router";
import TopImage from "../../public/logo.png";
import ClassCard from "../utils/class";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  type OntologyData = {
    title: string;
    iri: string;
    description: string;
    subclassOf?: string[];
    superclassOf?: string[];
    domainOf?: string[];
    rangeOf?: string[];
  };
  const [ontologyData, setOntologyData] = useState<OntologyData[]>([]);
  useEffect(() => {
    // Fetch the JSON data from the file
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setOntologyData(data));
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
                  <span className="font-bold">CC BY 4.0</span>
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
          <section className="border border-white-100 p-1 mt-12">
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
                  (has domain specific hazard some Thing) and (has harm some
                  Thing) and (has device context some Thing) and (has hazardous
                  situation some Thing) and (has initial risk level some Thing)
                </li>
              </ul>
              <p>
                <span className="text-sm">Domain of:</span>
              </p>
              <ul className="list-disc list-inside ml-4">
                <li className="text-[#00bd7e]">has device context</li>
                <li className="text-[#00bd7e]">has domain specific hazard</li>
                <li className="text-[#00bd7e]">has hazardous situation</li>
                <li className="text-[#00bd7e]">has patient problem</li>
                <li className="text-[#00bd7e]">has initial risk level</li>
              </ul>
              <p>
                <span className="text-sm">Range of:</span>
              </p>
              <ul className="list-disc list-inside ml-4">
                <li className="text-[#00bd7e]">has analyzed risk</li>
              </ul>
            </div>
          </section>
          {ontologyData.map((item, index) => (
            <ClassCard
              key={index}
              title={item.title}
              iri={item.iri}
              description={item.description}
              subclassOf={item.subclassOf}
              superclassOf={item.superclassOf}
              domainOf={item.domainOf}
              rangeOf={item.rangeOf}
              id={item.title.toLowerCase().replace(/\s+/g, "-")} // Generate ID
            />
          ))}
        </div>
      </div>
    </>
  );
}
