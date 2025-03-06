import { createFileRoute } from "@tanstack/react-router";
import Header from "../components/Header";
import OntologyDataset from "../components/OntologyDataset";
export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <div className="bg-background min-h-screen p-8 font-sans text-text-primary">
        <div className="max-w-6xl mx-auto">
          <Header />

          {/* Ontology Dataset Section */}
          <section className="border border-border-primary p-4 mt-12">
            <OntologyDataset />
          </section>
        </div>
      </div>
    </>
  );
}
