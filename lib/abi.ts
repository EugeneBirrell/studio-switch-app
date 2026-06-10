export const studioSwitchAbi = [
  {
    type: "function",
    name: "userCues",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "userRolls",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "userMutes",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "totalCues",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "totalRolls",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "totalMutes",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "cueLight",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },
  {
    type: "function",
    name: "rollTape",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },
  {
    type: "function",
    name: "muteTrack",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },
  {
    type: "event",
    name: "LightCued",
    inputs: [
      { name: "user", type: "address", indexed: true },
      { name: "userCues", type: "uint256", indexed: false },
      { name: "totalCues", type: "uint256", indexed: false },
    ],
  },
  {
    type: "event",
    name: "TapeRolled",
    inputs: [
      { name: "user", type: "address", indexed: true },
      { name: "userRolls", type: "uint256", indexed: false },
      { name: "totalRolls", type: "uint256", indexed: false },
    ],
  },
  {
    type: "event",
    name: "TrackMuted",
    inputs: [
      { name: "user", type: "address", indexed: true },
      { name: "userMutes", type: "uint256", indexed: false },
      { name: "totalMutes", type: "uint256", indexed: false },
    ],
  },
] as const;

