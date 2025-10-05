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
          className="mt-12"
        >
          <h3 className="text-2xl font-semibold mb-6 text-center text-foreground">Quick Start - Play Against AI</h3>
          <p className="text-center text-muted-foreground mb-8">
            Choose your opponent
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Easy Bot */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="p-6 bg-card hover:bg-card/80 transition-colors cursor-pointer" onClick={() => handleQuickStart(2)}>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-4xl">
                    🌱
                  </div>
                  <div className="text-center">
                    <h4 className="text-xl font-bold text-foreground mb-1">Rookie Bot</h4>
                    <p className="text-sm text-primary font-semibold mb-2">1000 Elo</p>
                    <p className="text-xs text-muted-foreground">Perfect for beginners learning the basics</p>
                  </div>
                  <Button className="w-full btn-animate" size="lg">
                    Play Easy
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Medium Bot */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="p-6 bg-card hover:bg-card/80 transition-colors cursor-pointer border-2 border-primary" onClick={() => handleQuickStart(5)}>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-4xl">
                    ⚔️
                  </div>
                  <div className="text-center">
                    <h4 className="text-xl font-bold text-foreground mb-1">Tactical Bot</h4>
                    <p className="text-sm text-primary font-semibold mb-2">1600 Elo</p>
                    <p className="text-xs text-muted-foreground">Balanced play with tactical awareness</p>
                  </div>
                  <Button className="w-full btn-animate bg-primary hover:bg-primary/90" size="lg">
                    Play Medium
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Hard Bot */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="p-6 bg-card hover:bg-card/80 transition-colors cursor-pointer" onClick={() => handleQuickStart(8)}>
                <div className="flex flex-col items-center gap-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-4xl">
                    👑
                  </div>
                  <div className="text-center">
                    <h4 className="text-xl font-bold text-foreground mb-1">Master Bot</h4>
                    <p className="text-sm text-primary font-semibold mb-2">2200 Elo</p>
                    <p className="text-xs text-muted-foreground">Advanced play for experienced players</p>
                  </div>
                  <Button className="w-full btn-animate" size="lg">
                    Play Hard
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
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
