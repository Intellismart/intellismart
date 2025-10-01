export default function StorePage() {
  const categories = [
    { name: 'AI Agents', count: 24 },
    { name: 'Smart Office', count: 18 },
    { name: 'Security', count: 12 },
    { name: 'Cloud Services', count: 15 }
  ]

  const products = [
    {
      id: 1,
      name: 'Customer Service AI Agent',
      price: '$49/month',
      rating: 4.8,
      reviews: 127,
      image: '🤖',
      category: 'AI Agents',
      description: 'Automated customer support with natural language processing'
    },
    {
      id: 2,
      name: 'Smart Office Hub',
      price: '$299',
      rating: 4.6,
      reviews: 89,
      image: '🏢',
      category: 'Smart Office',
      description: 'Centralized office management and automation system'
    },
    {
      id: 3,
      name: 'Security Monitoring Suite',
      price: '$79/month',
      rating: 4.9,
      reviews: 156,
      image: '🔒',
      category: 'Security',
      description: 'Comprehensive security monitoring and threat detection'
    },
    {
      id: 4,
      name: 'Cloud Migration Assistant',
      price: '$199',
      rating: 4.7,
      reviews: 73,
      image: '☁️',
      category: 'Cloud Services',
      description: 'Automated cloud migration with minimal downtime'
    }
  ]

  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">IntelliSMART Store</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover powerful AI solutions and smart office tools for your business
          </p>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Categories</h2>
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category.name}
                className="bg-gray-100 hover:bg-gold hover:text-black px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="aspect-square bg-gray-100 flex items-center justify-center text-6xl">
                {product.image}
              </div>
              <div className="p-6">
                <div className="mb-2">
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {product.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>

                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    <span className="text-gold mr-1">★</span>
                    <span className="text-sm font-semibold">{product.rating}</span>
                    <span className="text-sm text-gray-500 ml-1">({product.reviews})</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gold">{product.price}</span>
                  <button className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-gold hover:bg-gold/90 text-black px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
            Load More Products
          </button>
        </div>
      </div>
    </div>
  )
}
