import React, { useEffect, useState } from 'react';
import TopImage from "/logo.png";

type Author = {
  name: string;
  affiliation: string;
  role: 'creator' | 'contributor';
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

const Header: React.FC = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [mainMetadata, setMainMetadata] = useState<Metadata | null>(null);

  useEffect(() => {
    // Fetch authors data
    fetch("/authors.json")
      .then(response => response.json())
      .then(data => {
        setAuthors(data.authors);
      })
      .catch(error => console.error("Error fetching authors:", error));

    // Fetch metadata
    fetch("/metadata.json")
      .then(response => response.json())
      .then(data => {
        setMainMetadata(data.mainMetadata);
      })
      .catch(error => console.error("Error fetching metadata:", error));
  }, []);

  const creators = authors.filter(a => a.role === 'creator');
  const contributors = authors.filter(a => a.role === 'contributor');

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

  if (!mainMetadata) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* Header */}
      <header className="flex items-center justify-between border-b-2 border-border-separator pb-4 mb-6">
        <img src={TopImage} alt="Riskman Ontology Logo" className="h-20" />
        <div className="flex-1 text-center">
          <h1 className="text-3xl font-bold text-text-primary">
            {mainMetadata.title}
          </h1>
          <p className="mt-2 text-text-primary">
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
            {renderLinks(mainMetadata)}
            {renderDates(mainMetadata)}
          </div>

          {/* License */}
          <div className="lg:w-1/3 lg:mt-0 mt-8">
            <h2 className="text-2xl font-semibold pb-2 mb-4">License:</h2>
            <div className="flex items-center space-x-6 ml-6">
              <a href={mainMetadata.license.url}>
                <div className="px-3 py-1 border border-green-500 text-green-500 rounded">
                  {mainMetadata.license.name}
                </div>
              </a>
              <img
                src={mainMetadata.license.imageUrl}
                alt={mainMetadata.license.name}
                className="h-10"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <div className="border-b-2 border-border-separator"></div>
        <div className="flex flex-col lg:flex-row">
          {/* Creators Section */}
          <div className="lg:w-1/3">
            <h2 className="text-2xl font-semibold pb-2 mb-4 pt-5">
              Creators:
            </h2>
            <ul className="space-y-0 ml-5">
              {creators.map((creator, index) => (
                <li key={index} className="text-primary">
                  {`${creator.name} (${creator.affiliation})`}
                </li>
              ))}
            </ul>
          </div>

          {/* Contributors Section */}
          <div className="lg:w-1/3 lg:mt-5 mt-8">
            <h2 className="text-2xl font-semibold pb-2 mb-4">
              Contributors:
            </h2>
            <ul className="space-y-0 ml-5">
              {contributors.map((contributor, index) => (
                <li key={index} className="text-gray-300">
                  {`${contributor.name} (${contributor.affiliation})`}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="mb-8">
        <div className="border-b-2 border-border-separator"></div>
        <h2 className="text-2xl font-semibold pb-2 mb-4 pt-5">
          Description:
        </h2>
        <p className="ml-6 text-gray-300">
          {mainMetadata.description}
        </p>
      </section>

      {/* Abstract Section */}
      <section>
        <h2 className="text-2xl font-semibold pb-2 mb-4">Abstract:</h2>
        <p className="pl-5 text-gray-300">
          {mainMetadata.abstract}
        </p>
      </section>
    </>
  );
};

export default Header; 