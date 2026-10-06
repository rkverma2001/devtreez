import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PageHero from "../components/ui/PageHero";

export default function NotFoundPage() {
  return (
    <PageHero
      eyebrow="404"
      title="This Branch"
      highlight="Doesn't Exist"
      description="The page you're looking for has moved or never grew here."
    >
      <Link to="/" className="inline-flex items-center gap-2 bg-brand hover:bg-volt text-black font-semibold px-7 py-3.5 rounded-full transition-colors">
        <ArrowLeft size={18} /> Back to home
      </Link>
    </PageHero>
  );
}
