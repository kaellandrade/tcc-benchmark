export function UfoAbduction() {
  return (
    <svg
      viewBox="0 0 300 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[300px] h-auto"
    >
      {/* UFO Dome */}
      <ellipse cx="120" cy="80" rx="50" ry="40" fill="#15F5B9" />

      {/* UFO Body */}
      <ellipse cx="120" cy="95" rx="85" ry="25" fill="#211952" stroke="#15F5B9" strokeWidth="2" />
      <ellipse cx="120" cy="90" rx="70" ry="18" fill="#2a2163" />

      {/* UFO Lights */}
      <circle cx="70" cy="95" r="5" fill="#15F5B9" opacity="0.8" />
      <circle cx="95" cy="100" r="5" fill="#15F5B9" opacity="0.8" />
      <circle cx="120" cy="102" r="5" fill="#15F5B9" opacity="0.8" />
      <circle cx="145" cy="100" r="5" fill="#15F5B9" opacity="0.8" />
      <circle cx="170" cy="95" r="5" fill="#15F5B9" opacity="0.8" />

      {/* Tractor Beam */}
      <path
        d="M95 110 L75 240 L165 240 L145 110"
        fill="url(#beamGradient)"
        opacity="0.3"
      />

      {/* Beam Lines */}
      <line x1="100" y1="115" x2="95" y2="180" stroke="#15F5B9" strokeWidth="1" opacity="0.5" />
      <line x1="110" y1="115" x2="108" y2="200" stroke="#15F5B9" strokeWidth="1" opacity="0.5" />
      <line x1="120" y1="115" x2="120" y2="210" stroke="#15F5B9" strokeWidth="1" opacity="0.5" />
      <line x1="130" y1="115" x2="132" y2="195" stroke="#15F5B9" strokeWidth="1" opacity="0.5" />
      <line x1="140" y1="115" x2="145" y2="185" stroke="#15F5B9" strokeWidth="1" opacity="0.5" />

      {/* Abducted Alien */}
      <g transform="translate(105, 160)">
        {/* Body */}
        <ellipse cx="15" cy="25" rx="12" ry="15" fill="#826FFF" />
        {/* Head */}
        <circle cx="15" cy="5" r="12" fill="#15F5B9" />
        {/* Eyes */}
        <circle cx="11" cy="5" r="3" fill="#211952" />
        <circle cx="19" cy="5" r="3" fill="#211952" />
        {/* Arms up */}
        <line x1="5" y1="18" x2="-2" y2="8" stroke="#826FFF" strokeWidth="4" strokeLinecap="round" />
        <line x1="25" y1="18" x2="32" y2="8" stroke="#826FFF" strokeWidth="4" strokeLinecap="round" />
        {/* Legs */}
        <line x1="10" y1="38" x2="8" y2="50" stroke="#826FFF" strokeWidth="4" strokeLinecap="round" />
        <line x1="20" y1="38" x2="22" y2="50" stroke="#826FFF" strokeWidth="4" strokeLinecap="round" />
      </g>

      {/* Running Alien */}
      <g transform="translate(210, 210)">
        {/* Shadow */}
        <ellipse cx="20" cy="55" rx="20" ry="5" fill="#15F5B9" opacity="0.3" />
        {/* Body */}
        <ellipse cx="20" cy="30" rx="14" ry="18" fill="#826FFF" />
        {/* Head */}
        <circle cx="20" cy="8" r="14" fill="#15F5B9" />
        {/* Eyes */}
        <circle cx="15" cy="8" r="3.5" fill="#211952" />
        <circle cx="25" cy="8" r="3.5" fill="#211952" />
        {/* Arms running */}
        <line x1="8" y1="25" x2="-5" y2="35" stroke="#826FFF" strokeWidth="5" strokeLinecap="round" />
        <line x1="32" y1="25" x2="45" y2="20" stroke="#826FFF" strokeWidth="5" strokeLinecap="round" />
        {/* Legs running */}
        <line x1="12" y1="45" x2="0" y2="55" stroke="#826FFF" strokeWidth="5" strokeLinecap="round" />
        <line x1="28" y1="45" x2="40" y2="50" stroke="#826FFF" strokeWidth="5" strokeLinecap="round" />
      </g>

      {/* Gradient definitions */}
      <defs>
        <linearGradient id="beamGradient" x1="120" y1="110" x2="120" y2="240" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#15F5B9" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#15F5B9" stopOpacity="0.1" />
        </linearGradient>
      </defs>
    </svg>
  );
}
