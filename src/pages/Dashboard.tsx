import { motion } from "framer-motion";
import DashboardCard from "@/components/DashboardCard";
import { FaChessKing, FaBrain, FaUsb } from "react-icons/fa";
import Header from "@/components/Header";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container pt-24 pb-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-foreground">Play. Analyze. Learn.</h2>
          <p className="text-xl text-muted-foreground">
            Experience chess like never before with AI-powered analysis
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <DashboardCard
            icon={<FaChessKing />}
            title="Start a New Game"
            buttonText="Play Now"
            to="/play"
            delay={0.1}
          />
          <DashboardCard
            icon={<FaBrain />}
            title="Analyze Your Moves"
            buttonText="Go to Analysis"
            to="/analysis"
            delay={0.2}
          />
          <DashboardCard
            icon={<FaUsb />}
            title="Link Your Chessboard"
            buttonText="Connect"
            to="/connect"
            delay={0.3}
          />
        </div>
        
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-24 text-sm text-muted-foreground"
        >
          Powered by MERN & Modern Web Technologies
        </motion.footer>
      </main>
    </div>
  );
};

export default Dashboard;
