import FeatureSection from './components/featureSection'
import PricingSection from './components/pricingSection'

export default function Details() {
  return (
    <div className="flex flex-grow flex-col">
      <FeatureSection />
      <PricingSection />
    </div>
  )
}
