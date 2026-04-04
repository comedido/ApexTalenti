import { ApplicationForm } from "@/components/ApplicationForm";
import { Hero } from "@/components/Hero";
import { SkuCards } from "@/components/SkuCards";

export default function HomePage() {
  return (
    <main className="page-shell">
      <div className="container">
        <Hero />
        <SkuCards />
        <ApplicationForm />
      </div>
    </main>
  );
}
