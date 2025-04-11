import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, GraduationCap, MapPin } from "lucide-react";

interface Education {
  id: number;
  institution: string;
  degree: string;
  location: string;
  period: string;
  grade: string;
}

const educations: Education[] = [
  {
    id: 1,
    institution: "Lovely Professional University Punjab",
    degree: "Computer Science and Engineering",
    location: "Jalandhar, Punjab",
    period: "2022 – 2026",
    grade: "CGPA: 6.35",
  },
  {
    id: 2,
    institution: "Sanjay Gandhi Inter College",
    degree: "12th with Science",
    location: "Saran, Bihar",
    period: "2020 – 2021",
    grade: "Percentage: 73.3%",
  },
  {
    id: 3,
    institution: "G.D Mission Public School",
    degree: "10th with Science",
    location: "Muzaffarpur, Bihar",
    period: "2017 – 2018",
    grade: "Percentage: 60%",
  },
];

const Education = () => {
  return (
    <section id="education" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
            Education
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            My academic journey and qualifications.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"></div>
          
          <div className="space-y-12">
            {educations.map((edu, index) => (
              <motion.div 
                key={edu.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className={`md:flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Circle for timeline */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-600 z-10"></div>
                  
                  {/* Card */}
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-xl text-gray-900">{edu.institution}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-gray-700">
                            <GraduationCap className="h-4 w-4 text-blue-600" />
                            <span>{edu.degree}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="h-4 w-4 text-blue-600" />
                            <span>{edu.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <CalendarDays className="h-4 w-4 text-blue-600" />
                            <span>{edu.period}</span>
                          </div>
                          <div className="text-sm font-medium text-gray-900 pt-2">
                            {edu.grade}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
