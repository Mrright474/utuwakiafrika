
export interface ImpactData {
  stats: Array<{
    value: string | number;
    label: string;
    icon: string;
  }>;
  successStories: Array<{
    quote: string;
    name: string;
    location: string;
    image: string;
  }>;
}

export const defaultImpactData: ImpactData = {
  stats: [
    { value: '25+', label: 'Projects Completed', icon: 'Award' },
    { value: '10,000+', label: 'Lives Impacted', icon: 'Users' },
    { value: '12', label: 'Countries Reached', icon: 'MapPin' },
    { value: '5', label: 'Years of Service', icon: 'Heart' }
  ],
  successStories: [
    {
      quote: "Thanks to the agricultural training program, I can now support my six children through farming. My crop yield has tripled since applying the techniques I learned.",
      name: "Sarah Namukasa",
      location: "Masaka, Uganda",
      image: "/lovable-uploads/f18d343d-5225-4a78-9319-ab494bfd2de3.png"
    },
    {
      quote: "The scholarship from Utu Wa Kiafrika changed my life. I was able to complete my education and now I work as a teacher in my community.",
      name: "Joseph Okello",
      location: "Tororo, Uganda",
      image: "/lovable-uploads/eccb4f96-1438-49ba-947c-c55ac2356fd0.png"
    },
    {
      quote: "Our village now has clean water thanks to the well that was constructed. Our children no longer miss school due to waterborne diseases.",
      name: "Mary Atim",
      location: "Lira, Uganda",
      image: "/lovable-uploads/a382b382-f2d2-4832-9343-db9d8abb367d.png"
    },
    {
      quote: "The microfinance loan helped me start my tailoring business. Now I employ three other women from my village and can afford to send my children to school.",
      name: "Florence Achieng",
      location: "Kampala, Uganda",
      image: "/lovable-uploads/da74094e-d355-4e7f-bda9-811435437ab1.png"
    }
  ]
};
