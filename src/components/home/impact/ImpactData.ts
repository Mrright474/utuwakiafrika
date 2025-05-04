
export interface ImpactData {
  stats: Array<{
    value: string | number;
    label: string;
    icon: string;
  }>;
  ugandaProjects: Array<{
    title: string;
    description: string;
    location: string;
    image: string;
    year: number;
    beneficiaries: number;
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
    { value: '8+', label: 'Projects in Uganda', icon: 'Award' },
    { value: '2,000+', label: 'Ugandans Supported', icon: 'Users' },
    { value: '5', label: 'Districts Reached', icon: 'MapPin' },
    { value: '1', label: 'Years in Uganda', icon: 'Heart' }
  ],
  ugandaProjects: [
    {
      title: "Clean Water Initiative in Kampala",
      description: "Installed 8 water purification systems serving 2,500 residents in slum areas of Kampala, reducing waterborne disease incidents by 65%.",
      location: "Kampala",
      image: "/lovable-uploads/7e1302ab-dabd-404d-b089-b1c7bdf0e631.png",
      year: 2023,
      beneficiaries: 2500
    },
    {
      title: "Rural Education Support in Jinja",
      description: "Built 3 classrooms and provided educational materials to 4 schools in Jinja district, enabling 450 more children to access quality education.",
      location: "Jinja",
      image: "/lovable-uploads/53460912-2f2a-428b-b6e5-bc12ccf03604.png",
      year: 2023,
      beneficiaries: 450
    },
    {
      title: "Women's Empowerment in Mbale",
      description: "Trained 120 women in entrepreneurship and provided microloans, resulting in 85 sustainable small businesses in Mbale communities.",
      location: "Mbale",
      image: "/lovable-uploads/da74094e-d355-4e7f-bda9-811435437ab1.png",
      year: 2024,
      beneficiaries: 120
    },
    {
      title: "Healthcare Outreach in Gulu",
      description: "Mobile clinics provided essential healthcare services to 1,800 patients in remote villages of Gulu district, with focus on maternal care.",
      location: "Gulu",
      image: "/lovable-uploads/6f761c26-afdc-468f-8580-4cbc8c3cab83.png",
      year: 2024,
      beneficiaries: 1800
    }
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
    }
  ]
};
