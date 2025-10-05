import { motion } from "framer-motion";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaChessBoard, FaSearch } from "react-icons/fa";

const Analysis = () => {
  // Placeholder data for demonstration
  const mockGames = [
    { id: 1, date: "Oct 5, 2025", result: "Win", opponent: "AI Level 3" },
    { id: 2, date: "Oct 4, 2025", result: "Loss", opponent: "Human Player" },
    { id: 3, date: "Oct 3, 2025", result: "Draw", opponent: "AI Level 5" },
  ];
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container pt-24 pb-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold mb-4 text-foreground">AI Analysis</h2>
          <p className="text-muted-foreground">Review your past games and improve your strategy</p>
        </motion.div>
        
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex gap-4"
        >
          <div className="relative flex-1 max-w-md">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search games..." 
              className="pl-10 bg-card border-border"
            />
          </div>
          <Button variant="outline">Filter</Button>
        </motion.div>
        
        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockGames.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 2) }}
              className="card-hover"
            >
              <Card className="p-6 bg-card">
                <div className="flex items-center gap-4 mb-4">
                  <FaChessBoard className="text-3xl text-primary" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">Game #{game.id}</h3>
                    <p className="text-sm text-muted-foreground">{game.date}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    game.result === "Win" 
                      ? "bg-success/20 text-success" 
                      : game.result === "Loss"
                      ? "bg-destructive/20 text-destructive"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {game.result}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">
                  vs {game.opponent}
                </p>
                
                <Button className="w-full btn-animate" variant="outline">
                  Analyze Game
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Empty State Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Card className="p-12 bg-card max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-2 text-foreground">
              Save Your Games for Analysis
            </h3>
            <p className="text-muted-foreground mb-6">
              Connect to Lovable Cloud to save and analyze your games with AI-powered insights
            </p>
            <Button className="btn-animate" size="lg">
              Enable Cloud Features
            </Button>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default Analysis;
