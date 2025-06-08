
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ProgramProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  image?: string;
}

const ProgramCard = ({ title, description, icon, color, image }: ProgramProps) => {
  return (
    <Card className="ubuntu-card hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 overflow-hidden">
      <div className={`h-2 ${color}`}></div>
      {image && (
        <div className="h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <CardHeader className="text-center">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${color.replace('bg-', 'bg-').replace('-500', '-100')}`}>
          {icon}
        </div>
        <CardTitle className="text-xl text-utu-black font-heading">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-utu-gray leading-relaxed text-center">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default ProgramCard;
