import React from "react";
import { theme } from "../theme/constants";

type ClassCardProps = {
  title: string;
  iri: string;
  description: string;
  subclassOf?: string[];
  superclassOf?: string[];
  domainOf?: string[];
  rangeOf?: string[];
  id: string;
};

const ClassCard: React.FC<ClassCardProps> = ({
  title,
  iri,
  description,
  subclassOf,
  superclassOf,
  domainOf,
  rangeOf,
  id,
}) => {
  // Check if there's any data to display in the dotted border section
  const hasData = (subclassOf && subclassOf.length > 0) || 
                 (superclassOf && superclassOf.length > 0) || 
                 (domainOf && domainOf.length > 0) || 
                 (rangeOf && rangeOf.length > 0);

  return (
    <section className="border border-white-100 p-1 mt-4" id={id}>
      <h3 className="text-lg">{title}</h3>
      <div className="border border-white-100"></div>
      
      <p className="break-words mt-4 text-sm">
        IRI:{" "}
        <i>
          <a href={iri} className="hover:underline">
            {iri}
          </a>
        </i>
      </p>

      <p className="mt-4 font-bold">
        <span>{description}</span>
      </p>

      {hasData && (
        <div className="border-dashed border p-2 border-white-100 space-y-0 mt-4 ml-3 mb-3">
          {subclassOf && subclassOf.length > 0 && (
            <>
              <p>
                <span className="text-sm">Subclass of:</span>
              </p>
              <ul className="list-disc list-inside ml-4">
                {subclassOf.map((item, index) => (
                  <a key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}>
                  <li key={index} className="text-primary">{item}</li>
                  </a>
                ))}
              </ul>
            </>
          )}

          {superclassOf && superclassOf.length > 0 && (
            <>
              <p>
                <span className="text-sm">Superclass of:</span>
              </p>
              <ul className="list-disc list-inside ml-4">
                {superclassOf.map((item, index) => (
                  <a key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}>
                  <li key={index} className="text-primary">{item}</li>
                  </a>
                ))}
              </ul>
            </>
          )}

          {domainOf && domainOf.length > 0 && (
            <>
              <p>
                <span className="text-sm">Domain of:</span>
              </p>
              <ul className="list-disc list-inside ml-4">
                {domainOf.map((item, index) => (
                  <a key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}>
                  <li key={index} className="text-primary">{item}</li>
                  </a>
                ))}
              </ul>
            </>
          )}

          {rangeOf && rangeOf.length > 0 && (
            <>
              <p>
                <span className="text-sm">Range of:</span>
              </p>
              <ul className="list-disc list-inside ml-4">
                {rangeOf.map((item, index) => (
                  <a key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}>
                  <li key={index} className="text-primary">{item}</li>
                  </a>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </section>
  );
};

export default ClassCard;
