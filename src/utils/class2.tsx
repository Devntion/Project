import React from "react";

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

const ClassCard2: React.FC<ClassCardProps> = ({
  title,
  iri,
  description,
  subclassOf,
  superclassOf,
  domainOf,
  rangeOf,
  id,
}) => {
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

      <div className="border-dashed border p-2 border-white-100 space-y-0 mt-4 ml-3 mb-3">
        {subclassOf && subclassOf.length > 0 && (
          <>
            <p>
              <span className="text-sm">SubProperty of:</span>
            </p>
            <ul className="list-disc list-inside ml-4">
              {subclassOf.map((item, index) => (
                <li key={index} className="text-[#00bd7e]">{item}</li>
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
                <li key={index} className="text-[#00bd7e]">{item}</li>
              ))}
            </ul>
          </>
        )}

        {domainOf && domainOf.length > 0 && (
          <>
            <p>
              <span className="text-sm">Domain:</span>
            </p>
            <ul className="list-disc list-inside ml-4">
              {domainOf.map((item, index) => (
                <li key={index} className="text-[#00bd7e]">{item}</li>
              ))}
            </ul>
          </>
        )}

         {rangeOf && rangeOf.length > 0 && (
          <>
            <p>
              <span className="text-sm">Range:</span>
            </p>
            <ul className="list-disc list-inside ml-4">
              {rangeOf.map((item, index) => (
                <li key={index} className="text-[#00bd7e]">{item}</li>
              ))}
            </ul>
          </>
        )} 
      </div>
    </section>
  );
};

export default ClassCard2;
