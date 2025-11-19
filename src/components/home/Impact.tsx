
import React, { useMemo } from 'react';
import { MapPin, Users, Award, Heart } from 'lucide-react';
import ImpactHeader from './impact/ImpactHeader';
import StatsSection from './impact/StatsSection';
import ImpactAreas from './impact/ImpactAreas';
import SuccessStories from './impact/SuccessStories';
import AnnualReport from './impact/AnnualReport';
import CallToAction from './impact/CallToAction';
import UgandaMap from './impact/UgandaMap';
import { useMetricsManagement } from '@/hooks/useMetricsManagement';
import { useSuccessStoriesManagement } from '@/hooks/useSuccessStoriesManagement';

const iconComponents = {
  MapPin: <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-utu-red" />,
  Users: <Users className="h-6 w-6 sm:h-8 sm:w-8 text-utu-red" />,
  Award: <Award className="h-6 w-6 sm:h-8 sm:w-8 text-utu-red" />,
  Heart: <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-utu-red" />
};

const Impact = () => {
  const { metrics, loading: metricsLoading } = useMetricsManagement();
  const { stories, loading: storiesLoading } = useSuccessStoriesManagement();

  // Map Supabase metrics to stats format
  const stats = metrics.map(metric => ({
    value: metric.metric_value,
    label: metric.metric_name,
    icon: metric.icon || 'Award'
  }));

  // Map Supabase success stories to component format
  const mappedStories = useMemo(() => {
    return stories.map(story => ({
      name: story.title,
      quote: story.description,
      location: story.category || 'Uganda',
      image: story.image_url || '/placeholder.svg'
    }));
  }, [stories]);

  return (
    <section id="impact" className="py-12 sm:py-20 bg-gradient-to-b from-white to-utu-light-gray">
      <div className="container mx-auto px-4">
        <ImpactHeader />
        <StatsSection stats={stats} iconComponents={iconComponents} loading={metricsLoading} />
        <ImpactAreas />
        <UgandaMap />
        <SuccessStories stories={mappedStories} loading={storiesLoading} />
        <AnnualReport />
        <CallToAction />
      </div>
    </section>
  );
};

export default Impact;
