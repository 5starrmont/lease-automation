
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HomeIcon, UserIcon, DollarSignIcon, BellIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  React.useEffect(() => {
    // If user is already authenticated, redirect to dashboard
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  
  const features = [
    {
      icon: <HomeIcon className="h-8 w-8 text-primary" />,
      title: "Property Management",
      description: "Easily add, edit, and track all your rental properties in one place."
    },
    {
      icon: <UserIcon className="h-8 w-8 text-primary" />,
      title: "Tenant Management",
      description: "Keep track of all tenant information, leases, and communications."
    },
    {
      icon: <DollarSignIcon className="h-8 w-8 text-primary" />,
      title: "Rent Collection",
      description: "Automated rent reminders and seamless payment tracking."
    },
    {
      icon: <BellIcon className="h-8 w-8 text-primary" />,
      title: "Automated Notifications",
      description: "Send automatic reminders for rent, maintenance, and more."
    },
  ];
  
  return (
    <div className="flex flex-col min-h-screen bg-background overflow-hidden">
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="px-4 py-6 sm:px-6 lg:px-8 z-10 absolute w-full"
      >
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-semibold">RM</span>
            </div>
            <span className="text-xl font-medium">Rental Manager</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-sm text-foreground hover:text-primary transition-colors">Features</a>
            <a href="#testimonials" className="text-sm text-foreground hover:text-primary transition-colors">Testimonials</a>
            <a href="#pricing" className="text-sm text-foreground hover:text-primary transition-colors">Pricing</a>
            <Button 
              variant="outline" 
              onClick={() => navigate('/login')}
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              Sign in
            </Button>
            <Button onClick={() => navigate('/login')}>
              Get Started
            </Button>
          </nav>
          
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <span className="sr-only">Open menu</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="20" y1="18" y2="18"></line>
              </svg>
            </Button>
          </div>
        </div>
      </motion.header>

      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col gap-4"
            >
              <div className="inline-block">
                <div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm">
                  <span className="text-primary">Simplify Property Management</span>
                </div>
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Manage Your Properties <span className="text-primary">Effortlessly</span>
              </h1>
              <p className="text-muted-foreground md:text-xl">
                A complete rental management system that helps landlords, tenants, and caretakers streamline all property-related operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 min-[400px]:flex-row">
                <Button
                  size="lg"
                  onClick={() => navigate('/login')}
                  className="shadow-lg"
                >
                  Get Started
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                >
                  Learn More
                </Button>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div 
                      key={i} 
                      className="h-8 w-8 rounded-full border-2 border-background bg-muted overflow-hidden"
                    >
                      <img
                        src={`https://i.pravatar.cc/150?img=${65 + i}`}
                        alt={`User ${i + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">500+</span> happy users
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="relative"
            >
              <div className="relative flex items-center justify-center">
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/20 to-primary/30 blur-xl" />
                <div className="relative rounded-xl border bg-white/80 backdrop-blur-md shadow-lg overflow-hidden">
                  <img
                    alt="Dashboard Preview"
                    className="w-full object-cover"
                    height="794"
                    src="https://images.unsplash.com/photo-1551836022-4c4c79ecde51?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    width="1542"
                  />
                </div>
              </div>
              <div className="absolute -right-6 -top-6 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
              <div className="absolute -bottom-6 -left-6 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      <section id="features" className="py-16 md:py-24 bg-secondary/50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Powerful Features</h2>
            <p className="text-muted-foreground mt-2 text-lg">
              Everything you need to manage your rental properties
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <section id="testimonials" className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">What Our Users Say</h2>
            <p className="text-muted-foreground mt-2 text-lg">
              Hear from the landlords and property managers who use our platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "This system has completely transformed how I manage my rental properties. The automated reminders for rent collection are a game-changer.",
                author: "James Wilson",
                role: "Property Owner"
              },
              {
                quote: "As a tenant, I love how easy it is to pay rent and request maintenance. The notifications keep me informed without being overwhelming.",
                author: "Emily Johnson",
                role: "Tenant"
              },
              {
                quote: "Managing multiple properties became so much easier. I can track everything in one place and the reports give me great insights.",
                author: "Michael Brown",
                role: "Property Manager"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-sm relative"
              >
                <div className="text-4xl text-primary/20 absolute top-4 left-4">"</div>
                <p className="text-muted-foreground relative mb-6 pt-4">
                  {testimonial.quote}
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-medium">{testimonial.author[0]}</span>
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <section id="pricing" className="py-16 md:py-24 bg-secondary/50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Simple, Transparent Pricing</h2>
            <p className="text-muted-foreground mt-2 text-lg">
              Choose the plan that works for your property portfolio
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Basic",
                price: 9.99,
                description: "Perfect for individuals with a few properties",
                features: [
                  "Up to 5 properties",
                  "Basic tenant management",
                  "Rent tracking",
                  "Email notifications"
                ],
                highlighted: false
              },
              {
                name: "Professional",
                price: 24.99,
                description: "Ideal for growing property portfolios",
                features: [
                  "Up to 20 properties",
                  "Advanced tenant management",
                  "Automated rent collection",
                  "SMS notifications",
                  "Maintenance tracking",
                  "Financial reports"
                ],
                highlighted: true
              },
              {
                name: "Enterprise",
                price: 49.99,
                description: "For large-scale property management",
                features: [
                  "Unlimited properties",
                  "Complete management system",
                  "Advanced analytics",
                  "API access",
                  "Priority support",
                  "Custom integrations"
                ],
                highlighted: false
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`
                  rounded-xl p-8 
                  ${plan.highlighted ? 
                    'bg-white border-2 border-primary shadow-lg relative' : 
                    'bg-white shadow-sm'
                  }
                `}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold">
                    ${plan.price}
                    <span className="text-sm font-normal text-muted-foreground"> /month</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                </div>
                
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-primary mr-2"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${plan.highlighted ? '' : 'bg-secondary hover:bg-primary/90 text-foreground hover:text-primary-foreground'}`}
                  variant={plan.highlighted ? 'default' : 'outline'}
                  onClick={() => navigate('/login')}
                >
                  Get Started
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Simplify Your Property Management?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
              Join thousands of property managers who've streamlined their operations with our platform.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90"
              onClick={() => navigate('/login')}
            >
              Get Started Today
            </Button>
          </motion.div>
        </div>
      </section>
      
      <footer className="py-12 bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-medium mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Features</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Pricing</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Testimonials</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">About</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Blog</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Careers</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Documentation</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Help Center</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Guides</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Cookie Policy</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">GDPR</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-muted flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-semibold">RM</span>
              </div>
              <span className="text-xl font-medium">Rental Manager</span>
            </div>
            
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Rental Management System. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
