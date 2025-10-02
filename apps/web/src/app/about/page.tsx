import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

export default function AboutPage() {
  const team = [
    {
      name: 'Alex Johnson',
      role: 'CEO & Founder',
      bio: 'Visionary leader with 15+ years in AI and business transformation.',
      image: '/team/alex.jpg'
    },
    {
      name: 'Sarah Chen',
      role: 'CTO',
      bio: 'Technology expert specializing in scalable AI solutions.',
      image: '/team/sarah.jpg'
    },
    {
      name: 'Michael Brown',
      role: 'Head of Product',
      bio: 'Product strategist with a passion for user-centered design.',
      image: '/team/michael.jpg'
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 to-black text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About IntelliSMART</h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Empowering businesses with intelligent solutions since 2020
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="mb-12 lg:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                At IntelliSMART, we're committed to democratizing AI technology for businesses of all sizes. 
                Our mission is to provide accessible, powerful tools that drive innovation and growth.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Founded in 2020, we've grown from a small startup to a trusted partner for businesses 
                looking to leverage the power of artificial intelligence.
              </p>
              <Button className="bg-gold hover:bg-gold/90 text-black">
                Learn more about our story
                <Icons.arrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="relative h-96 bg-gray-100 rounded-xl overflow-hidden">
              <Image
                src="/about/office.jpg"
                alt="Our office"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Passionate individuals driving innovation forward
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="h-64 bg-gray-200 relative">
                  <Image
                    src={member.image}
                    alt={`${member.name}, ${member.role}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-gold font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                  <div className="mt-4 flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-gray-500">
                      <span className="sr-only">LinkedIn</span>
                      <Icons.linkedin className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Twitter</span>
                      <Icons.twitter className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Principles that guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Icons.lightbulb className="h-8 w-8 text-gold" />,
                title: 'Innovation',
                description: 'We constantly push boundaries to deliver cutting-edge solutions.'
              },
              {
                icon: <Icons.shieldCheck className="h-8 w-8 text-gold" />,
                title: 'Integrity',
                description: 'We build trust through transparency and ethical practices.'
              },
              {
                icon: <Icons.users className="h-8 w-8 text-gold" />,
                title: 'Collaboration',
                description: 'We believe in the power of teamwork and partnership.'
              }
            ].map((value, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of businesses that trust IntelliSMART for their digital transformation needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg">
              Contact Sales
            </Button>
            <Button variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold text-lg">
              View Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
