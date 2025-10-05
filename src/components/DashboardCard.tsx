import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface DashboardCardProps {
  icon: ReactNode;
  title: string;
  buttonText: string;
  to: string;
  delay?: number;
}

const DashboardCard = ({ icon, title, buttonText, to, delay = 0 }: DashboardCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      className="card-hover"
    >
      <Link to={to}>
        <Card className="p-8 flex flex-col items-center gap-6 h-64 justify-between bg-card hover:bg-card/80 transition-colors cursor-pointer">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.2 }}
            transition={{ duration: 0.5 }}
            className="text-primary text-6xl"
          >
            {icon}
          </motion.div>
          <h3 className="text-xl font-semibold text-center text-foreground">{title}</h3>
          <Button className="w-full btn-animate" size="lg">
            {buttonText}
          </Button>
        </Card>
      </Link>
    </motion.div>
  );
};

export default DashboardCard;
