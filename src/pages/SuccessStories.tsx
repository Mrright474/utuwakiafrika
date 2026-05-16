import React, { useState, useMemo, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { useSuccessStoriesManagement } from '@/hooks/useSuccessStoriesManagement';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Users, Search, ArrowUpDown, Printer } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import SEO from '@/components/seo/SEO';

const SuccessStoriesPage = () => {
  const { stories, loading } = useSuccessStoriesManagement();
  const [selectedStory, setSelectedStory] = useState<typeof stories[0] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'alphabetical'>('newest');
  const itemsPerPage = 6;

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(stories.map(story => story.category).filter(Boolean));
    return ['all', ...Array.from(cats)];
  }, [stories]);

  // Filter and sort stories
  const filteredStories = useMemo(() => {
    let filtered = stories;
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(story => story.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(story => 
        story.title.toLowerCase().includes(query) || 
        story.description.toLowerCase().includes(query)
      );
    }
    
    // Sort stories
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
        case 'oldest':
          return new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime();
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
    
    return sorted;
  }, [stories, selectedCategory, searchQuery, sortBy]);

  // Reset to page 1 when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

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

  const handlePrint = () => {
    window.print();
  };

  const handleStoryClick = async (story: typeof stories[0]) => {
    setSelectedStory(story);
    
    // Track view count
    try {
      await supabase.rpc('increment_story_view_count', { story_id: story.id });
    } catch (error) {
      console.error('Error tracking view:', error);
    }
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

        {/* Search and Filter Section */}
        <section className="py-8 bg-white shadow-sm sticky top-[72px] z-40">
          <div className="container mx-auto px-4 space-y-6">
            {/* Search Bar and Sort */}
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-utu-gray" />
                <Input
                  type="text"
                  placeholder="Search stories by title or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-6 text-base border-utu-gray/30 focus:border-utu-red focus:ring-utu-red"
                />
              </div>
              <div className="flex items-center gap-2 sm:w-auto">
                <ArrowUpDown className="h-5 w-5 text-utu-gray hidden sm:block" />
                <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                  <SelectTrigger className="w-full sm:w-[180px] border-utu-gray/30 focus:border-utu-red focus:ring-utu-red">
                    <SelectValue placeholder="Sort by..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="alphabetical">A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Category Filter */}
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
                <p className="text-xl text-utu-gray">
                  {searchQuery.trim() 
                    ? `No success stories found matching "${searchQuery}"`
                    : 'No success stories found for this category.'}
                </p>
                {searchQuery.trim() && (
                  <Button
                    onClick={() => setSearchQuery('')}
                    variant="outline"
                    className="mt-4 border-utu-red text-utu-red hover:bg-utu-red hover:text-white"
                  >
                    Clear search
                  </Button>
                )}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {paginatedStories.map((story) => (
                  <Card
                    key={story.id}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                    onClick={() => handleStoryClick(story)}
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
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto print:max-w-full print:max-h-full print:overflow-visible">
            <DialogHeader className="print:mb-8">
              <div className="flex items-start justify-between gap-4">
                <DialogTitle className="text-2xl sm:text-3xl font-bold font-heading text-utu-black print:text-4xl">
                  {selectedStory?.title}
                </DialogTitle>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePrint}
                  className="flex-shrink-0 print:hidden border-utu-red text-utu-red hover:bg-utu-red hover:text-white"
                  title="Print or save as PDF"
                >
                  <Printer className="h-4 w-4" />
                </Button>
              </div>
            </DialogHeader>
            {selectedStory && (
              <div className="space-y-6 print:space-y-8">
                {selectedStory.image_url && (
                  <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden print:h-96 print:page-break-inside-avoid">
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
                  <Badge className="bg-utu-red text-white w-fit print:text-lg print:px-4 print:py-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {selectedStory.category}
                  </Badge>
                )}
                <div className="prose prose-lg max-w-none print:prose-xl">
                  <p className="text-utu-gray leading-relaxed whitespace-pre-wrap print:text-black print:leading-loose">
                    {selectedStory.description}
                  </p>
                </div>
                
                {/* Print-only footer */}
                <div className="hidden print:block print:mt-12 print:pt-8 print:border-t-2 print:border-gray-300">
                  <div className="text-center space-y-2">
                    <p className="text-lg font-semibold text-utu-black">UTU Afrika</p>
                    <p className="text-sm text-gray-600">Transforming lives across Africa</p>
                    <p className="text-sm text-gray-600">www.utuafrika.org</p>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Print-specific styles */}
        <style>{`
          @media print {
            @page {
              margin: 2cm;
              size: A4;
            }
            
            body * {
              visibility: hidden;
            }
            
            [role="dialog"],
            [role="dialog"] * {
              visibility: visible;
            }
            
            [role="dialog"] {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              max-width: 100% !important;
              margin: 0;
              padding: 0;
              box-shadow: none;
              border: none;
            }
            
            /* Hide dialog overlay and close button */
            [data-radix-dialog-overlay],
            button[aria-label*="Close"],
            .print\\:hidden {
              display: none !important;
            }
          }
        `}</style>

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
