"use client";

import React from "react";

type ProjectCardProps = {
  title: string;
  description: string;
  link?: string;
};

export default function ProjectCard({ title, description, link }: ProjectCardProps) {
  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "1rem",
      background: "#fff",
      marginBottom: "1rem"
    }}>
      <h3>{title}</h3>
      <p>{description}</p>
      {link && <a href={link} target="_blank" rel="noopener noreferrer">View Project</a>}
    </div>
  );
}