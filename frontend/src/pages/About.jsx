import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import image1 from "../assets/ab1.jpg";
import image2 from "../assets/na2.jpg";
import image3 from "../assets/hm3.jpg";
import image4 from "../assets/bp4.jpg";
import image5 from "../assets/dg5.jpg";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const cardVariants = {
  hover: {
    y: -5,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
  },
};

const teamMembers = [
  {
    name: "Anurag Banerjee",
    designation: "CSE, B.Tech 1st Year",
    affiliation: "MMMUT, GKP",
    linkedin: "  https://www.linkedin.com/in/anurag-banerjee-607568321/",
    github: "  https://github.com/ShadowGuy01234",
    instagram: "  https://www.instagram.com/0.anurag.0/",
    image: image1,
  },

  {
    name: "Bittu Prajapati",
    designation: "CSE, B.Tech 1st Year",
    affiliation: "MMMUT, GKP",
    linkedin: "https://www.linkedin.com/in/bittu-prajapati-a84879233/",
    github: "https://github.com/Bittu-the-coder/",
    instagram: "#",
    image: image4,
  },
  {
    name: "Deepanshi Gupta",
    designation: "ECE, B.Tech 1st Year",
    affiliation: "MMMUT, GKP",
    linkedin: "https://www.linkedin.com/in/deepanshi-gupta-064977282/",
    github: "https://github.com/archiieee1",
    instagram: "https://www.instagram.com/archiieee1?igsh=MXF6bXhjbmVmaXh4Zw==",
    image: image5,
  },
  {
    name: "Harsh Mishra",
    designation: "CSE, B.Tech 1st Year",
    affiliation: "MMMUT, GKP",
    linkedin: "https://www.linkedin.com/in/harsh-mishra-567708327/",
    github: "https://github.com/harsh-is-here",
    instagram: "https://www.instagram.com/_freak_hm?igsh=N3NqcTdjdXBvZGp5",
    image: image3,
  },

  {
    name: "Nitigya Aswani",
    designation: "IT, B.Tech 1st Year",
    affiliation: "MMMUT, GKP",
    linkedin: "https://www.linkedin.com/in/nitigyaaswani/",
    github: "https://github.com/AswaniNitigya",
    instagram: "https://www.instagram.com/nitigyaaswani",
    image: image2,
  },
];

function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto"
      >
        <motion.header variants={itemVariants} className="text-center mb-16">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">
            About WeatherPro
          </h1>
          <p className="text-xl text-blue-600 max-w-3xl mx-auto">
            Meet the team behind your favorite weather application
          </p>
        </motion.header>

        <motion.section variants={containerVariants} className="mb-16">
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-blue-800 mb-8 text-center"
          >
            Our Team
          </motion.h2>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={{
                  ...itemVariants,
                  hover: cardVariants.hover,
                }}
                className="bg-white rounded-xl shadow-lg overflow-hidden p-6 text-center"
              >
                <div className="mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full object-cover mx-auto"
                  />
                </div>
                <h3 className="text-xl font-bold text-blue-800 mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-1">
                  {member.designation}
                </p>
                <p className="text-blue-500 mb-4">{member.affiliation}</p>
                <div className="flex justify-center space-x-4">
                  {member.linkedin && (
                    <motion.a
                      whileHover={{ scale: 1.2 }}
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaLinkedin className="text-2xl" />
                    </motion.a>
                  )}
                  {member.github && (
                    <motion.a
                      whileHover={{ scale: 1.2 }}
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-black"
                    >
                      <FaGithub className="text-2xl" />
                    </motion.a>
                  )}
                  {member.instagram && (
                    <motion.a
                      whileHover={{ scale: 1.2 }}
                      href={member.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-600 hover:text-pink-800"
                    >
                      <FaInstagram className="text-2xl" />
                    </motion.a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <motion.section
            variants={itemVariants}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-blue-800 mb-4">
              Our Mission
            </h2>
            <p className="text-blue-600">
              At WeatherPro, we're committed to providing the most accurate and
              reliable weather forecasts to help you plan your day with
              confidence. Our team of developers and meteorology enthusiasts
              work tirelessly to bring you real-time updates and innovative
              features.
            </p>
          </motion.section>

          <motion.section
            variants={itemVariants}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-blue-800 mb-4">
              Our Technology
            </h2>
            <p className="text-blue-600">
              We leverage cutting-edge weather prediction models, satellite
              data, and machine learning algorithms to deliver precise
              forecasts. Our React-based frontend ensures a smooth user
              experience across all your devices.
            </p>
          </motion.section>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default About;
