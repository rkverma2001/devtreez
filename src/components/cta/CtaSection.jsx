import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "../ui/Reveal";

export default function CtaSection() {
  const navigate = useNavigate();

  return (
    <section id="get-started" className="relative py-28 lg:py-36 px-6 lg:px-8 scroll-mt-20">
      <Reveal className="max-w-6xl mx-auto">
        <div className="relative rounded-[2.5rem] p-[1px] bg-gradient-to-r from-brand via-volt to-aqua bg-[length:300%_100%] animate-gradient">
          <div className="relative rounded-[2.5rem] bg-ink overflow-hidden px-6 py-16 sm:px-16 sm:py-24 text-center">
            <div className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand/25 blur-[120px]" />

            <div className="relative">
              <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
                Let's Build <br />
                <span className="text-gradient">What's Next.</span>
              </h2>
              <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
                Tell us about your idea. We'll show you how AI, cloud and great engineering can turn it into a product that scales.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  navigate("/contact", { state: { email: new FormData(e.currentTarget).get("email") } });
                }}
                className="mt-10 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
              >
                <input
                  type="email"
                  name="email"
                  aria-label="Your email"
                  placeholder="What's Your Email?"
                  className="flex-1 px-5 py-4 rounded-full bg-white/5 border border-white/15 text-white placeholder:text-gray-500 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/30 transition"
                />
                <button
                  type="submit"
                  className="group flex items-center justify-center gap-2 bg-gradient-to-r from-brand to-volt px-7 py-4 rounded-full font-semibold text-black shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:shadow-[0_0_45px_rgba(181,242,61,0.6)] transition-all duration-300 cursor-pointer"
                >
                  Book a Meeting
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
