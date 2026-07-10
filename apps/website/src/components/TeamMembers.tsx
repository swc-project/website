const members = [
  {
    name: "kdy1 / Donny",
    github: "kdy1",
    role: "Lead Maintainer",
  },
  {
    name: "OJ Kwon",
    github: "kwonoj",
    role: "Core Team",
  },
  {
    name: "magic-akari",
    github: "magic-akari",
    role: "Core Team",
  },
  {
    name: "Austaras",
    github: "Austaras",
    role: "Core Team",
  },
  {
    name: "CPunisher",
    github: "CPunisher",
    role: "Core Team",
  },
  {
    name: "bohan",
    github: "bvanjoi",
    role: "Core Team",
  },
  {
    name: "LongYinan",
    github: "Brooooooklyn",
    role: "Maintainer of @swc-node/*",
  },
];

export default function TeamMembers() {
  return (
    <div className="swc-team-grid">
      {members.map((member) => (
        <a
          href={`https://github.com/${member.github}`}
          key={member.github}
          target="_blank"
          rel="noopener noreferrer"
          className="swc-team-member"
        >
          <img
            src={`https://github.com/${member.github}.png`}
            alt={`${member.name} avatar`}
            width={64}
            height={64}
            loading="lazy"
          />
          <div className="swc-team-member-name">{member.name}</div>
          <div>{member.role}</div>
        </a>
      ))}
    </div>
  );
}
