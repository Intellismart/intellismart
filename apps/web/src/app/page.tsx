export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              IntelliSMART
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
              AI-powered business solutions for the modern enterprise. Intelligent agents, smart marketplace, and seamless e-commerce.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gold hover:bg-gold/90 text-black px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
                Get Started
              </button>
              <button className="border-2 border-gold text-gold hover:bg-gold hover:text-black px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
                View Marketplace
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose IntelliSMART?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive solutions designed for small and medium businesses
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-blue rounded-lg mb-6 flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">AI Agents</h3>
              <p className="text-gray-600">
                Intelligent automation for customer service, data processing, and workflow optimization.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-gold rounded-lg mb-6 flex items-center justify-center">
                <span className="text-2xl">🛒</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">E-commerce</h3>
              <p className="text-gray-600">
                Complete online store solution with inventory management and payment processing.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-silver rounded-lg mb-6 flex items-center justify-center">
                <span className="text-2xl">💼</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Marketplace</h3>
              <p className="text-gray-600">
                Connect with service providers and find the perfect solutions for your business needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Join thousands of businesses already using IntelliSMART to streamline operations and boost productivity.
          </p>
          <button className="bg-gold hover:bg-gold/90 text-black px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
            Start Free Trial
          </button>
        </div>
      </section>
    </div>
  )
}
