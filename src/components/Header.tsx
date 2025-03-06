import React, {useEffect, useState} from 'react';
import TopImage from "/logo.svg";

type Author = {
    name: string;
    affiliation: string;
    role: 'creator' | 'contributor';
    link: string;
};

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
                <span className="font-bold">GitHub repo:</span>{" "}
                <a href={metadata.links.github} className="text-primary hover:underline">
                    {metadata.links.github}
                </a>
            </li>
        </ul>
    );

    const renderDates = (metadata: Metadata) => (
        <div className="mt-4 text-lg text-primary ml-5">
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
                <img src={TopImage} alt="SemRepo Logo" className="h-24"/>
                <div className="flex-1 text-center">
                    <h1 className="text-3xl font-bold text-text-primary">
                        {mainMetadata.title}
                    </h1>
                    <p className="mt-2 text-text-primary">
                        {mainMetadata.subtitle}
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
                                <div className="px-3 py-1 border border-green-500 text-text-primary rounded">
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
                                    <a href={creator.link} target="_blank" rel="noopener noreferrer"
                                       className="hover:underline">
                                        {`${creator.name} (${creator.affiliation})`}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contributors Section */}
                    {contributors.length > 0 && (
                        <div className="lg:w-1/3 lg:mt-5 mt-8">
                            <h2 className="text-2xl font-semibold pb-2 mb-4">
                                Contributors:
                            </h2>
                            <ul className="space-y-0 ml-5">
                                {contributors.map((contributor, index) => (
                                    <li key={index} className="text-text-primary">
                                        <a href={contributor.link} target="_blank" rel="noopener noreferrer"
                                           className="hover:underline">
                                            {`${contributor.name} (${contributor.affiliation})`}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </section>

            {/* Description Section */}
            {mainMetadata.description && (
                <section className="mb-8">
                    <div className="border-b-2 border-border-separator"></div>
                    <h2 className="text-2xl font-semibold pb-2 mb-4 pt-5">
                        Description:
                    </h2>
                    <p className="ml-6 text-primary">
                        {mainMetadata.description}
                    </p>
                </section>
            )}

            {/* Abstract Section */}
            {mainMetadata.abstract && (
                <section>
                    <h2 className="text-2xl font-semibold pb-2 mb-4">Abstract:</h2>
                    <p className="pl-5 text-primary">
                        {mainMetadata.abstract}
                    </p>
                </section>
            )}
        </>
    );
};

export default Header; 