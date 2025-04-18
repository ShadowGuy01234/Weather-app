import React from "react";
import "../App.css";
import image1 from "../assets/ab1.jpg";
import image2 from "../assets/na2.jpg";
import image3 from "../assets/hm3.jpg";
import image4 from "../assets/bp4.jpg";
import image5 from "../assets/dg5.jpg";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

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

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <header>
        <h1>ABOUT US</h1>
      </header>

      <section className="info-section team-section">
        <h2>Executive members MMMUT Reso</h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div className="team-member-card" key={index}>
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="card-image"
                />
              ) : (
                <div className="card-image-placeholder">Image</div>
              )}
              <h3>{member.name}</h3>
              <p className="designation">{member.designation}</p>
              <p className="affiliation">{member.affiliation}</p>
              <div className="connect-with-us">
                Connect with us:
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin className="social-icon" />
                  </a>
                )}
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub className="social-icon" />
                  </a>
                )}
                {member.instagram && (
                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram className="social-icon" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="bottom-sections-container">
        <section className="mission-section">
          <h2>Our Forecast Mission</h2>
          <p style={{ fontFamily: "Lato, sans-serif" }}>
            Welcome to our weather forecast website!
            <p></p>Our mission is to provide you with accurate weather
            information to help you plan your day and stay informed about
            changing conditions. The site uses up-to-date forecasts.
          </p>
        </section>
        <section className="contact-section">
          <h3>Contact Us</h3>
          <p style={{ fontFamily: "Lato, sans-serif" }}>
            {" "}
            We value your feedback and are here to assist you.
            <p>Madan Mohan Malaviya University of Technology</p>
            <p>Contact Details - +91-8765783730</p>
            <p>Email Details - admission2024@mmmut.ac.in</p>
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
