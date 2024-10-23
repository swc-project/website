import Link from "next/link";

const members = [
  {
    name: "kdy1 / Donny",
    link: "https://github.com/kdy1",
    github: "kdy1",
    role: "Lead Maintainer",
  },
  {
    name: "OJ Kwon",
    link: "https://github.com/kwonoj",
    github: "kwonoj",
    role: "Core Team",
  },
  {
    name: "magic-akari",
    link: "https://github.com/magic-akari",
    github: "magic-akari",
    role: "Core Team",
  },
  {
    name: "Austaras",
    link: "https://github.com/Austaras",
    github: "Austaras",
    role: "Core Team",
  },
  {
    name: "CPunisher",
    link: "https://github.com/CPunisher",
    github: "CPunisher",
    role: "Core Team",
  },
  {
    name: "LongYinan",
    link: "https://github.com/Brooooooklyn",
    github: "Brooooooklyn",
    role: "Maintainer of @swc-node/*",
  },
];

export default function TeamMembers() {
  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      {members.map((member, index) => {
        return (
          <Link href={`https://github.com/${member.github}`} key={index}>
            <div className="flex flex-col items-center">
              <img
                src={`https://github.com/${member.github}.png`}
                alt={`${member.name} avatar`}
                className="w-16 h-16 rounded-full"
                width={64}
                height={64}
              />
              <div className="font-bold text-center">{member.name}</div>
              <div>{member.role}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
