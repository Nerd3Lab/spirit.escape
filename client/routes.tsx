import { createRef } from "react";
import Index from "./pages/Index";
import Mining from "@/pages/Mining";
import Death from "@/pages/Death";
import Staking from "@/pages/Staking";
import Leaderboard from "@/pages/Leaderboard";
import Referral from "@/pages/Referral";
import FairnessCheck from "@/pages/FairnessCheck";
import NotFound from "@/pages/NotFound";
import Climbing from "@/pages/Climbing";

export const routes = [
  {
    path: "/",
    element: <Index />,
    nodeRef: createRef(),
    name: "Home",
  },
  {
    path: "/mining",
    element: <Mining />,
    nodeRef: createRef(),
    name: "Mining",
  },
  {
    path: "/climbing",
    element: <Climbing />,
    nodeRef: createRef(),
    name: "Climbing",
  },
  {
    path: "/staking",
    element: <Staking />,
    nodeRef: createRef(),
    name: "Staking",
  },
  {
    path: "/leaderboard",
    element: <Leaderboard />,
    nodeRef: createRef(),
    name: "Leaderboard",
  },
  {
    path: "/referral",
    element: <Referral />,
    nodeRef: createRef(),
    name: "Referral",
  },
  {
    path: "/fairness",
    element: <FairnessCheck />,
    nodeRef: createRef(),
    name: "Fairness",
  },
  {
    path: "*",
    element: <NotFound />,
    nodeRef: createRef(),
    name: "NotFound",
  },
];
