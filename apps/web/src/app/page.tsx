import { Hero } from "@/components/Hero";
import { ApplicationForm } from "@/features/application-form/components/ApplicationForm";

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
