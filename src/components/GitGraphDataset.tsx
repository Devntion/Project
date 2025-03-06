import React from 'react';

const GitGraphDataset: React.FC = () => {
  return (
    <div className="text-text-primary">
      <h2 className="text-3xl font-bold text-center mb-4">GitGraph Dataset</h2>
      
      <div className="mb-8">
        <div className="flex justify-center">
          <a 
            href="https://raw.githubusercontent.com/abdulrafay97/Code-Resuse/main/links.txt" 
            download="links.txt" 
            className="px-3 py-1 border border-primary text-primary rounded hover:underline"
          >
            Download VoID file
          </a>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold pb-2 mb-4">Overview</h2>
        <p className="ml-6 text-gray-300">
          This dataset provides information related to Git Graph, its contributors, and associated metadata.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold pb-2 mb-4">Dataset Information</h2>
        <ul className="space-y-1 ml-5">
          <li>
            <span className="font-bold">Title:</span>{" "}
            <span className="text-gray-300">GitGraph</span>
          </li>
          <li>
            <span className="font-bold">Homepage:</span>{" "}
            <a href="https://gitgraph.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              gitgraph.com
            </a>
          </li>
          <li>
            <span className="font-bold">Sparql Endpoint:</span>{" "}
            <a href="https://gitgraph.com/sparql" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              gitgraph.com/sparql
            </a>
          </li>
          <li>
            <span className="font-bold">Last Modified:</span>{" "}
            <span className="text-gray-300">2025-03-10</span>
          </li>
          <li>
            <span className="font-bold">Source:</span>{" "}
            <a href="https://github.com/abdulrafay97/gitgraph" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              GitHub Repository
            </a>
          </li>
          <li>
            <span className="font-bold">License:</span>{" "}
            <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              CC BY-SA 4.0
            </a>
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold pb-2 mb-4">Subjects</h2>
        <ul className="space-y-1 ml-5">
          {[
            { name: "Computer Science", url: "http://dbpedia.org/resource/Computer_science" },
            { name: "Knowledge Graph", url: "http://dbpedia.org/resource/Knowledge_graph" },
            { name: "Resource Description Framework", url: "http://dbpedia.org/resource/Resource_Description_Framework" }
          ].map((subject, index) => (
            <li key={index}>
              <a href={subject.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {subject.name}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold pb-2 mb-4">Features</h2>
        <ul className="space-y-1 ml-5">
          <li className="text-gray-300">Supports <strong>N-Triples</strong> format</li>
          <li className="text-gray-300">Supports <strong>Turtle</strong> format</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold pb-2 mb-4">Vocabulary</h2>
        <ul className="space-y-1 ml-5">
          {[
            { name: "FOAF", url: "http://xmlns.com/foaf/0.1/" },
            { name: "XML Schema", url: "http://www.w3.org/2001/XMLSchema#" },
            { name: "RDF Syntax", url: "http://www.w3.org/1999/02/22-rdf-syntax-ns#" },
            { name: "RDF Schema", url: "http://www.w3.org/2000/01/rdf-schema#" },
            { name: "Dublin Core Terms", url: "http://purl.org/dc/terms/" },
            { name: "Fabio Ontology", url: "http://purl.org/spar/fabio/" },
            { name: "Linked Papers with Code Ontology", url: "https://linkedpaperswithcode.com/ontology#" },
            { name: "DBpedia Properties", url: "http://dbpedia.org/property/" },
            { name: "OWL", url: "http://www.w3.org/2002/07/owl#" }
          ].map((vocab, index) => (
            <li key={index}>
              <a href={vocab.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {vocab.name}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold pb-2 mb-4">Contributors</h2>
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/3">
            <ul className="space-y-1 ml-5">
              <li className="text-primary">
                Michael Färber (TU Dresden)
                <div className="text-sm text-gray-300">
                  <a href="mailto:michael.faerber@tu-dresden.de" className="hover:underline">michael.faerber@tu-dresden.de</a>
                  <br />
                  <a href="https://scads.ai/about-us/ai-professorships/scalable-software-architectures-for-data-analytics/" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="hover:underline">
                    Homepage
                  </a>
                </div>
              </li>
              <li className="text-primary mt-4">
                Abdul Rafay (TU Dresden)
                <div className="text-sm text-gray-300">
                  <a href="mailto:abdul.rafay@mailbox.tu-dresden.de" className="hover:underline">
                    abdul.rafay@mailbox.tu-dresden.de
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GitGraphDataset; 