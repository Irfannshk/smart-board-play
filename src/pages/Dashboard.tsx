import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardCard from "@/components/DashboardCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaChessKing, FaBrain, FaUsb } from "react-icons/fa";
import Header from "@/components/Header";

const Dashboard = () => {
  const navigate = useNavigate();
  const [quickDifficulty, setQuickDifficulty] = useState(5);

  const handleQuickStart = (difficulty: number) => {
    setQuickDifficulty(difficulty);
    navigate("/play");
  };

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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-12 max-w-4xl mx-auto"
        >
          <Card className="p-8 bg-card">
            <h3 className="text-2xl font-semibold mb-6 text-center text-foreground">Quick Start</h3>
            <p className="text-center text-muted-foreground mb-6">
              Choose your AI difficulty and jump right into a game
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                onClick={() => handleQuickStart(2)}
                variant="secondary"
                className="btn-animate"
                size="lg"
              >
                Easy (~1000 Elo)
              </Button>
              <Button
                onClick={() => handleQuickStart(5)}
                className="btn-animate bg-primary hover:bg-primary/90"
                size="lg"
              >
                Medium (~1600 Elo)
              </Button>
              <Button
                onClick={() => handleQuickStart(8)}
                variant="secondary"
                className="btn-animate"
                size="lg"
              >
                Hard (~2200 Elo)
              </Button>
            </div>
          </Card>
        </motion.div>
        
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
