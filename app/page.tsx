import Link from "next/link";
import { Leaf, BarChart3, Repeat2, BookOpen } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-leaf-50 via-white to-earth-50">
      {/* Nav */}
      <nav className="px-6 py-4 flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-leaf-700 text-xl">
          <Leaf className="w-6 h-6 text-leaf-500" />
          GreenPlate
        </div>
        <Link
          href="/sign-in"
          className="bg-leaf-600 hover:bg-leaf-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-colors"
        >
          Get started
        </Link>
      </nav>

      {/* Hero */}
      <main className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-block bg-leaf-100 text-leaf-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          🌍 Your plate, your planet
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
          Know the carbon cost
          <br />
          <span className="text-leaf-600">of every bite.</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
          Log what you eat, see your carbon footprint in seconds, and discover
          swaps that are both healthier <em>and</em> greener — without the guilt trip.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/sign-in"
            className="bg-leaf-600 hover:bg-leaf-700 text-white px-8 py-3.5 rounded-full font-semibold text-lg transition-colors shadow-lg shadow-leaf-200"
          >
            Start tracking for free
          </Link>
          <Link
            href="#how"
            className="border border-gray-200 hover:border-leaf-300 text-gray-700 px-8 py-3.5 rounded-full font-semibold text-lg transition-colors"
          >
            How it works
          </Link>
        </div>
      </main>

      {/* Features */}
      <section id="how" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          How GreenPlate works
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Leaf className="w-7 h-7 text-leaf-500" />,
              title: "Log your meals",
              body: "Type any food — from 'beef burger' to 'oat milk latte'. We handle 150+ ingredients with instant carbon estimates.",
            },
            {
              icon: <BarChart3 className="w-7 h-7 text-leaf-500" />,
              title: "See your footprint",
              body: "A live carbon meter shows your daily, weekly, and monthly CO₂e. Watch the trend move as you make smarter choices.",
            },
            {
              icon: <Repeat2 className="w-7 h-7 text-leaf-500" />,
              title: "Discover green swaps",
              body: "Swap beef for lentils? We'll show you exactly how much carbon and calories you'd save — with healthy alternatives.",
            },
            {
              icon: <BookOpen className="w-7 h-7 text-leaf-500" />,
              title: "Learn with fun facts",
              body: "Daily cards give you honest, encouraging climate facts — never preachy, always interesting (rubber ducks may be involved).",
            },
          ].map((f) => (
            <div key={f.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-leaf-50 rounded-xl flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats banner */}
      <section className="bg-leaf-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
          {[
            { stat: "26%", label: "of global emissions come from food" },
            { stat: "5×", label: "less CO₂ from plants vs meat" },
            { stat: "1 swap", label: "per day can save 500 kg CO₂/year" },
          ].map((s) => (
            <div key={s.stat}>
              <div className="text-4xl font-bold mb-2">{s.stat}</div>
              <div className="text-leaf-200 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA footer */}
      <footer className="text-center py-20 px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Your plate, your planet, your choice.
        </h2>
        <p className="text-gray-500 mb-8">Start tracking in 30 seconds. No credit card needed.</p>
        <Link
          href="/sign-in"
          className="bg-leaf-600 hover:bg-leaf-700 text-white px-8 py-3.5 rounded-full font-semibold text-lg transition-colors"
        >
          Sign up free
        </Link>
        <p className="text-gray-400 text-sm mt-12">
          © {new Date().getFullYear()} GreenPlate — Made with 🌱 for the planet
        </p>
      </footer>
    </div>
  );
}
