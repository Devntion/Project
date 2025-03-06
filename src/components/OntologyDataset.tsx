import React, {useEffect, useState} from 'react';
import ClassCard from "../utils/class";
import ClassCard2 from "../utils/class2";

type Entity = {
    name: string;
    type: 'class' | 'objectProperty' | 'namedIndividual';
    section: 'main' | 'security';
};

type Metadata = {
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
};

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

const OntologyDataset: React.FC = () => {
    const [entities, setEntities] = useState<Entity[]>([]);
    const [securityMetadata, setSecurityMetadata] = useState<Metadata | null>(null);
    const [ontologyData, setOntologyData] = useState<OntologyData[]>([]);
    const [ontologyData2, setOntologyData2] = useState<OntologyData[]>([]);
    const [ontologyData3, setOntologyData3] = useState<OntologyData[]>([]);
    const [ontologyData4, setOntologyData4] = useState<OntologyData[]>([]);
    const [ontologyData5, setOntologyData5] = useState<OntologyData[]>([]);

    useEffect(() => {
        // Fetch entities data
        fetch("/entities.json")
            .then(response => response.json())
            .then(data => {
                setEntities(data.entities);
            })
            .catch(error => console.error("Error fetching entities:", error));

        // Fetch metadata
        fetch("/metadata.json")
            .then(response => response.json())
            .then(data => {
                setSecurityMetadata(data.securityMetadata);
            })
            .catch(error => console.error("Error fetching metadata:", error));

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
    }, []);

    // Filter entities by type and section
    const mainClasses = entities.filter(e => e.type === 'class' && e.section === 'main');
    const mainObjectProperties = entities.filter(e => e.type === 'objectProperty' && e.section === 'main');
    const securityClasses = entities.filter(e => e.type === 'class' && e.section === 'security');
    const securityObjectProperties = entities.filter(e => e.type === 'objectProperty' && e.section === 'security');
    const namedIndividuals = entities.filter(e => e.type === 'namedIndividual');

    const renderLinks = (metadata: Metadata) => (
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

    const renderDates = (metadata: Metadata) => (
        <div className="mt-4 text-lg text-gray-400 ml-5">
            <p>Creation date: {metadata.dates.creation}</p>
            <p>Modification date: {metadata.dates.modification}</p>
        </div>
    );

    if (!securityMetadata || entities.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div>
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
        </div>
    );
};

export default OntologyDataset; 