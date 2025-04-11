import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Award, Calendar, ExternalLink } from "lucide-react";

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  link: string;
}

const certificates: Certificate[] = [
  {
    id: 1,
    title: "Core and Advance Java",
    issuer: "Board Infinity",
    date: "November 2024",
    link: "#", // This should be updated with the actual certificate link
  },
  {
    id: 2,
    title: "Mastering Data Structures & Algorithms using C and C++",
    issuer: "Udemy",
    date: "November 2023",
    link: "#", // This should be updated with the actual certificate link
  },
  {
    id: 3,
    title: "Object Oriented Programming Using C++",
    issuer: "NIIT",
    date: "April 2022",
    link: "#", // This should be updated with the actual certificate link
  },
];

const Certificates = () => {
  return (
    <section id="certificates" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
            Certificates
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            Professional certifications and achievements.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((certificate, index) => (
            <motion.div
              key={certificate.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col hover:shadow-md transition-shadow border border-gray-200">
                <CardContent className="flex-1 pt-6">
                  <div className="flex items-start gap-4">
                    <Award className="h-10 w-10 text-blue-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{certificate.title}</h3>
                      <div className="mt-2 text-sm text-gray-600">{certificate.issuer}</div>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {certificate.date}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <a 
                    href={certificate.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-colors text-sm flex items-center"
                  >
                    View Certificate <ExternalLink className="h-3.5 w-3.5 ml-1" />
                  </a>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
