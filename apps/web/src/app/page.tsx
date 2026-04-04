import { ApplicationForm } from "@/components/ApplicationForm";
import { Hero } from "@/components/Hero";

export default function HomePage() {
  return (
    <main className="page-shell">
      <div className="container">
        <Hero />
        <ApplicationForm />
      </div>
    </main>
  );
}
