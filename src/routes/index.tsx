import {createFileRoute} from '@tanstack/react-router'
import TopImage from '../../public/logo.png'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <>
      <div className="bg-[#181818] min-h-screen p-8 font-sans text-[#EBEBEBA3]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between border-b-2 border-white pb-4 mb-6">
  <img src={TopImage} alt="Riskman Ontology Logo" className="h-20" />
  <div className="flex-1 text-center">
    <h1 className="text-3xl font-bold text-[#EBEBEBA3]">The Riskman Ontology</h1>
    <p className="mt-2 text-[#EBEBEBA3]">Digital Risk Management Ontology</p>
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
          <a href="https://w3id.org/riskman" className="text-blue-400 hover:underline">
            https://w3id.org/riskman
          </a>
        </li>
        <li>
          <span className="font-bold">Ontology:</span>{" "}
          <a href="https://w3id.org/riskman/ontology" className="text-blue-400 hover:underline">
            https://w3id.org/riskman/ontology
          </a>
        </li>
        <li>
          <span className="font-bold">Shapes:</span>{" "}
          <a href="https://w3id.org/riskman/shapes" className="text-blue-400 hover:underline">
            https://w3id.org/riskman/shapes
          </a>
        </li>
        <li>
          <span className="font-bold">GitHub repo:</span>{" "}
          <a href="https://w3id.org/riskman/repo" className="text-blue-400 hover:underline">
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
<div className='border-b-2 border-white'></div>
  <div className="flex flex-col lg:flex-row">
        {/* Creators Section */}
        
        <div className="lg:w-1/3">
          <h2 className="text-2xl font-semibold pb-2 mb-4 pt-5">Creators:</h2>
          <ul className="space-y-1 ml-5">
            {[
              "Dörthe Arndt (ICCL, TU Dresden)",
              "Martin Diller (ICCL, TU Dresden)",
              "Piotr Gorczyca (ICCL, TU Dresden)",
              "Pascal Kettmann (ICCL, TU Dresden)",
              "Stephan Mennicke (ICCL, TU Dresden)",
              "Hannes Straß (ICCL, TU Dresden)",
            ].map((creator, index) => (
              <li key={index} className="text-green-400">
                {creator}
              </li>
            ))}
          </ul>
        </div>

        {/* Contributors Section */}
        <div className="lg:w-1/3 lg:mt-4 mt-8">
          <h2 className="text-2xl font-semibold  pb-2 mb-4">Contributors:</h2>
          <ul className="space-y-1 ml-5">
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
          <div className='border-b-2 border-white'></div>
          <h2 className="text-2xl font-semibold pb-2 mb-4 pt-5">Description:</h2>
          <p className=" ml-6 text-gray-300">
            The Riskman Ontology defines various notions related to risk management for medical devices.
          </p>
        </section>

        {/* Abstract Section */}
        <section>
          <h2 className="text-2xl font-semibold pb-2 mb-4">Abstract:</h2>
          <p className="pl-5 text-gray-300">
            The Riskman Ontology defines various notions related to risk management for medical devices. It
            builds on terms from ISO 14971. The central notion of the Riskman ontology is that of a Safe
            Design Argument (SDA), a reusable artifact that aims to demonstrate how a specific hazard
            occurring with a device has been mitigated (possibly using further context information and
            assumptions).
          </p>
        </section>
      </div>
    </div>

    </>
  )
}
