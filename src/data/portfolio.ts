import type { ImageMetadata } from 'astro';

import idorImage from '../assets/projects/idor.webp';
import scoutImage from '../assets/projects/scout.webp';
import callaiImage from '../assets/projects/callai.webp';
import mobileImage from '../assets/projects/mobile.webp';
import fintechImage from '../assets/projects/fintech.webp';
import blasterImage from '../assets/projects/blaster.webp';
import jokrImage from '../assets/projects/jokr.webp';
import batteryImage from '../assets/projects/battery.webp';

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  isLeft: boolean;
}

export interface Project {
  title: string;
  description: string;
  image: ImageMetadata;
  tags: string[];
  bgColor: string;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export const experiences: Experience[] = [
  {
    title: "Lead Software Architect",
    company: "Xofi.ai",
    period: "Oct 2024 - Oct 2025",
    description: "Led strategic technical analysis avoiding risky investments (saving +$10k). Designed an ERP for cooperatives using Django and Python, and implemented a QA suite reaching 87% coverage to reduce production bugs.",
    isLeft: true
  },
  {
    title: "Full Stack Developer",
    company: "MERINSA",
    period: "May 2024 - Sep 2024",
    description: "Led critical modernization of legacy applications utilizing Laravel and Nuxt. Optimized database and backend performance, achieving greater stability for high-traffic systems.",
    isLeft: false
  },
  {
    title: "Senior Software Engineer",
    company: "Teamcore",
    period: "Jun 2022 - Feb 2024",
    description: "Executed a high-impact reengineering of the 'Descargador' module, boosting system performance by 40%. Developed core REST APIs and improved the UI, lowering support tickets by 20%.",
    isLeft: true
  },
  {
    title: "Senior Full Stack Developer",
    company: "FIT Big Data",
    period: "Feb 2020 - May 2021",
    description: "Developed critical reporting and core banking modules. Architected and implemented scalable microservices on AWS, enabling seamless infrastructure growth without downtime.",
    isLeft: false
  }
];

export const projects: Project[] = [
  {
    title: "IDOR - AI Financial Audit",
    description: "An advanced AI Agent architecture developed to analyze complex financial documents and detect anomalies. Implements a robust hybrid design utilizing Django and FastAPI microservices.",
    image: idorImage,
    tags: ["Python", "FastAPI", "Django", "LangChain", "AI Agents"],
    bgColor: "bg-white"
  },
  {
    title: "Scout - Intelligence Engine",
    description: "A modular and robust Web Scraping engine designed for data engineering and competitive price monitoring within the Pharma and Retail sectors.",
    image: scoutImage,
    tags: ["Django", "Selenium", "Docker", "Web Scraping", "Data Engineering"],
    bgColor: "bg-red-50"
  },
  {
    title: "CallAI - Voice Assistant",
    description: "An autonomous voice assistant created by integrating powerful LLMs with programmable telephony to automate customer support and create intelligent voice agents.",
    image: callaiImage,
    tags: ["OpenAI GPT-4", "Twilio", "LLMs", "Automation"],
    bgColor: "bg-gray-50"
  },
  {
    title: "Mobile Biometric System",
    description: "Designed a comprehensive security system with a native mobile app and web dashboard. Implemented hardware-based biometric authentication (fingerprint).",
    image: mobileImage,
    tags: ["Flutter", "Vue.js", "Firebase", "Biometrics"],
    bgColor: "bg-brand-light"
  },
  {
    title: "Fintech Serverless Automation",
    description: "Implemented a serverless architecture using Azure Functions with Cosmos DB and Node.js/TypeScript for a major financial entity. Transformed manual processes into dynamic, real-time dashboards.",
    image: fintechImage,
    tags: ["Node.js", "TypeScript", "Azure Functions", "Cosmos DB"],
    bgColor: "bg-white"
  },
  {
    title: "Blaster - AdTech SaaS",
    description: "Built a high-availability advertising management system. Integrated and implemented strict DevSecOps standards utilizing tools like SonarQube and Sentry.",
    image: blasterImage,
    tags: ["DevSecOps", "SonarQube", "Sentry", "SaaS"],
    bgColor: "bg-red-50"
  },
  {
    title: "Jokr - Quick-Commerce",
    description: "Architected a retail quick-commerce platform using React and Azure. Implemented modern CI/CD pipelines and advanced data intelligence features.",
    image: jokrImage,
    tags: ["React", "Azure", "CI/CD", "Data Intelligence"],
    bgColor: "bg-gray-50"
  },
  {
    title: "Battery Plaza - E-commerce",
    description: "Led the development of the first e-commerce platform in the automotive sector managing over 10,000 products. Successfully integrated complex logistics systems via Laravel and AWS.",
    image: batteryImage,
    tags: ["Laravel", "AWS", "E-commerce", "Logistics APIs"],
    bgColor: "bg-white"
  }
];

export const services: Service[] = [
  {
    title: "Quality & Optimization",
    description: "Deeply focused on clean code, automated testing, and optimizing application performance across systems of high traffic.",
    icon: "/icons/shield.svg"
  },
  {
    title: "Cloud Architectures",
    description: "Design and deployment of scalable serverless applications and microservices using AWS, Azure, and GCP.",
    icon: "/icons/cloud.svg"
  },
  {
    title: "Legacy Modernization",
    description: "Strategic refactoring and upgrading of legacy monolithic systems into modern, robust, and maintainable architectures.",
    icon: "/icons/reboot.svg"
  },
  {
    title: "Full Stack Development",
    description: "End-to-end web and mobile application creation leveraging Python, PHP, JS, and modern frontend frameworks.",
    icon: "/icons/screen.svg"
  }
];
