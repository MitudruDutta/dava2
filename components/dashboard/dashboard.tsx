"use client";

// import { motion } from "framer-motion";
// import { useStore } from "@/lib/store";
// import { CoursesWidget } from "./widgets/courses-widget";
// import { TodaysPlanWidget } from "./widgets/todays-plan-widget";
// import { FocusShortcutWidget } from "./widgets/focus-shortcut-widget";
// import { StatsWidget } from "./widgets/stats-widget";
// Remove the NotificationsWidget import

export function Dashboard() {
  // const { courses, tasks, focusSessions } = useStore();

  // Animation variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div>
      Dashboard
    </div>
  );
}

