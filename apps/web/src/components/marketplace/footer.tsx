'use client';

import Link from 'next/link';
import { Icons } from 

;

export function MarketplaceFooter() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: 'Buy & Sell',
      links: [
        { name: 'All Categories', href: '/categories' },
        { name: 'Vehicles', href: '/categories/vehicles' },
        { name: 'Property', href: '/categories/property' },
        { name: 'Electronics', href: '/categories/electronics' },
        { name: 'Furniture', href: '/categories/furniture' },
        { name: 'Fashion', href: '/categories/fashion' },
      ],
    },
    {
      title: 'Jobs',
      links: [
        { name: 'Browse Jobs', href: '/jobs' },
        { name: 'Post a Job', href: '/jobs/post' },
        { name: 'Job Categories', href: '/jobs/categories' },
        { name: 'Companies', href: '/jobs/companies' },
        { name: 'Resume Builder', href: '/resume-builder' },
      ],
    },
    {
      title: 'Services',
      links: [
        { name: 'All Services', href: '/services' },
        { name: 'Professional Services', href: '/services/professional' },
        { name: 'Home Services', href: '/services/home' },
        { name: 'IT Services', href: '/services/it' },
        { name: 'Health & Beauty', href: '/services/health' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press', href: '/press' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact Us', href: '/contact' },
      ],
    },
    {
      title: 'Help & Support',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'Safety Tips', href: '/safety' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Sitemap', href: '/sitemap' },
      ],
    },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Icons.facebook, href: '#' },
    { name: 'Twitter', icon: Icons.twitter, href: '#' },
    { name: 'Instagram', icon: Icons.instagram, href: '#' },
    { name: 'LinkedIn', icon: Icons.linkedin, href: '#' },
    { name: 'YouTube', icon: Icons.youtube, href: '#' },
  ];

  return (
    <footer className="bg-background border-t">
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-sm font-semibold">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Download Our App</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Icons.apple className="mr-2 h-5 w-5" />
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="font-medium">App Store</div>
                </div>
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Icons.googlePlay className="mr-2 h-5 w-5" />
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="font-medium">Google Play</div>
                </div>
              </Button>
            </div>
            
            <div className="pt-4">
              <h3 className="text-sm font-semibold mb-3">Follow Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={social.name}
                    >
                      <Icon className="h-5 w-5" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4">
            <Icons.logo className="h-8 w-8" />
            <span className="font-bold">IntelliSMART</span>
          </div>
          <p className="text-sm text-muted-foreground mt-4 md:mt-0">
            &copy; {currentYear} IntelliSMART. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Add this import at the top of the file
import { Button } from '@/components/ui/button';
