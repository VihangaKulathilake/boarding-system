import React from 'react';
import LandingNavbar from '../../components/common/LandingNavbar';
import HeroSection from '../../components/landing/HeroSection';
import FeaturesSection from '../../components/landing/FeaturesSection';
import HowItWorksSection from '../../components/landing/HowItWorksSection';
import BenefitsSection from '../../components/landing/BenefitsSection';
import CTASection from '../../components/landing/CTASection';
import LandingFooter from '../../components/common/LandingFooter';

export default function LandingPage() {
    return (
        <div className="landing-page font-sans">
            <LandingNavbar />
            <HeroSection />
            <FeaturesSection />
            <HowItWorksSection />
            <BenefitsSection />
            <CTASection />
            <LandingFooter />
        </div>
    );
}
