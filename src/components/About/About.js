import React from "react";
import "./About.css";

const About = () => {
  const team = [
    {
      name: "John Doe",
      role: "CEO",
      description:
        "John has been leading our company since its inception. He has a wealth of experience in the tech industry and is passionate about building great products that help people.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Jane Smith",
      role: "CTO",
      description:
        "Jane is the mastermind behind our technical strategy. With years of experience in software development, she ensures that our products are built to the highest standards of quality and performance.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Bob Johnson",
      role: "COO",
      description:
        "Bob is responsible for our operations and logistics. With a keen eye for detail and a knack for problem-solving, he keeps our business running smoothly and efficiently.",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="about-container">
      <h1 className="about-heading">About Us</h1>
      <div className="team-container">
        {team.map((member) => (
          <div className="team-member" key={`${member.name}-${member.role}`}>
            <img
              src={member.image}
              alt={member.name}
              className="member-image"
            />
            <div className="member-details">
              <h2 className="member-name">{member.name}</h2>
              <h3 className="member-role">{member.role}</h3>
              <p className="member-description">{member.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
