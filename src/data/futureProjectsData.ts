export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'upcoming';
}

export interface Milestone {
  title: string;
  target: string;
  icon: string;
}

export interface InvestmentOpportunity {
  title: string;
  amount: string;
  description: string;
  impact: string;
}

export interface EconomicImpact {
  title: string;
  description: string;
  stats: { label: string; value: string }[];
}

export interface CommunityImpact {
  title: string;
  description: string;
  beneficiaries: string;
}

export interface FutureProjectDetail {
  slug: string;
  title: string;
  tagline: string;
  heroImage: string;
  sectionImage: string;
  overview: string;
  vision: string;
  economicTransformation: EconomicImpact;
  wellBeing: {
    title: string;
    description: string;
    areas: string[];
  };
  communityImpacts: CommunityImpact[];
  timeline: TimelineItem[];
  milestones: Milestone[];
  investmentOpportunities: InvestmentOpportunity[];
  sdgGoals: string[];
  gradient: string;
}

export const futureProjectsData: FutureProjectDetail[] = [
  {
    slug: 'ubuntu-university',
    title: 'Ubuntu University',
    tagline: 'Building Africa\'s Next-Generation Leaders Through World-Class Education',
    heroImage: '/lovable-uploads/ubuntu-university-campus.png',
    sectionImage: '/lovable-uploads/ubuntu-university.png',
    overview: 'Ubuntu University is a visionary institution designed to become a world-class center of academic excellence in East Africa. Rooted in the Ubuntu philosophy of communal well-being, the university will offer affordable, high-quality education in STEM, agriculture, healthcare, business, and the humanities — producing graduates who are equipped to solve Africa\'s most pressing challenges.',
    vision: 'To be the leading Pan-African university that nurtures innovation, cultural pride, and community-driven leadership. By 2035, Ubuntu University aims to graduate over 10,000 students annually, with 80% remaining in Africa to drive local economic development.',
    economicTransformation: {
      title: 'Catalyst for Economic Transformation',
      description: 'Ubuntu University will serve as an engine of economic growth by creating a skilled workforce, fostering entrepreneurship, and attracting investment to the region. Research partnerships with global institutions will generate intellectual property and technology transfer that drives industrialization.',
      stats: [
        { label: 'Jobs Created During Construction', value: '5,000+' },
        { label: 'Annual Graduates', value: '10,000+' },
        { label: 'Local Business Stimulation', value: '$50M+/year' },
        { label: 'Research Partnerships', value: '100+ Global' },
      ],
    },
    wellBeing: {
      title: 'Advancing Community Well-Being',
      description: 'The university\'s community outreach programs will provide free literacy classes, vocational training, and mentorship for surrounding villages. Health education campaigns, clean water projects, and agricultural extension services will extend the university\'s impact far beyond its campus walls.',
      areas: ['Free literacy & numeracy programs for rural communities', 'Vocational training centers for youth employment', 'Agricultural research improving local food security', 'Mental health & counseling services for students and communities', 'Sports & cultural facilities open to the public'],
    },
    communityImpacts: [
      { title: 'Rural Education Access', description: 'Satellite learning centers in 50+ villages providing remote access to university courses, bridging the urban-rural education divide.', beneficiaries: '50,000+ rural learners' },
      { title: 'Youth Employment Pipeline', description: 'Industry partnerships guaranteeing internships and job placements for 70% of graduates within 6 months of graduation.', beneficiaries: '7,000+ annual placements' },
      { title: 'Women in STEM Initiative', description: 'Dedicated scholarships and mentorship programs ensuring 50% female enrollment in science and technology programs.', beneficiaries: '5,000+ women annually' },
    ],
    timeline: [
      { year: '2025', title: 'Feasibility Study & Land Acquisition', description: 'Comprehensive feasibility study, environmental impact assessment, and securing 200+ acres of land.', status: 'in-progress' },
      { year: '2026', title: 'Architectural Design & Fundraising', description: 'World-class architectural design, groundbreaking ceremony, and launch of $100M capital campaign.', status: 'upcoming' },
      { year: '2027-2028', title: 'Phase 1 Construction', description: 'Construction of core academic buildings, student housing, library, and administrative facilities.', status: 'upcoming' },
      { year: '2029', title: 'First Intake of Students', description: 'Enrollment of first 2,000 students across 5 faculties with inaugural academic programs.', status: 'upcoming' },
      { year: '2030-2035', title: 'Full Campus Completion', description: 'Research centers, sports complexes, innovation hubs, and expansion to 10,000+ student capacity.', status: 'upcoming' },
    ],
    milestones: [
      { title: 'Land Secured', target: '200+ Acres', icon: 'MapPin' },
      { title: 'Capital Raised', target: '$100M Goal', icon: 'DollarSign' },
      { title: 'Faculties Launched', target: '5 Faculties', icon: 'BookOpen' },
      { title: 'First Graduates', target: 'Class of 2033', icon: 'GraduationCap' },
    ],
    investmentOpportunities: [
      { title: 'Naming Rights — Main Library', amount: '$5,000,000', description: 'Sponsor the flagship 50,000-volume library with state-of-the-art digital resources.', impact: 'Serves 10,000+ students daily' },
      { title: 'STEM Innovation Lab', amount: '$2,000,000', description: 'Fund a cutting-edge laboratory for AI, robotics, and biotech research.', impact: 'Produces 500+ research papers annually' },
      { title: 'Scholarship Endowment Fund', amount: '$500,000+', description: 'Create a perpetual scholarship fund supporting disadvantaged students from across Africa.', impact: '200+ scholarships per year' },
      { title: 'Student Housing Block', amount: '$1,000,000', description: 'Build a modern dormitory housing 500 students with study facilities and amenities.', impact: 'Affordable housing for 500 students' },
    ],
    sdgGoals: ['SDG 4: Quality Education', 'SDG 8: Decent Work', 'SDG 9: Innovation', 'SDG 10: Reduced Inequalities'],
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    slug: 'ubuntu-hospital',
    title: 'Ubuntu Hospital',
    tagline: 'World-Class Healthcare Accessible to Every African Community',
    heroImage: '/lovable-uploads/ubuntu-hospital-building.png',
    sectionImage: '/lovable-uploads/ubuntu-hospital.png',
    overview: 'Ubuntu Hospital is a flagship healthcare facility designed to provide comprehensive, affordable medical services to underserved communities across East Africa. Combining modern medical technology with community-centered care, the hospital will feature specialized departments in maternal health, pediatrics, surgery, oncology, and mental health — services currently requiring travel abroad for many Africans.',
    vision: 'To establish a 500-bed, internationally accredited hospital that eliminates the need for medical tourism, trains 1,000+ healthcare workers annually, and reduces maternal and child mortality by 60% in the surrounding region by 2035.',
    economicTransformation: {
      title: 'Healthcare as an Economic Driver',
      description: 'Ubuntu Hospital will transform the regional economy by creating thousands of direct and indirect jobs, reducing healthcare expenditure leakage to foreign hospitals, and establishing a medical tourism destination that brings revenue into the community. The hospital\'s pharmaceutical manufacturing wing will produce affordable generic medicines for the region.',
      stats: [
        { label: 'Direct Jobs Created', value: '3,000+' },
        { label: 'Medical Tourism Revenue', value: '$30M+/year' },
        { label: 'Healthcare Cost Reduction', value: '70% cheaper' },
        { label: 'Local Pharmaceutical Production', value: '50+ medicines' },
      ],
    },
    wellBeing: {
      title: 'Transforming Community Health',
      description: 'Beyond hospital walls, Ubuntu Hospital will deploy mobile clinics to remote villages, train community health workers, and run preventive health campaigns. A telemedicine network will connect rural health centers to specialists, ensuring no community is too remote for quality healthcare.',
      areas: ['Mobile clinic outreach to 100+ remote villages', 'Community health worker training program (500+ annually)', 'Free maternal and child health services', 'Mental health awareness and counseling centers', 'Clean water and sanitation initiatives around the hospital'],
    },
    communityImpacts: [
      { title: 'Maternal Health Revolution', description: 'A dedicated maternity wing with trained midwives, reducing maternal mortality in the region by providing safe delivery services.', beneficiaries: '20,000+ mothers annually' },
      { title: 'Pediatric Care Access', description: 'Free pediatric services for children under 5, including vaccinations, nutrition programs, and emergency care.', beneficiaries: '50,000+ children annually' },
      { title: 'Mental Health De-stigmatization', description: 'Community-based mental health programs breaking stigma and providing counseling services in local languages.', beneficiaries: '10,000+ individuals' },
    ],
    timeline: [
      { year: '2025', title: 'Planning & Partnerships', description: 'Medical needs assessment, partnership agreements with WHO and international medical institutions.', status: 'in-progress' },
      { year: '2026', title: 'Architectural Design & Equipment Sourcing', description: 'Hospital design by leading healthcare architects, procurement of medical equipment.', status: 'upcoming' },
      { year: '2027-2029', title: 'Construction & Staff Recruitment', description: 'Phased construction of the 500-bed facility, recruitment and training of medical staff.', status: 'upcoming' },
      { year: '2030', title: 'Hospital Grand Opening', description: 'Official opening with initial 200-bed capacity, emergency department, and outpatient services.', status: 'upcoming' },
      { year: '2031-2035', title: 'Expansion & Specialization', description: 'Expansion to full 500-bed capacity with specialized centers of excellence.', status: 'upcoming' },
    ],
    milestones: [
      { title: 'WHO Partnership', target: 'Signed 2026', icon: 'Handshake' },
      { title: 'Bed Capacity', target: '500 Beds', icon: 'Bed' },
      { title: 'Specialists Trained', target: '1,000+/year', icon: 'Stethoscope' },
      { title: 'Lives Saved', target: '100,000+/year', icon: 'Heart' },
    ],
    investmentOpportunities: [
      { title: 'Emergency & Trauma Center', amount: '$8,000,000', description: 'Build a state-of-the-art emergency department with helicopter landing pad.', impact: 'Saves 5,000+ critical lives annually' },
      { title: 'Oncology Wing', amount: '$5,000,000', description: 'Establish a cancer treatment center with radiation therapy and chemotherapy facilities.', impact: 'Treats 2,000+ cancer patients annually' },
      { title: 'Mobile Clinic Fleet', amount: '$1,000,000', description: 'Fund 10 fully-equipped mobile clinics serving remote communities.', impact: 'Reaches 100,000+ rural patients' },
      { title: 'Nursing School', amount: '$3,000,000', description: 'Train the next generation of healthcare workers with a dedicated nursing and midwifery school.', impact: '500+ nurses graduated annually' },
    ],
    sdgGoals: ['SDG 3: Good Health', 'SDG 5: Gender Equality', 'SDG 10: Reduced Inequalities', 'SDG 17: Partnerships'],
    gradient: 'from-rose-500 to-red-600',
  },
  {
    slug: 'utu-disaster-relief',
    title: 'UTU Disaster Relief Arm',
    tagline: 'Rapid Response, Lasting Resilience — Protecting Africa\'s Most Vulnerable',
    heroImage: '/lovable-uploads/utu-disaster-relief-ops.png',
    sectionImage: '/lovable-uploads/utu-disaster-relief.png',
    overview: 'The UTU Disaster Relief Arm is a dedicated humanitarian response unit designed to provide rapid, effective disaster relief across Africa. From floods and droughts to epidemics and conflicts, this initiative combines pre-positioned supplies, trained volunteer networks, and drone-based delivery to reach affected communities within 24 hours of any disaster.',
    vision: 'To build Africa\'s most responsive and community-embedded disaster relief organization, capable of reaching any affected community within 24 hours and supporting long-term recovery that builds back better and more resilient.',
    economicTransformation: {
      title: 'Building Economic Resilience',
      description: 'Disaster preparedness reduces the economic devastation caused by natural calamities. By investing in early warning systems, resilient infrastructure, and rapid recovery programs, the UTU Disaster Relief Arm prevents billions in economic losses and protects livelihoods. Post-disaster recovery programs include microloans for affected businesses and agricultural rehabilitation.',
      stats: [
        { label: 'Economic Losses Prevented', value: '$500M+' },
        { label: 'Livelihoods Protected', value: '100,000+' },
        { label: 'Recovery Microloans Issued', value: '$10M+' },
        { label: 'Early Warning Coverage', value: '5M+ people' },
      ],
    },
    wellBeing: {
      title: 'Protecting Lives & Dignity',
      description: 'Beyond immediate relief, the Disaster Relief Arm focuses on psychosocial support, temporary shelters, clean water distribution, and rebuilding community infrastructure. Special attention is given to the most vulnerable — women, children, the elderly, and persons with disabilities.',
      areas: ['24-hour rapid response deployment capability', 'Psychosocial support and trauma counseling', 'Temporary shelter and long-term housing reconstruction', 'Clean water and food distribution systems', 'Community disaster preparedness training'],
    },
    communityImpacts: [
      { title: 'Rapid Response Network', description: 'A network of 5,000+ trained community volunteers across East Africa, ready to mobilize within hours of any disaster.', beneficiaries: '5,000+ trained volunteers' },
      { title: 'Drought Resilience Program', description: 'Water harvesting infrastructure and drought-resistant crop distribution protecting farming communities from climate change.', beneficiaries: '200,000+ farmers' },
      { title: 'Conflict Zone Support', description: 'Providing medical care, food, and shelter to internally displaced persons in conflict-affected regions.', beneficiaries: '50,000+ displaced persons' },
    ],
    timeline: [
      { year: '2025', title: 'Organizational Setup', description: 'Establishing the disaster relief unit, recruiting core team, and building initial supply stockpiles.', status: 'in-progress' },
      { year: '2026', title: 'Volunteer Network Launch', description: 'Training 1,000+ community disaster response volunteers across 5 countries.', status: 'upcoming' },
      { year: '2027', title: 'Drone Delivery System', description: 'Deploying drone-based supply delivery system for hard-to-reach areas.', status: 'upcoming' },
      { year: '2028-2030', title: 'Regional Expansion', description: 'Expanding operations to cover all of East and Central Africa with pre-positioned supply depots.', status: 'upcoming' },
      { year: '2030+', title: 'Continental Coverage', description: 'Achieving Pan-African disaster response capability with satellite early warning systems.', status: 'upcoming' },
    ],
    milestones: [
      { title: 'Response Time', target: 'Under 24 Hours', icon: 'Clock' },
      { title: 'Volunteer Network', target: '5,000+ Trained', icon: 'Users' },
      { title: 'Supply Depots', target: '20+ Locations', icon: 'Warehouse' },
      { title: 'Lives Protected', target: '1M+ Annually', icon: 'Shield' },
    ],
    investmentOpportunities: [
      { title: 'Emergency Supply Depot', amount: '$500,000', description: 'Establish a pre-positioned supply warehouse with food, medicine, and shelter materials.', impact: 'Serves 50,000+ people per disaster' },
      { title: 'Drone Delivery Fleet', amount: '$2,000,000', description: 'Deploy 50+ cargo drones for rapid delivery to inaccessible disaster zones.', impact: 'Reaches communities within 2 hours' },
      { title: 'Early Warning System', amount: '$1,500,000', description: 'Install satellite-based early warning systems covering flood and drought-prone regions.', impact: 'Protects 5M+ people' },
      { title: 'Volunteer Training Program', amount: '$300,000', description: 'Train 1,000 community disaster response volunteers with equipment and certification.', impact: '1,000 trained responders' },
    ],
    sdgGoals: ['SDG 1: No Poverty', 'SDG 2: Zero Hunger', 'SDG 11: Sustainable Cities', 'SDG 13: Climate Action'],
    gradient: 'from-sky-500 to-blue-600',
  },
  {
    slug: 'ubuntu-social-media',
    title: 'Ubuntu Social Media',
    tagline: 'Africa\'s Own Digital Platform — Connecting Communities, Preserving Culture',
    heroImage: '/lovable-uploads/ubuntu-social-media-platform.png',
    sectionImage: '/lovable-uploads/ubuntu-social-media.png',
    overview: 'Ubuntu Social Media is an African-built digital platform designed to connect communities, preserve indigenous languages and cultures, and provide a safe online space that respects African values. Unlike global platforms that extract data and profit from African users, Ubuntu Social Media keeps data, revenue, and cultural narrative in African hands.',
    vision: 'To build the leading African social media platform with 50 million users by 2032, generating $100M+ in annual revenue that is reinvested in African communities, digital literacy programs, and content creator empowerment.',
    economicTransformation: {
      title: 'Digital Economy Revolution',
      description: 'Ubuntu Social Media will create an entirely new digital economy for Africa. Content creators, local businesses, and entrepreneurs will earn revenue through the platform\'s creator fund, marketplace features, and advertising system. By keeping ad revenue within the continent, the platform prevents the billions currently flowing to foreign tech companies.',
      stats: [
        { label: 'Creator Revenue Distributed', value: '$50M+/year' },
        { label: 'Local Businesses Empowered', value: '500,000+' },
        { label: 'Digital Jobs Created', value: '10,000+' },
        { label: 'Ad Revenue Retained in Africa', value: '$100M+/year' },
      ],
    },
    wellBeing: {
      title: 'Cultural Preservation & Digital Safety',
      description: 'The platform will feature built-in support for 100+ African languages, AI-powered content moderation respecting cultural norms, and digital literacy programs for first-time internet users. Special protections for children and vulnerable users ensure a safer online experience.',
      areas: ['Support for 100+ African languages and dialects', 'Digital literacy training for 1M+ first-time users', 'Child safety protections and parental controls', 'Mental health resources and anti-cyberbullying tools', 'Cultural heritage preservation through digital storytelling'],
    },
    communityImpacts: [
      { title: 'Language Preservation', description: 'Digitizing and promoting endangered African languages through content creation tools and language learning features.', beneficiaries: '200+ languages preserved' },
      { title: 'Small Business Growth', description: 'Integrated marketplace and advertising tools helping small African businesses reach customers across the continent.', beneficiaries: '500,000+ small businesses' },
      { title: 'Youth Digital Employment', description: 'Content creator programs, digital marketing training, and tech internships creating jobs for African youth.', beneficiaries: '10,000+ youth employed' },
    ],
    timeline: [
      { year: '2025', title: 'Platform Design & Development', description: 'User research, platform architecture, and development of core features with African design principles.', status: 'in-progress' },
      { year: '2026', title: 'Beta Launch in East Africa', description: 'Limited release in Uganda, Kenya, and Tanzania with 100,000 beta users.', status: 'upcoming' },
      { year: '2027', title: 'Full East African Launch', description: 'Public launch across East Africa with marketplace, creator fund, and language support.', status: 'upcoming' },
      { year: '2028-2030', title: 'Pan-African Expansion', description: 'Expanding to West, Southern, and North Africa, reaching 20M+ users.', status: 'upcoming' },
      { year: '2030-2032', title: 'Global African Diaspora', description: 'Connecting African diaspora communities worldwide, reaching 50M+ users globally.', status: 'upcoming' },
    ],
    milestones: [
      { title: 'Beta Users', target: '100,000', icon: 'Users' },
      { title: 'Languages Supported', target: '100+', icon: 'Globe' },
      { title: 'Creator Fund', target: '$50M/year', icon: 'DollarSign' },
      { title: 'Total Users', target: '50M by 2032', icon: 'TrendingUp' },
    ],
    investmentOpportunities: [
      { title: 'Seed Investment — Platform Development', amount: '$5,000,000', description: 'Fund the core engineering team and platform infrastructure for the initial launch.', impact: 'Builds foundation for 50M+ users' },
      { title: 'Creator Empowerment Fund', amount: '$10,000,000', description: 'Establish the creator fund that pays African content creators for their contributions.', impact: 'Supports 50,000+ creators' },
      { title: 'Digital Literacy Campaign', amount: '$1,000,000', description: 'Train 1 million first-time internet users in digital literacy and online safety.', impact: '1M+ new digital citizens' },
      { title: 'Language AI Development', amount: '$3,000,000', description: 'Build AI translation and content moderation for 100+ African languages.', impact: 'Preserves 200+ languages' },
    ],
    sdgGoals: ['SDG 4: Quality Education', 'SDG 8: Decent Work', 'SDG 9: Innovation', 'SDG 11: Sustainable Communities'],
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    slug: 'ubuntu-technologies',
    title: 'Ubuntu Technologies',
    tagline: 'Powering Africa\'s Tech Revolution — From the Continent, For the Continent',
    heroImage: '/lovable-uploads/ubuntu-technologies-hub.png',
    sectionImage: '/lovable-uploads/ubuntu-technologies.png',
    overview: 'Ubuntu Technologies is a Pan-African technology company focused on developing homegrown solutions for Africa\'s unique challenges. From solar-powered internet infrastructure and fintech platforms to agricultural technology and AI-driven healthcare diagnostics, Ubuntu Technologies will build the tools Africa needs to leapfrog into a digital future.',
    vision: 'To become Africa\'s leading technology conglomerate by 2035, generating $500M+ in annual revenue, employing 5,000+ African engineers, and deploying technology solutions that improve the lives of 100 million Africans.',
    economicTransformation: {
      title: 'Technology-Driven Industrialization',
      description: 'Ubuntu Technologies will drive Africa\'s fourth industrial revolution by building local capacity in software development, hardware manufacturing, and artificial intelligence. By retaining tech talent and revenue within Africa, the company will reverse brain drain and create a thriving tech ecosystem that attracts global investment.',
      stats: [
        { label: 'Engineers Employed', value: '5,000+' },
        { label: 'Annual Revenue', value: '$500M+' },
        { label: 'Brain Drain Reversal', value: '2,000+ returnees' },
        { label: 'Tech Startups Incubated', value: '500+' },
      ],
    },
    wellBeing: {
      title: 'Technology for Human Development',
      description: 'Ubuntu Technologies\' products will directly improve quality of life through affordable internet access, digital financial services for the unbanked, precision agriculture tools for smallholder farmers, and AI-powered health diagnostics for rural clinics.',
      areas: ['Affordable internet for 10M+ rural households', 'Mobile banking for 20M+ unbanked Africans', 'Precision agriculture tools for smallholder farmers', 'AI health diagnostics for rural clinics', 'Solar-powered tech infrastructure for off-grid communities'],
    },
    communityImpacts: [
      { title: 'Rural Internet Connectivity', description: 'Solar-powered mesh network providing affordable high-speed internet to rural and underserved communities across East Africa.', beneficiaries: '10M+ rural households' },
      { title: 'Fintech for the Unbanked', description: 'Mobile-first banking platform providing savings, loans, insurance, and money transfer services without traditional bank accounts.', beneficiaries: '20M+ unbanked individuals' },
      { title: 'AgriTech for Farmers', description: 'AI-powered crop disease detection, weather prediction, and market price information helping smallholder farmers increase yields.', beneficiaries: '5M+ farmers' },
    ],
    timeline: [
      { year: '2025', title: 'Company Formation & R&D', description: 'Establishing the technology company, hiring core engineering team, and beginning R&D on flagship products.', status: 'in-progress' },
      { year: '2026', title: 'First Product Launches', description: 'Launch of rural internet solution and mobile banking platform in Uganda.', status: 'upcoming' },
      { year: '2027-2028', title: 'Regional Expansion', description: 'Expanding products to Kenya, Tanzania, Rwanda, and DRC with localized solutions.', status: 'upcoming' },
      { year: '2029-2030', title: 'Hardware Manufacturing', description: 'Establishing Africa\'s first solar-powered router manufacturing facility and tech assembly plant.', status: 'upcoming' },
      { year: '2030-2035', title: 'Pan-African Tech Leader', description: 'Becoming Africa\'s leading tech company with products serving 100M+ users across the continent.', status: 'upcoming' },
    ],
    milestones: [
      { title: 'Products Launched', target: '10+ Solutions', icon: 'Rocket' },
      { title: 'Users Served', target: '100M+', icon: 'Users' },
      { title: 'Countries Active', target: '15+ Nations', icon: 'Globe' },
      { title: 'Revenue Target', target: '$500M/year', icon: 'TrendingUp' },
    ],
    investmentOpportunities: [
      { title: 'Series A — Core Platform', amount: '$10,000,000', description: 'Fund the development and launch of the first three technology products.', impact: 'Reaches 5M+ users in Year 1' },
      { title: 'Solar Internet Infrastructure', amount: '$5,000,000', description: 'Deploy solar-powered internet nodes across 1,000 rural villages.', impact: 'Connects 2M+ people' },
      { title: 'Tech Incubator Program', amount: '$2,000,000', description: 'Establish an innovation hub and startup incubator nurturing 100+ African tech startups.', impact: '500+ jobs created' },
      { title: 'Manufacturing Facility', amount: '$15,000,000', description: 'Build Africa\'s first solar router and IoT device manufacturing plant.', impact: '1,000+ manufacturing jobs' },
    ],
    sdgGoals: ['SDG 9: Innovation & Infrastructure', 'SDG 8: Decent Work', 'SDG 1: No Poverty', 'SDG 7: Clean Energy'],
    gradient: 'from-emerald-500 to-teal-600',
  },
];
