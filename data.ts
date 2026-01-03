
import { Project, Education, Certification, SkillGroup } from './types';

export const PERSONAL_INFO = {
  name: "Eddie Mc Fleming",
  email: "eddiemcfleming@gmail.com",
  phone: "7418681054",
  location: "Chennai, Tamilnadu",
  github: "https://github.com/Eddie645",
  linkedin: "https://linkedin.com/in/eddie-mc-fleming-926bab22b/",
  bio: "Creative Developer & UI/UX Designer specializing in building responsive web applications and modern user interfaces.",
  // Using a high-quality black-and-white motorcycle/beach placeholder that matches the user's photo aesthetic
  profilePicture: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1000"
};

export const PROJECTS: Project[] = [
  {
    title: "Fastzee Food Delivery Website",
    description: "Developed a responsive web application for online food ordering, enabling users to browse menus, customize orders, and place them seamlessly.",
    link: "https://github.com/Eddie645/Fastzee-Food-Delivery-Website",
    tags: ["Web App", "Responsive", "Ordering System"],
    image: "https://images.unsplash.com/photo-1526367790999-0150786486a9?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Event Invitation Page",
    description: "A visually appealing event invitation webpage using HTML, CSS, and basic JavaScript for user interaction, inspired by high-end brands.",
    link: "https://eddie0505.neocities.org/Event/Ferrari",
    tags: ["HTML", "CSS", "UI/UX"],
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Netflix Demo",
    description: "A responsive Netflix clone featuring custom footer, navigation bar, and multi-device layout support to showcase modern design skills.",
    link: "https://eddie0505.neocities.org/Netflix/netflix",
    tags: ["Clone", "Frontend", "Design"],
    image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&q=80&w=800"
  }
];

export const EDUCATION: Education[] = [
  {
    institution: "Hindustan Institute of Technology and Science",
    degree: "Bachelor of Computer Application",
    period: "2022 - 2025",
    location: "Chennai"
  },
  {
    institution: "St. Lasalle Boys HR Sec School",
    degree: "Higher Secondary Certification",
    period: "2021 - 2022",
    location: "Tuticorin"
  }
];

export const SKILLS: SkillGroup[] = [
  {
    category: "Languages",
    items: ["Python", "HTML", "CSS", "JavaScript"]
  },
  {
    category: "Tools & Technologies",
    items: ["VS Code", "XAMPP", "Figma", "Canva", "Adobe XD", "Adobe Illustrator", "Sketch"]
  },
  {
    category: "Operating Systems",
    items: ["Linux", "Windows"]
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    name: "HTML Tutorial",
    issuer: "Great Learning Academy",
    description: "Foundational course covering core HTML elements and semantic web principles."
  }
];