export default function NewsPage() {
  const featuredPost = {
    title: 'AI Agents Revolutionizing SMB Operations in 2024',
    excerpt: 'Discover how artificial intelligence is transforming small and medium businesses, from customer service automation to predictive analytics.',
    author: 'Sarah Johnson',
    date: 'December 15, 2024',
    readTime: '5 min read',
    image: '🤖',
    category: 'AI & Technology'
  }

  const blogPosts = [
    {
      title: '5 Essential Security Practices for Modern Businesses',
      excerpt: 'Protect your business with these fundamental cybersecurity measures that every SMB should implement.',
      author: 'Mike Chen',
      date: 'December 12, 2024',
      readTime: '7 min read',
      category: 'Security',
      featured: false
    },
    {
      title: 'Building Your First AI Agent: A Complete Guide',
      excerpt: 'Step-by-step tutorial on creating and deploying your first intelligent agent for business automation.',
      author: 'Alex Rodriguez',
      date: 'December 10, 2024',
      readTime: '12 min read',
      category: 'Tutorials',
      featured: false
    },
    {
      title: 'Cloud Migration Strategies for Growing Businesses',
      excerpt: 'Learn the best practices for migrating your infrastructure to the cloud without disrupting operations.',
      author: 'Emma Thompson',
      date: 'December 8, 2024',
      readTime: '8 min read',
      category: 'Cloud Services',
      featured: false
    },
    {
      title: 'The Future of Smart Office Technology',
      excerpt: 'Exploring how IoT and AI are reshaping the modern workplace for increased productivity and efficiency.',
      author: 'David Kim',
      date: 'December 5, 2024',
      readTime: '6 min read',
      category: 'Smart Office',
      featured: false
    },
    {
      title: 'E-commerce Trends That Will Define 2025',
      excerpt: 'Stay ahead of the curve with these emerging trends in online retail and digital commerce.',
      author: 'Lisa Wang',
      date: 'December 3, 2024',
      readTime: '9 min read',
      category: 'E-commerce',
      featured: false
    }
  ]

  const categories = [
    'All Posts',
    'AI & Technology',
    'Security',
    'Cloud Services',
    'Smart Office',
    'E-commerce',
    'Tutorials',
    'Business Insights'
  ]

  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">IntelliSMART Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Insights, tutorials, and industry trends for modern business leaders
          </p>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className="bg-gray-100 hover:bg-gold hover:text-black px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Featured Article</h2>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg">
            <div className="md:flex">
              <div className="md:w-1/2 p-8">
                <div className="mb-4">
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {featuredPost.category}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">{featuredPost.title}</h3>
                <p className="text-gray-600 mb-6 line-clamp-3">{featuredPost.excerpt}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-semibold">{featuredPost.author.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div>
                      <p className="font-semibold">{featuredPost.author}</p>
                      <p className="text-sm text-gray-500">{featuredPost.date} • {featuredPost.readTime}</p>
                    </div>
                  </div>
                  <button className="bg-gold hover:bg-gold/90 text-black px-6 py-2 rounded-lg font-semibold transition-colors">
                    Read More
                  </button>
                </div>
              </div>
              <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-8">
                <span className="text-8xl">{featuredPost.image}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                <span className="text-4xl">📝</span>
              </div>
              <div className="p-6">
                <div className="mb-3">
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3 line-clamp-2">{post.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-2">
                      <span className="text-xs font-semibold">{post.author.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{post.author}</p>
                      <p className="text-xs text-gray-500">{post.date} • {post.readTime}</p>
                    </div>
                  </div>
                  <button className="text-gold hover:text-gold/80 font-semibold">
                    Read →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-black text-white p-12 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 text-gray-300">
            Get the latest insights and trends delivered to your inbox
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 p-3 rounded-lg text-black"
            />
            <button className="bg-gold hover:bg-gold/90 text-black px-6 py-3 rounded-lg font-semibold transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
