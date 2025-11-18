
import React, { useState, useEffect } from 'react';
import { MapPin, Users, Award, Heart } from 'lucide-react';
import { ImpactData, defaultImpactData } from './impact/ImpactData';
import ImpactHeader from './impact/ImpactHeader';
import StatsSection from './impact/StatsSection';
import ImpactAreas from './impact/ImpactAreas';
import SuccessStories from './impact/SuccessStories';
import AnnualReport from './impact/AnnualReport';
import CallToAction from './impact/CallToAction';
import UgandaMap from './impact/UgandaMap';
import { useMetricsManagement } from '@/hooks/useMetricsManagement';

const iconComponents = {
  MapPin: <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-utu-red" />,
  Users: <Users className="h-6 w-6 sm:h-8 sm:w-8 text-utu-red" />,
  Award: <Award className="h-6 w-6 sm:h-8 sm:w-8 text-utu-red" />,
  Heart: <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-utu-red" />
};

const Impact = () => {
  const [impactData, setImpactData] = useState<ImpactData>(defaultImpactData);
  const { metrics, loading: metricsLoading } = useMetricsManagement();

  useEffect(() => {
    const savedImpact = localStorage.getItem('utu-impact');
    if (savedImpact) {
      try {
        const parsedData = JSON.parse(savedImpact);
        setImpactData(parsedData);
      } catch (error) {
        console.error("Error parsing impact data:", error);
      }
    } else {
      localStorage.setItem('utu-impact', JSON.stringify(defaultImpactData));
    }
  }, []);

  // Map Supabase metrics to stats format
  const stats = metrics.map(metric => ({
    value: metric.metric_value,
    label: metric.metric_name,
    icon: metric.icon || 'Award'
  }));

  return (
    <section id="impact" className="py-12 sm:py-20 bg-gradient-to-b from-white to-utu-light-gray">
      <div className="container mx-auto px-4">
        <ImpactHeader />
        {metricsLoading ? (
          <div className="text-center py-8">Loading metrics...</div>
        ) : (
          <StatsSection stats={stats} iconComponents={iconComponents} />
        )}
        <ImpactAreas />
        <UgandaMap />
        <SuccessStories stories={impactData.successStories} />
        <AnnualReport />
        <CallToAction />
      </div>
    </section>
  );
};

export default Impact;
