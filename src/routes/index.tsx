import { createFileRoute } from "@tanstack/react-router";
import ClassCard from "../utils/class";
import ClassCard2 from "../utils/class2";
import { useEffect, useState } from "react";
import { entities } from "../data/entities";
import { mainMetadata, securityMetadata } from "../data/metadata";
import GitGraphDataset from "../components/GitGraphDataset";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
  const [additionalData1, setAdditionalData1] = useState<OntologyData[]>([]);
  const [additionalData2, setAdditionalData2] = useState<OntologyData[]>([]);
  const [additionalData3, setAdditionalData3] = useState<OntologyData[]>([]);

  // Filter entities by type and section
  const mainClasses = entities.filter(e => e.type === 'class' && e.section === 'main');
  const mainObjectProperties = entities.filter(e => e.type === 'objectProperty' && e.section === 'main');
  const securityClasses = entities.filter(e => e.type === 'class' && e.section === 'security');
  const securityObjectProperties = entities.filter(e => e.type === 'objectProperty' && e.section === 'security');
  const namedIndividuals = entities.filter(e => e.type === 'namedIndividual');


  useEffect(() => {
    // Fetch data.json
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        console.log("data.json loaded:", data);
        setOntologyData(data.data1 || []);
        setOntologyData2(data.data2 || []);
        setOntologyData3(data.data3 || []);
        setOntologyData4(data.data4 || []);
        setOntologyData5(data.data5 || []);
      })
      .catch(error => console.error("Error fetching data.json:", error));

    // Fetch data2.json
    fetch("/data2.json")
      .then((response) => {
        console.log("data2.json response status:", response.status);
        return response.json();
      })
      .then((data) => {
        console.log("data2.json loaded:", data);
        setAdditionalData1(data.data1 || []);
        setAdditionalData2(data.data2 || []);
        setAdditionalData3(data.data3 || []);
      })
      .catch(error => console.error("Error fetching data2.json:", error));
  }, []);

  const renderLinks = (metadata: typeof mainMetadata) => (
    <ul className="space-y-1 ml-5">
      <li>
        <span className="font-bold">Documentation:</span>{" "}
        <a href={metadata.links.documentation} className="text-primary hover:underline">
          {metadata.links.documentation}
        </a>
      </li>
      <li>
        <span className="font-bold">Ontology:</span>{" "}
        <a href={metadata.links.ontology} className="text-primary hover:underline">
          {metadata.links.ontology}
        </a>
      </li>
      <li>
        <span className="font-bold">Shapes:</span>{" "}
        <a href={metadata.links.shapes} className="text-primary hover:underline">
          {metadata.links.shapes}
        </a>
      </li>
      <li>
        <span className="font-bold">GitHub repo:</span>{" "}
        <a href={metadata.links.github} className="text-primary hover:underline">
          {metadata.links.github}
        </a>
      </li>
    </ul>
  );

  const renderDates = (metadata: typeof mainMetadata) => (
    <div className="mt-4 text-lg text-gray-400 ml-5">
      <p>Creation date: {metadata.dates.creation}</p>
      <p>Modification date: {metadata.dates.modification}</p>
    </div>
  );

  return (
    <>
      <div className="bg-background min-h-screen p-8 font-sans text-text-primary">
        <div className="max-w-6xl mx-auto">
          <Header />

          {/* Classes Section */}
          <section className="border border-border-primary p-4 mt-12">
            <h2 className="text-3xl font-bold text-center mb-4">Classes</h2>
            <div className="flex flex-wrap gap-x-7 gap-y-0">
              {mainClasses.map((classItem) => (
                <a
                  key={classItem.name}
                  href={`#${classItem.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-primary hover:underline whitespace-nowrap"
                >
                  {classItem.name}
                </a>
              ))}
            </div>
          </section>

          {/* Detailed Class Section */}
          <section
            className="border border-border-primary p-1 mt-12"
            id="#analyzed-risk"
          >
            <h3 className="text-lg ">Analyzed risk</h3>
            <div className="border border-border-primary"></div>

            <p className=" break-words mt-4 text-sm ">
              IRI:{" "}
              <i>
                <a
                  href="https://w3id.org/riskman/ontology#AnalyzedRisk"
                  className="text-primary hover:underline"
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
            <div className="border-dashed border border-border-dashed p-2 space-y-0 mt-4 ml-3 mb-3">
              <p>
                <span className="text-sm">Superclass of:</span>
              </p>
              <ul className="list-disc  ml-8">
                <li className="text-primary">
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
                <li className="text-primary">
                  <a href="#has-device-context">has device context</a>
                </li>
                <li className="text-primary">
                  <a href="#has-domain-specific-hazard">
                    has domain specific hazard
                  </a>
                </li>
                <li className="text-primary">
                  <a href="#has-hazardous-situation">has hazardous situation</a>
                </li>
                <li className="text-primary">
                  <a href="#has-patient-problem">has patient problem</a>
                </li>
                <li className="text-primary">
                  <a href="#has-initial-risk-level">has initial risk level</a>
                </li>
              </ul>
              <p>
                <span className="text-sm">Range of:</span>
              </p>
              <ul className="list-disc list-inside ml-4">
                <a href="#has-analyzed-risk">
                  <li className="text-primary">has analyzed risk</li>
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
              id={item.title.toLowerCase().replace(/\s+/g, "-")}
            />
          ))}

          {/* Object Properties Section */}
          <section className="border border-border-primary p-4 mt-12">
            <h2 className="text-3xl font-bold text-center mb-4">
              Object properties
            </h2>
            <div className="flex flex-wrap gap-x-7 gap-y-0">
              {mainObjectProperties.map((property) => (
                <a
                  key={property.name}
                  href={`#${property.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-primary hover:underline whitespace-nowrap"
                >
                  {property.name}
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
              id={item.title.toLowerCase().replace(/\s+/g, "-")}
            />
          ))}

          <div className="border-b-2 my-12 border-border-separator"></div>

          <h2 className="text-3xl font-bold text-center mb-4">
            {securityMetadata.title}
          </h2>
          <p className={"text-l font-bold text-center mb-4"}>
            Experimental section
          </p>

          <div className="border-b-2 my-12 border-border-separator"></div>

          <div className="lg:w-1/3">
            <h2 className="text-2xl font-semibold pb-2 mb-4">Metadata:</h2>
            {renderLinks(securityMetadata)}
            {renderDates(securityMetadata)}
          </div>

          <div className="border-b-2 my-12 border-border-separator"></div>

          <h2 className="text-3xl font-bold mb-4">Description:</h2>
          <p className="pl-5 text-gray-300">
            {securityMetadata.description}
          </p>

          {/* Security Classes Section */}
          <section className="border border-border-primary p-4 mt-12">
            <h2 className="text-3xl font-bold text-center mb-4">Classes</h2>
            <div className="flex flex-wrap gap-x-7 gap-y-0">
              {securityClasses.map((classItem) => (
                <a
                  key={classItem.name}
                  href={`#${classItem.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-primary hover:underline whitespace-nowrap"
                >
                  {classItem.name}
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
              id={item.title.toLowerCase().replace(/\s+/g, "-")}
            />
          ))}

          {/* Security Object Properties Section */}
          <section className="border border-border-primary p-4 mt-12">
            <h2 className="text-3xl font-bold text-center mb-4">
              Object properties
            </h2>
            <div className="flex flex-wrap gap-x-7 gap-y-0">
              {securityObjectProperties.map((property) => (
                <a
                  key={property.name}
                  href={`#${property.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-primary hover:underline whitespace-nowrap"
                >
                  {property.name}
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
              id={item.title.toLowerCase().replace(/\s+/g, "-")}
            />
          ))}

          {/* Named Individuals Section */}
          <section className="border border-border-primary p-4 mt-12">
            <h2 className="text-3xl font-bold text-center mb-4">
              Named individuals
            </h2>
            <div className="flex flex-wrap gap-x-7 gap-y-0">
              {namedIndividuals.map((individual) => (
                <a
                  key={individual.name}
                  href={`#${individual.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-primary hover:underline whitespace-nowrap"
                >
                  {individual.name}
                </a>
              ))}
            </div>
          </section>

          {ontologyData5.map((item, index) => (
            <ClassCard2
              key={index}
              title={item.title}
              iri={item.iri}
              classs={item.classs}
              id={item.title.toLowerCase().replace(/\s+/g, "-")}
            />
          ))}

          {/* Additional Data Section */}
          <section className="border border-border-primary p-4 mt-12">
            <GitGraphDataset />
            
            {/* Classes */}
            <div className="mb-8">
              {additionalData1.length > 0 && (
                <>
                  {additionalData1.map((item, index) => (
                    <ClassCard2
                      key={index}
                      title={item.title}
                      iri={item.iri}
                      description={item.description || ""}
                      subclassOf={item.subclassOf}
                      superclassOf={item.superclassOf}
                      domainOf={item.domainOf}
                      rangeOf={item.rangeOf}
                      id={item.title.toLowerCase().replace(/\s+/g, "-")}
                    />
                  ))}
                </>
              )}
            </div>

            {/* Object Properties */}
            <div className="mb-8">
              {additionalData2.length > 0 && (
                <>
                  {additionalData2.map((item, index) => (
                    <ClassCard2
                      key={index}
                      title={item.title}
                      iri={item.iri}
                      description={item.description || ""}
                      domainOf={item.domainOf}
                      rangeOf={item.rangeOf}
                      id={item.title.toLowerCase().replace(/\s+/g, "-")}
                    />
                  ))}
                </>
              )}
            </div>

            {/* Additional Properties */}
            <div>
              {additionalData3.length > 0 && (
                <>
                  {additionalData3.map((item, index) => (
                    <ClassCard2
                      key={index}
                      title={item.title}
                      iri={item.iri}
                      description={item.description || ""}
                      domainOf={item.domainOf}
                      rangeOf={item.rangeOf}
                      id={item.title.toLowerCase().replace(/\s+/g, "-")}
                    />
                  ))}
                </>
              )}
            </div>
          </section>

          <Footer />
        </div>
      </div>
    </>
  );
}
