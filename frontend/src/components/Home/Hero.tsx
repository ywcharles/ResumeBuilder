import React, { useState } from 'react';
import { FileUp, Star, Users, Zap, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    // Handle submission logic here
    console.log('Email submitted:', email);
    setEmail('');
    alert('Thanks for signing up! Check your email to get started.');
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-100">
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left section with copy */}
          <div className="max-w-xl">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-6">
              <Star size={16} className="mr-2" />
              <span className="font-medium text-sm">Trusted by 500,000+ job seekers</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Build your perfect resume in <span className="text-blue-600">minutes</span>, not hours
            </h1>
            
            <p className="text-lg text-gray-700 mb-8">
              Our intuitive drag-and-drop builder makes it easy to create a professional, 
              ATS-friendly resume that gets you noticed by employers and lands you interviews.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <input
                type="email"
                placeholder="Enter your email address"
                className="px-5 py-3 rounded-lg flex-grow shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={email}
                onChange={handleEmailChange}
              />
              <button 
                onClick={handleSubmit}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700 transition flex items-center justify-center"
              >
                Get Started Free
                <ArrowRight size={18} className="ml-2" />
              </button>
            </div>
            
            <div className="flex items-center text-gray-600 text-sm">
              <span>✓ No credit card required</span>
              <span className="mx-3">•</span>
              <span>✓ Free templates available</span>
            </div>
          </div>
          
          {/* Right section with visual */}
          <div className="relative">
            {/* Resume preview */}
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="h-6 w-32 bg-gray-800 rounded-md mb-2"></div>
                  <div className="h-4 w-48 bg-gray-300 rounded-md"></div>
                </div>
                <div className="h-16 w-16 bg-blue-100 rounded-full"></div>
              </div>
              
              <div className="mb-6">
                <div className="h-4 w-20 bg-gray-400 rounded-md mb-3"></div>
                <div className="h-3 w-full bg-gray-200 rounded-md mb-2"></div>
                <div className="h-3 w-full bg-gray-200 rounded-md mb-2"></div>
                <div className="h-3 w-3/4 bg-gray-200 rounded-md"></div>
              </div>
              
              <div className="mb-6">
                <div className="h-4 w-24 bg-gray-400 rounded-md mb-3"></div>
                <div className="flex items-center mb-3">
                  <div className="h-4 w-32 bg-gray-300 rounded-md mr-4"></div>
                  <div className="h-4 w-20 bg-gray-300 rounded-md"></div>
                </div>
                <div className="h-3 w-full bg-gray-200 rounded-md mb-2"></div>
                <div className="h-3 w-full bg-gray-200 rounded-md mb-2"></div>
                <div className="h-3 w-2/3 bg-gray-200 rounded-md"></div>
              </div>
              
              <div>
                <div className="h-4 w-24 bg-gray-400 rounded-md mb-3"></div>
                <div className="flex flex-wrap gap-2">
                  <div className="h-6 w-16 bg-blue-100 rounded-full"></div>
                  <div className="h-6 w-20 bg-blue-100 rounded-full"></div>
                  <div className="h-6 w-14 bg-blue-100 rounded-full"></div>
                  <div className="h-6 w-24 bg-blue-100 rounded-full"></div>
                </div>
              </div>
              
              {/* Drag handle indicators */}
              <div className="absolute top-8 right-8 w-6 h-6 bg-blue-500 rounded-md flex items-center justify-center opacity-80">
                <FileUp size={14} className="text-white" />
              </div>
            </div>
            
            {/* Features floating around */}
            <div className="absolute -top-4 -right-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg text-sm font-medium flex items-center">
              <Zap size={16} className="mr-2" />
              ATS-optimized
            </div>
            
            <div className="absolute -bottom-4 -left-4 px-4 py-2 bg-green-600 text-white rounded-lg shadow-lg text-sm font-medium flex items-center">
              <Users size={16} className="mr-2" />
              Recruiter approved
            </div>
          </div>
        </div>
        
        {/* Logos section */}
        <div className="mt-16">
          <p className="text-center text-gray-500 mb-6 text-sm font-medium uppercase tracking-wider">
            Trusted by candidates who got hired at
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
            <div className="h-8 w-24 bg-gray-400 rounded-md"></div>
            <div className="h-8 w-24 bg-gray-400 rounded-md"></div>
            <div className="h-8 w-24 bg-gray-400 rounded-md"></div>
            <div className="h-8 w-24 bg-gray-400 rounded-md"></div>
            <div className="h-8 w-24 bg-gray-400 rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;