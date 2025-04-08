
import React from 'react';
import { TransitionWrapper } from '@/components/ui/TransitionWrapper';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { Button } from '@/components/ui/button';

const PricingPlans: React.FC = () => {
  return (
    <section className="space-y-6">
      <TransitionWrapper delay={400}>
        <GlassMorphism className="p-6 rounded-xl backdrop-blur-lg bg-flow-background/20">
          <h3 className="text-xl font-medium mb-4 neon-text">Pricing Plans</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassMorphism intensity="low" className="p-6 rounded-xl transition-all duration-300 hover:shadow-md hover:border-flow-border/50 relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="text-lg font-medium">Basic Plan</h4>
                <div className="text-2xl font-bold my-3">$49<span className="text-sm font-normal text-flow-foreground/70">/month</span></div>
                <div className="text-sm text-flow-foreground/70 mb-4">Core divisions and basic workflows</div>
                <ul className="space-y-2 text-sm mb-6">
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    Knowledge Base Division
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    Analytics Division
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    Operations Division
                  </li>
                </ul>
                <Button className="w-full px-4 py-2 bg-flow-accent/80 hover:bg-flow-accent text-flow-accent-foreground rounded-md border border-flow-accent/50 transition-all duration-300 hover:scale-105">
                  Get Started
                </Button>
              </div>
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-transparent to-flow-background/30 pointer-events-none"></div>
            </GlassMorphism>
            
            <GlassMorphism className="p-6 rounded-xl bg-flow-accent/5 border-flow-accent shadow-[0_0_15px_rgba(217,70,239,0.2)] relative transition-all duration-300 hover:shadow-[0_0_20px_rgba(217,70,239,0.3)]">
              <div className="absolute -top-3 right-4 bg-flow-accent text-xs text-flow-accent-foreground px-3 py-1 rounded-full">Popular</div>
              <div className="relative z-10">
                <h4 className="text-lg font-medium">Pro Plan</h4>
                <div className="text-2xl font-bold my-3">$199<span className="text-sm font-normal text-flow-foreground/70">/month</span></div>
                <div className="text-sm text-flow-foreground/70 mb-4">Core divisions plus Strategy & Marketing</div>
                <ul className="space-y-2 text-sm mb-6">
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    All Basic Plan features
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    Strategy Division
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    Marketing Division
                  </li>
                </ul>
                <Button className="w-full px-4 py-2 bg-flow-accent text-flow-accent-foreground shadow-[0_0_10px_rgba(217,70,239,0.3)] rounded-md border border-flow-accent/80 transition-all duration-300 hover:scale-105">
                  Upgrade Now
                </Button>
              </div>
              <div className="absolute -top-5 -right-5 w-40 h-40 bg-flow-accent/10 rounded-full blur-3xl pointer-events-none"></div>
            </GlassMorphism>
            
            <GlassMorphism intensity="low" className="p-6 rounded-xl transition-all duration-300 hover:shadow-md hover:border-flow-border/50 relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="text-lg font-medium">Premium Plan</h4>
                <div className="text-2xl font-bold my-3">Custom<span className="text-sm font-normal text-flow-foreground/70">/month</span></div>
                <div className="text-sm text-flow-foreground/70 mb-4">All divisions with custom workflows</div>
                <ul className="space-y-2 text-sm mb-6">
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    All Pro Plan features
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    Finance Division
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    Custom workflows & agents
                  </li>
                </ul>
                <Button variant="outline" className="w-full px-4 py-2 border-flow-border hover:border-flow-accent/50 rounded-md transition-all duration-300 hover:text-flow-accent">
                  Contact Sales
                </Button>
              </div>
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-transparent to-flow-background/30 pointer-events-none"></div>
            </GlassMorphism>
          </div>
        </GlassMorphism>
      </TransitionWrapper>
    </section>
  );
};

export default PricingPlans;
