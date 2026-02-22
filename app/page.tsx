import {
  LandingHeader,
  HeroSection,
  CategoriesSection,
  DoctorsSection,
  WhyChooseSection,
  TestimonialsSection,
  FAQSection,
  AppDownloadSection,
  ArticlesSection,
  CTASection,
  LandingFooter,
} from "@/components/features/landing";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeader />
      <main className="flex-1">
        <HeroSection />
        <CategoriesSection />
        <DoctorsSection />
        <WhyChooseSection />
        <TestimonialsSection />
        <FAQSection />
        <AppDownloadSection />
        <ArticlesSection />
        <CTASection />
      </main>
      <LandingFooter />
    </div>
  );
}
