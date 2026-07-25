
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface Story {
  quote: string;
  name: string;
  location: string;
  image: string;
}

interface SuccessStoriesProps {
  stories: Story[];
  loading?: boolean;
}

const StoryCard = ({ story }: { story: Story }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row gap-6">
    <div className="md:w-1/4 flex justify-center">
      <img 
        src={story.image} 
        alt={`Portrait of ${story.name}${story.location ? `, from ${story.location}` : ''}, sharing their Utu Wa Kiafrika impact story`}
        loading="lazy"
        decoding="async"
        className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/placeholder.svg";
        }}
      />
    </div>
    <div className="md:w-3/4">
      <p className="text-utu-gray italic mb-4">&ldquo;{story.quote}&rdquo;</p>
      <div>
        <h5 className="font-bold text-utu-black">{story.name}</h5>
        <p className="text-sm text-utu-gray">{story.location}</p>
      </div>
    </div>
  </div>
);

const SuccessStories = ({ stories, loading = false }: SuccessStoriesProps) => {
  if (loading) {
    return (
      <div className="mb-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
        <h3 className="text-xl sm:text-2xl font-bold mb-8 text-center font-heading text-utu-black">Success Stories</h3>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-utu-red"></div>
        </div>
      </div>
    );
  }

  if (stories.length === 0) {
    return (
      <div className="mb-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
        <h3 className="text-xl sm:text-2xl font-bold mb-8 text-center font-heading text-utu-black">Success Stories</h3>
        <div className="text-center py-12">
          <p className="text-utu-gray">No success stories available yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
      <h3 className="text-xl sm:text-2xl font-bold mb-8 text-center font-heading text-utu-black">Success Stories</h3>
      
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-4xl mx-auto"
      >
        <CarouselContent>
          {stories.map((story, index) => (
            <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/1">
              <StoryCard story={story} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center mt-6">
          <CarouselPrevious className="static translate-y-0 mr-2" />
          <CarouselNext className="static translate-y-0 ml-2" />
        </div>
      </Carousel>
    </div>
  );
};

export default SuccessStories;
