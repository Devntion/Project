import { createFileRoute } from "@tanstack/react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import OntologyDataset from "../components/OntologyDataset";
import GitGraphDataset from "../components/GitGraphDataset";

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

          {/* Git Graph Data Section */}
          <section className="border border-border-primary p-4 mt-12">
            <GitGraphDataset />
          </section>

          <Footer />
        </div>
      </div>
    </>
  );
}
