import React, { useState, useMemo, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { useSuccessStoriesManagement } from '@/hooks/useSuccessStoriesManagement';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const SuccessStoriesPage = () => {
  const { stories, loading } = useSuccessStoriesManagement();
  const [selectedStory, setSelectedStory] = useState<typeof stories[0] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(stories.map(story => story.category).filter(Boolean));
    return ['all', ...Array.from(cats)];
  }, [stories]);

  // Filter stories by category
  const filteredStories = useMemo(() => {
    if (selectedCategory === 'all') return stories;
    return stories.filter(story => story.category === selectedCategory);
  }, [stories, selectedCategory]);

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredStories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedStories = filteredStories.slice(startIndex, endIndex);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-white to-utu-light-gray">
        {/* Header Section */}
        <section className="relative py-16 sm:py-24 bg-gradient-to-br from-utu-red via-utu-gold to-utu-green">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center text-white max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 font-heading">
                Success Stories
              </h1>
              <p className="text-lg sm:text-xl leading-relaxed">
                Real stories from the people whose lives have been transformed through UTU Afrika's programs and initiatives.
              </p>
            </div>
          </div>
        </section>

        {/* Category Filter Section */}
        <section className="py-8 bg-white shadow-sm sticky top-[72px] z-40">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <span className="text-sm font-medium text-utu-gray">Filter by location:</span>
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  className={
                    selectedCategory === category
                      ? 'bg-utu-red hover:bg-red-700 text-white'
                      : 'border-utu-red text-utu-red hover:bg-utu-red hover:text-white'
                  }
                >
                  {category === 'all' ? 'All Stories' : category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Stories Grid Section */}
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-utu-red"></div>
              </div>
            ) : filteredStories.length === 0 ? (
              <div className="text-center py-20">
                <Users className="h-16 w-16 text-utu-gray mx-auto mb-4" />
                <p className="text-xl text-utu-gray">No success stories found for this category.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {paginatedStories.map((story) => (
                  <Card
                    key={story.id}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                    onClick={() => setSelectedStory(story)}
                  >
                    {story.image_url && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={story.image_url}
                          alt={story.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder.svg';
                          }}
                        />
                        {story.category && (
                          <Badge className="absolute top-3 right-3 bg-utu-red text-white">
                            <MapPin className="h-3 w-3 mr-1" />
                            {story.category}
                          </Badge>
                        )}
                      </div>
                    )}
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-3 text-utu-black font-heading group-hover:text-utu-red transition-colors">
                        {story.title}
                      </h3>
                      <p className="text-utu-gray line-clamp-3">
                        {story.description}
                      </p>
                      <Button
                        variant="link"
                        className="mt-4 p-0 h-auto text-utu-red hover:text-red-700"
                      >
                        Read full story →
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                          className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                        />
                      </PaginationItem>
                      
                      {getPageNumbers().map((page, index) => (
                        <PaginationItem key={index}>
                          {page === '...' ? (
                            <PaginationEllipsis />
                          ) : (
                            <PaginationLink
                              onClick={() => setCurrentPage(page as number)}
                              isActive={currentPage === page}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          )}
                        </PaginationItem>
                      ))}

                      <PaginationItem>
                        <PaginationNext
                          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                          className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
            )}
          </div>
        </section>

        {/* Story Detail Dialog */}
        <Dialog open={!!selectedStory} onOpenChange={() => setSelectedStory(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl sm:text-3xl font-bold font-heading text-utu-black">
                {selectedStory?.title}
              </DialogTitle>
            </DialogHeader>
            {selectedStory && (
              <div className="space-y-6">
                {selectedStory.image_url && (
                  <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden">
                    <img
                      src={selectedStory.image_url}
                      alt={selectedStory.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                  </div>
                )}
                {selectedStory.category && (
                  <Badge className="bg-utu-red text-white w-fit">
                    <MapPin className="h-4 w-4 mr-1" />
                    {selectedStory.category}
                  </Badge>
                )}
                <div className="prose prose-lg max-w-none">
                  <p className="text-utu-gray leading-relaxed whitespace-pre-wrap">
                    {selectedStory.description}
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Call to Action Section */}
        <section className="py-16 bg-gradient-to-br from-utu-red to-red-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 font-heading">
              Be Part of Someone's Success Story
            </h2>
            <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
              Your support can help us create more stories of transformation and hope across Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-utu-red hover:bg-gray-100"
                onClick={() => window.location.href = '/donate'}
              >
                Donate Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-utu-red"
                onClick={() => window.location.href = '/volunteers/auth'}
              >
                Become a Volunteer
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default SuccessStoriesPage;
