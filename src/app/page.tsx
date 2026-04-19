import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="text-center py-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to STM Portal
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Your gateway to news, reports, and system insights
        </p>
      </section>

      <div className="grid md:grid-cols-3 gap-6">
        <Link 
          href="/newspaper"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="text-3xl mb-3">📰</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Interactive Newspaper
          </h3>
          <p className="text-gray-600">
            Rate news items and help DeepThroat learn your preferences
          </p>
        </Link>

        <Link 
          href="/reports"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="text-3xl mb-3">📊</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Reports Showcase
          </h3>
          <p className="text-gray-600">
            Browse all DevOp analysis work with grades and filters
          </p>
        </Link>

        <Link 
          href="/system"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="text-3xl mb-3">🧠</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Stan's Inner System
          </h3>
          <p className="text-gray-600">
            Visual diagrams showing how Stan works
          </p>
        </Link>
      </div>

      <section className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Quick Stats</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-devop-blue">247</div>
            <div className="text-sm text-gray-600">News Items Rated</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-3xl font-bold text-devop-purple">89</div>
            <div className="text-sm text-gray-600">Reports Published</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-success-green">94%</div>
            <div className="text-sm text-gray-600">Accuracy Rate</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-3xl font-bold text-warning-yellow">12</div>
            <div className="text-sm text-gray-600">Active Projects</div>
          </div>
        </div>
      </section>
    </div>
  );
}
