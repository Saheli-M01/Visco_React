import React from "react";
import '../styles/_contact.scss';

const teamMembers = [
  {
    name: "Devdeep Saha",
    role: "Designer, FrontEnd",
    quote: "I love my Job!",
    image: "/src/Assets/Images/Team/Devdeep.jpeg",
    email: "mailto:devdeep120205@gmail.com",
    linkedin: "https://www.linkedin.com/in/devdeep-saha-3b4570260",
    instagram: "https://www.instagram.com/devdeepsaha?igsh=ZmIwODdmaGNnMGFq",
  },
  {
    name: "Saheli Mondal",
    role: "UI/UX, FrontEnd",
    quote: "I Hate The Designer...",
    image: "/src/Assets/Images/Team/Saheli.jpg",
    email: "mailto:saheli.mondal.prof@gmail.com",
    linkedin: "https://www.linkedin.com/in/saheli-mondal-b9387729b/",
    twitter: "https://x.com/Mond_Saheli",
  },
  {
    name: "Santanu Pramanik",
    role: "BackEnd",
    quote: "I hate them both...",
    image: "/src/Assets/Images/Team/Santanu.jpeg",
    email: "mailto:prasantanu00@gmail.com",
    linkedin: "https://www.linkedin.com/in/santanu-pramanik-290b66229b/",
    twitter: "https://x.com/SantanuPra64579",
  },
 
];

const TeamSection = () => {
  return (
    <section id="contact">
      <div className="container py-5">
        <h2 className="text-center mb-5">Our Team</h2>
        <div className="row g-4 justify-content-center">
          {teamMembers.map((member, index) => (
            <div className="col-md-3" key={index}>
              <div className="team-card text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="team-photo mb-3"
                />
                <h5>{member.name}</h5>
                <p className="text-center">{member.role}</p>
                <p className="text-center">
                  <em>{member.quote}</em>
                </p>
                <div className="social-icons">
                  {member.email && (
                    <a href={member.email} target="_blank" rel="noopener noreferrer">
                      <i className="fa-solid fa-envelope"></i>
                    </a>
                  )}
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                      <i className="fa-brands fa-linkedin"></i>
                    </a>
                  )}
                  {member.instagram && (
                    <a href={member.instagram} target="_blank" rel="noopener noreferrer">
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                  )}
                  {member.twitter && (
                    <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                      <i className="fa-brands fa-x-twitter"></i>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;