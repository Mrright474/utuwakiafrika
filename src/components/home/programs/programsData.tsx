
import { BookOpen, Heart, Briefcase, Users, Star, Globe, Calendar, Gift } from 'lucide-react';

export const corePrograms = [
  {
    title: "Education & Scholarships",
    description: "Unlocking potential through quality learning. We provide school supplies, sponsorships, and community education to ensure every child has access to the education they deserve, breaking cycles of poverty through knowledge and opportunity.",
    icon: <BookOpen className="h-8 w-8 text-utu-red" />,
    color: "bg-utu-red",
    image: "/lovable-uploads/52fc0a4d-9182-45f4-9a60-c30b60f58000.png"
  },
  {
    title: "Health, Sanitation & Nutrition",
    description: "Building healthier communities from the ground up. Through maternal care, nutrition drives, clean water access, and mobile clinics, we ensure that good health is not a privilege but a right for every African.",
    icon: <Heart className="h-8 w-8 text-pink-600" />,
    color: "bg-pink-500",
    image: "/lovable-uploads/db631d52-55f4-4b7b-b992-df3760ccf9c9.png"
  },
  {
    title: "Livelihood & Entrepreneurship",
    description: "Empowering economic independence. We equip women, youth, and families with vocational skills and microfinance tools to start sustainable businesses, fostering self-reliance and community prosperity.",
    icon: <Briefcase className="h-8 w-8 text-utu-green" />,
    color: "bg-utu-green",
    image: "/lovable-uploads/0bcf167f-a80f-41b6-b423-2b2b8ae3ff32.png"
  },
  {
    title: "Gender Equality & Women Empowerment",
    description: "Championing the rights and voices of African women and girls. We create safe spaces, promote leadership opportunities, and advocate for gender equality because when women thrive, communities flourish.",
    icon: <Users className="h-8 w-8 text-purple-600" />,
    color: "bg-purple-500",
    image: "/lovable-uploads/659d6036-65e4-4685-afbc-86153bac1d28.png"
  },
  {
    title: "Youth Leadership & Mentorship",
    description: "Shaping tomorrow's visionary African leaders today. Through civic education, mentorship programs, and youth camps, we nurture ethical leadership that will transform our continent.",
    icon: <Star className="h-8 w-8 text-utu-gold" />,
    color: "bg-yellow-500",
    image: "/lovable-uploads/f7074fa8-f5e2-40fe-bc48-2ed3eb7f2adc.png"
  },
  {
    title: "Pan-African Culture & Awareness",
    description: "Reviving our rich African identity and heritage. Through storytelling, arts, language preservation, and inter-community projects, we strengthen our cultural bonds and promote continental unity.",
    icon: <Globe className="h-8 w-8 text-orange-600" />,
    color: "bg-orange-500",
    image: "/lovable-uploads/e7c03665-5121-4466-b87b-6f1707ae43f0.png"
  }
];

export const specialEvents = [
  {
    title: "UTU Yearly Conference",
    description: "An annual Pan-African gathering bringing together youth leaders, activists, volunteers, and partners from across the continent. Features workshops, cultural showcases, leadership forums, and keynote sessions. Held in a different African country each year to promote regional equity and unity.",
    icon: <Calendar className="h-8 w-8 text-blue-600" />,
    color: "bg-blue-500"
  },
  {
    title: "National Donation Day",
    description: "A day of mass mobilization in every country we operate, where citizens, schools, influencers, and businesses unite to contribute resources or time toward community aid efforts. Together, we demonstrate the power of collective action.",
    icon: <Gift className="h-8 w-8 text-green-600" />,
    color: "bg-green-500"
  }
];
