import React, {useEffect, useState} from 'react';
import ClassCard from "../utils/class";
import ClassCard2 from "../utils/class2";

type Entity = {
    name: string;
    type: 'class' | 'objectProperty' | 'dataProperties' | 'namedIndividual';
    section: 'main';
};

// @ts-ignore
type Metadata = {
    title: string;
    subtitle: string;
    description: string;
    abstract?: string;
    links: {
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
    const [ontologyData, setOntologyData] = useState<OntologyData[]>([]);
    const [ontologyData2, setOntologyData2] = useState<OntologyData[]>([]);
    const [ontologyData3, setOntologyData3] = useState<OntologyData[]>([]);

    useEffect(() => {
        // Fetch entities data
        fetch("/entities.json")
            .then(response => response.json())
            .then(data => {
                setEntities(data.entities);
            })
            .catch(error => console.error("Error fetching entities:", error));

        // Fetch data.json
        fetch("/data.json")
            .then((response) => response.json())
            .then((data) => {
                console.log("data.json loaded:", data);
                setOntologyData(data.data1 || []);
                setOntologyData2(data.data2 || []);
                setOntologyData3(data.data3 || []);
            })
            .catch(error => console.error("Error fetching data.json:", error));
    }, []);

    // Filter entities by type
    const classes = entities.filter(e => e.type === 'class');
    const objectProperties = entities.filter(e => e.type === 'objectProperty');
    const dataProperties = entities.filter(e => e.type === 'dataProperties');
    const namedIndividuals = entities.filter(e => e.type === 'namedIndividual');

    if (entities.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {/* Classes Section */}
            <section className="border border-border-primary p-4 mt-12">
                <h2 className="text-3xl font-bold text-center mb-4">Classes</h2>
                <div className="flex flex-wrap gap-x-7 gap-y-0">
                    {classes.map((classItem) => (
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
                    Object Properties
                </h2>
                <div className="flex flex-wrap gap-x-7 gap-y-0">
                    {objectProperties.map((property) => (
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

            {/* Data Properties Section */}
            <section className="border border-border-primary p-4 mt-12">
                <h2 className="text-3xl font-bold text-center mb-4">
                    Data Properties
                </h2>
                <div className="flex flex-wrap gap-x-7 gap-y-0">
                    {dataProperties.map((property) => (
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

            {ontologyData3.map((item, index) => (
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

            {/* Named Individuals Section */}
            {namedIndividuals.length > 0 && (
                <section className="border border-border-primary p-4 mt-12">
                    <h2 className="text-3xl font-bold text-center mb-4">
                        Named Individuals
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
            )}
        </div>
    );
};

export default OntologyDataset; 