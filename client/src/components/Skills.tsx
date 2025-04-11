import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

interface Skill {
  name: string;
  level: number;
  category: "Languages" | "Technologies/Frameworks" | "Tools" | "Others";
}

const skills: Skill[] = [
  { name: "C++", level: 85, category: "Languages" },
  { name: "Java", level: 80, category: "Languages" },
  { name: "JavaScript", level: 75, category: "Languages" },
  { name: "Python", level: 70, category: "Languages" },
  { name: "React JS", level: 75, category: "Technologies/Frameworks" },
  { name: "Node JS", level: 65, category: "Technologies/Frameworks" },
  { name: "Ubuntu", level: 60, category: "Technologies/Frameworks" },
  { name: "Postman", level: 70, category: "Technologies/Frameworks" },
  { name: "Selenium", level: 60, category: "Technologies/Frameworks" },
  { name: "Git", level: 80, category: "Tools" },
  { name: "GitHub", level: 85, category: "Tools" },
  { name: "VS Code", level: 90, category: "Tools" },
  { name: "Intellij", level: 75, category: "Tools" },
  { name: "Problem-Solving", level: 85, category: "Others" },
  { name: "Responsive Web Design", level: 70, category: "Others" },
  { name: "Scripting in Python and JavaScript", level: 65, category: "Others" },
];

const categories = ["Languages", "Technologies/Frameworks", "Tools", "Others"] as const;

const SkillItem = ({ skill, index }: { skill: Skill; index: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3, delay: index * 0.05 }}
    className="mb-4"
  >
    <div className="flex justify-between items-center mb-1">
      <span className="text-sm font-medium text-gray-700">{skill.name}</span>
      <span className="text-xs font-medium text-gray-500">{skill.level}%</span>
    </div>
    <Progress value={skill.level} className="h-2" />
  </motion.div>
);

const SkillCategory = ({ category }: { category: typeof categories[number] }) => {
  const categorySkills = skills.filter(skill => skill.category === category);
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">{category}</h3>
      <div>
        {categorySkills.map((skill, index) => (
          <SkillItem key={skill.name} skill={skill} index={index} />
        ))}
      </div>
    </div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
            Technical Skills
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            A comprehensive overview of my technical abilities and competencies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <SkillCategory category={category} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
