import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { futureProjectsData } from '@/data/futureProjectsData';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Target, TrendingUp, Heart, Users, DollarSign, Calendar, CheckCircle, Clock, CircleDot, Globe } from 'lucide-react';
import ProjectInvestmentForm from '@/components/donation/ProjectInvestmentForm';
import SEO from '@/components/seo/SEO';

const statusIcon = (status: string) => {
  if (status === 'completed') return <CheckCircle className="h-5 w-5 text-green-500" />;
  if (status === 'in-progress') return <Clock className="h-5 w-5 text-amber-500" />;
  return <CircleDot className="h-5 w-5 text-muted-foreground" />;
};

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = futureProjectsData.find(p => p.slug === slug);

  if (!project) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
            <Link to="/programs"><Button>Back to Programs</Button></Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img src={project.heroImage} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-end pb-16">
          <Link to="/programs" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors w-fit">
            <ArrowLeft className="h-4 w-4" /> Back to Programs
          </Link>
          <Badge className={`bg-gradient-to-r ${project.gradient} text-white border-0 mb-4 w-fit text-sm px-4 py-1`}>
            Vision 2030+
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white font-heading mb-4">{project.title}</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl leading-relaxed">{project.tagline}</p>
        </div>
      </section>

      {/* Overview & Vision */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground font-heading mb-6">Project Overview</h2>
              <div className="w-16 h-1 bg-primary mb-6" />
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">{project.overview}</p>
              <div className="bg-muted/50 rounded-xl p-6 border">
                <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" /> Our Vision
                </h3>
                <p className="text-muted-foreground leading-relaxed">{project.vision}</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img src={project.sectionImage} alt={`${project.title} vision`} className="w-full h-[400px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Economic Transformation */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-sm px-4 py-1 border-primary text-primary">Economic Impact</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-heading mb-4">
              <TrendingUp className="inline h-8 w-8 mr-2 text-primary" />
              {project.economicTransformation.title}
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mb-6" />
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
              {project.economicTransformation.description}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {project.economicTransformation.stats.map((stat, i) => (
              <Card key={i} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <p className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent mb-2`}>
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Well-Being */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <Badge variant="outline" className="mb-4 text-sm px-4 py-1 border-primary text-primary">Community Well-Being</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground font-heading mb-4">
                <Heart className="inline h-8 w-8 mr-2 text-primary" />
                {project.wellBeing.title}
              </h2>
              <div className="w-16 h-1 bg-primary mb-6" />
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">{project.wellBeing.description}</p>
            </div>
            <div className="space-y-4">
              {project.wellBeing.areas.map((area, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 border">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-foreground">{area}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Community Impact */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-sm px-4 py-1 border-primary text-primary">Community Impact</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-heading mb-4">
              <Users className="inline h-8 w-8 mr-2 text-primary" />
              Transforming Communities
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mb-6" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {project.communityImpacts.map((impact, i) => (
              <Card key={i} className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-foreground mb-3">{impact.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">{impact.description}</p>
                  <Badge className={`bg-gradient-to-r ${project.gradient} text-white border-0`}>
                    {impact.beneficiaries}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-sm px-4 py-1 border-primary text-primary">Roadmap</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-heading mb-4">
              <Calendar className="inline h-8 w-8 mr-2 text-primary" />
              Project Timeline
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mb-6" />
          </div>
          <div className="max-w-3xl mx-auto space-y-0">
            {project.timeline.map((item, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.status === 'in-progress' ? `bg-gradient-to-r ${project.gradient} text-white` : item.status === 'completed' ? 'bg-green-500 text-white' : 'bg-muted border-2 border-border'}`}>
                    {statusIcon(item.status)}
                  </div>
                  {i < project.timeline.length - 1 && <div className="w-0.5 h-full bg-border min-h-[60px]" />}
                </div>
                <div className="pb-10">
                  <Badge variant="outline" className="mb-2 text-xs">{item.year}</Badge>
                  <h3 className="text-lg font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Opportunities */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-sm px-4 py-1 border-primary text-primary">Invest in Africa</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-heading mb-4">
              <DollarSign className="inline h-8 w-8 mr-2 text-primary" />
              Investment Opportunities
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Partner with us to make this vision a reality. Every investment creates lasting impact.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {project.investmentOpportunities.map((opp, i) => (
              <Card key={i} className="border-0 shadow-lg hover:shadow-xl transition-all overflow-hidden">
                <div className={`h-1.5 bg-gradient-to-r ${project.gradient}`} />
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-foreground">{opp.title}</h3>
                    <Badge className={`bg-gradient-to-r ${project.gradient} text-white border-0 text-lg px-4`}>
                      {opp.amount}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4">{opp.description}</p>
                  <div className="flex items-center gap-2 text-sm font-medium text-primary">
                    <Target className="h-4 w-4" /> Impact: {opp.impact}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Form */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <ProjectInvestmentForm
              projectTitle={project.title}
              gradient={project.gradient}
              investmentOptions={project.investmentOpportunities.map(o => ({ title: o.title, amount: o.amount }))}
            />
          </div>
        </div>
      </section>

      {/* SDG Goals & CTA */}
      <section className={`py-16 md:py-24 bg-gradient-to-r ${project.gradient} text-white`}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
            <Globe className="inline h-8 w-8 mr-2" />
            Aligned with UN Sustainable Development Goals
          </h2>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {project.sdgGoals.map((goal, i) => (
              <Badge key={i} className="bg-white/20 text-white border-white/30 text-sm px-4 py-2">
                {goal}
              </Badge>
            ))}
          </div>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Join us in building {project.title} — an investment in Africa's future that creates lasting, 
            transformative impact for generations to come.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/donate">
              <Button size="lg" className="bg-white text-foreground hover:bg-white/90 text-lg px-8">
                Invest Now
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectDetail;
