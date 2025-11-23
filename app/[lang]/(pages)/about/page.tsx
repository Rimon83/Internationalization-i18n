import React from 'react'
import { getDictionary } from '../../dictionaries/dictionaries';

const AboutPage = async ({ params }: { params: { lang: "en" | "fr" } }) => {
  const { lang } = await params; 
   const dict = await getDictionary(lang);
  return (
    <div className="p-8 bg-gray-100 h-screen">
      <div>{dict.about.title}</div>
      <div>{dict.about.description}</div>
    </div>
  );
};

export default AboutPage