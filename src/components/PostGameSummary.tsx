import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy, TrendingUp, Target, Clock } from "lucide-react";

interface PostGameSummaryProps {
  isOpen: boolean;
  onClose: () => void;
  winner: "white" | "black" | "draw";
  totalMoves: number;
  gameTime: number;
  accuracy?: number;
}

const PostGameSummary = ({ isOpen, onClose, winner, totalMoves, gameTime, accuracy = 85 }: PostGameSummaryProps) => {
  const minutes = Math.floor(gameTime / 60);
  const seconds = gameTime % 60;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center flex items-center justify-center gap-2">
            <Trophy className="w-6 h-6 text-primary" />
            Game Complete!
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <div className="text-4xl font-bold text-primary mb-2">
              {winner === "draw" ? "Draw!" : `${winner === "white" ? "White" : "Black"} Wins!`}
            </div>
          </motion.div>
          
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card p-4 rounded-lg border border-border"
            >
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Accuracy</span>
              </div>
              <div className="text-2xl font-bold text-foreground">{accuracy}%</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card p-4 rounded-lg border border-border"
            >
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Total Moves</span>
              </div>
              <div className="text-2xl font-bold text-foreground">{totalMoves}</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card p-4 rounded-lg border border-border col-span-2"
            >
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Game Duration</span>
              </div>
              <div className="text-2xl font-bold text-foreground">
                {minutes}m {seconds}s
              </div>
            </motion.div>
          </div>
          
          <Button onClick={onClose} className="w-full" size="lg">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostGameSummary;
