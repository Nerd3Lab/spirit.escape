import { createRef } from "react";
import Index from "./pages/Index";
import Play from "@/pages/Play";
import Staking from "@/pages/Staking";
import Leaderboard from "@/pages/Leaderboard";
import Referral from "@/pages/Referral";
import FairnessCheck from "@/pages/FairnessCheck";
import NotFound from "@/pages/NotFound";

export const routes = [
  {
    path: "/",
    element: <Index />,
    nodeRef: createRef(),
    name: "Home",
  },
  {
    path: "/play",
    element: <Play />,
    nodeRef: createRef(),
    name: "Play",
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
