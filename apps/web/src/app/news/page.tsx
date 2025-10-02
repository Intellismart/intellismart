import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

type Author = {
  name: string;
  role: string;
  avatar: string;
};

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: Author;
  date: string;
  readTime: string;
  category: string;
  featured: boolean;
  image: string;
  slug: string;
};

export default function NewsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const [activeCategory, setActiveCategory] = useState('All Posts');
  const featuredPost: BlogPost = {
    id: '1',
    title: 'AI Agents Revolutionizing SMB Operations in 2024',
    excerpt: 'Discover how artificial intelligence is transforming small and medium businesses, from customer service automation to predictive analytics.',
    content: 'Full article content would go here...',
    author: {
      name: 'Sarah Johnson',
      role: 'AI Specialist',
      avatar: '/team/sarah-johnson.jpg'
    },
    date: '2024-12-15',
    readTime: '5 min read',
    image: '/blog/ai-revolution.jpg',
    category: 'AI & Technology',
    featured: true,
    slug: 'ai-agents-revolutionizing-smb-operations-2024'
  }

  const blogPosts: BlogPost[] = [
    {
      id: '2',
      title: '5 Essential Security Practices for Modern Businesses',
      excerpt: 'Protect your business with these fundamental cybersecurity measures that every SMB should implement.',
      content: 'Full article content would go here...',
      author: {
        name: 'Mike Chen',
        role: 'Security Expert',
        avatar: '/team/mike-chen.jpg'
      },
      date: '2024-12-12',
      readTime: '7 min read',
      image: '/blog/security-practices.jpg',
      category: 'Security',
      featured: false,
      slug: 'essential-security-practices-modern-businesses'
    },
    {
      id: '3',
      title: 'Building Your First AI Agent: A Complete Guide',
      excerpt: 'Step-by-step tutorial on creating and deploying your first intelligent agent for business automation.',
      content: 'Full article content would go here...',
      author: {
        name: 'Alex Rodriguez',
        role: 'AI Engineer',
        avatar: '/team/alex-rodriguez.jpg'
      },
      date: '2024-12-10',
      readTime: '12 min read',
      image: '/blog/ai-agent-guide.jpg',
      category: 'Tutorials',
      featured: false,
      slug: 'building-first-ai-agent-complete-guide'
    },
    {
      id: '4',
      title: 'Cloud Migration Strategies for Growing Businesses',
      excerpt: 'Learn the best practices for migrating your infrastructure to the cloud without disrupting operations.',
      content: 'Full article content would go here...',
      author: {
        name: 'Emma Thompson',
        role: 'Cloud Architect',
        avatar: '/team/emma-thompson.jpg'
      },
      date: '2024-12-08',
      readTime: '8 min read',
      image: '/blog/cloud-migration.jpg',
      category: 'Cloud Services',
      featured: false,
      slug: 'cloud-migration-strategies-growing-businesses'
    },
    {
      id: '5',
      title: 'The Future of Smart Office Technology',
      excerpt: 'Exploring how IoT and AI are reshaping the modern workplace for increased productivity and efficiency.',
      content: 'Full article content would go here...',
      author: {
        name: 'David Kim',
        role: 'IoT Specialist',
        avatar: '/team/david-kim.jpg'
      },
      date: '2024-12-05',
      readTime: '6 min read',
      image: '/blog/smart-office.jpg',
      category: 'Smart Office',
      featured: false,
      slug: 'future-smart-office-technology'
    },
    {
      id: '6',
      title: 'E-commerce Trends That Will Define 2025',
      excerpt: 'Stay ahead of the curve with these emerging trends in online retail and digital commerce.',
      content: 'Full article content would go here...',
      author: {
        name: 'Lisa Wang',
        role: 'E-commerce Strategist',
        avatar: '/team/lisa-wang.jpg'
      },
      date: '2024-12-03',
      readTime: '9 min read',
      image: '/blog/ecommerce-trends.jpg',
      category: 'E-commerce',
      featured: false,
      slug: 'ecommerce-trends-2025'
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
  ];

  // Filter posts by active category
  const filteredPosts = activeCategory === 'All Posts' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  // Get current posts for pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">IntelliSMART Blog</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Insights, tutorials, and industry trends for modern business leaders
          </p>
        </header>

        {/* Categories */}
        <nav aria-label="Blog categories" className="mb-12">
          <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg font-medium text-sm md:text-base transition-colors ${
                  activeCategory === category
                    ? 'bg-gold text-black'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
                aria-current={activeCategory === category ? 'page' : undefined}
              >
                {category}
              </button>
            ))}
          </div>
        </nav>

        {/* Blog Posts Grid */}
        <section aria-labelledby="blog-posts" className="mt-16">
          <h2 id="blog-posts" className="text-2xl font-bold mb-8">Latest Articles</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {currentPosts.map((post) => (
              <article key={post.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-100 relative">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <Badge variant="secondary" className="bg-gold/10 text-gold hover:bg-gold/20">
                      {post.category}
                    </Badge>
                    <time dateTime={post.date} className="ml-3 text-sm text-gray-500">
                      {formatDate(post.date)}
                    </time>
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    <Link href={`/news/${post.slug}`} className="hover:text-gold transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center mt-4">
                    <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                      <Image
                        src={post.author.avatar}
                        alt={`${post.author.name}, ${post.author.role}`}
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {post.author.name}
                      </p>
                      <p className="text-xs text-gray-500">{post.readTime}</p>
                    </div>
                    <Link 
                      href={`/news/${post.slug}`} 
                      className="ml-auto text-gold hover:text-gold/80 font-semibold flex items-center"
                      aria-label={`Read more about ${post.title}`}
                    >
                      Read <Icons.arrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) setCurrentPage(currentPage - 1);
                      }}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink 
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(page);
                        }}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                      }}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </section>
      </div>

      {/* Newsletter Subscription */}
        <section className="bg-gray-50 mt-16 py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Subscribe to our newsletter</h2>
            <p className="text-gray-600 mb-6">
              Get the latest articles, news and resources delivered straight to your inbox.
            </p>
            <form className="max-w-md mx-auto flex gap-2">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="min-w-0 flex-auto rounded-md border border-gray-300 bg-white px-3.5 py-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-gold focus:border-gold sm:text-sm"
                placeholder="Enter your email"
              />
              <Button type="submit" className="bg-gold hover:bg-gold/90 text-black">
                Subscribe
              </Button>
            </form>
          </div>
        </section>
    </div>
  )
}
