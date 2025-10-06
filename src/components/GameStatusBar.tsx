import { Chess } from "chess.js";
import { motion } from "framer-motion";
import { Crown, AlertCircle } from "lucide-react";

interface GameStatusBarProps {
  game: Chess;
}

const GameStatusBar = ({ game }: GameStatusBarProps) => {
  const isCheck = game.isCheck();
  const isCheckmate = game.isCheckmate();
  const isDraw = game.isDraw();
  const turn = game.turn() === 'w' ? 'White' : 'Black';
  
  let statusText = `${turn} to Move`;
  let statusColor = "text-muted-foreground";
  
  if (isCheckmate) {
    statusText = `Checkmate! ${turn === 'White' ? 'Black' : 'White'} Wins!`;
    statusColor = "text-primary";
  } else if (isDraw) {
    statusText = "Draw - Game Over";
    statusColor = "text-accent";
  } else if (isCheck) {
    statusText = `${turn} in Check!`;
    statusColor = "text-destructive";
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center gap-3 p-4 bg-card rounded-lg border border-border mb-4"
    >
      {(isCheckmate || isCheck) && (
        <AlertCircle className={`w-5 h-5 ${statusColor}`} />
      )}
      {isCheckmate && <Crown className="w-5 h-5 text-primary" />}
      <span className={`text-lg font-semibold ${statusColor}`}>
        {statusText}
      </span>
    </motion.div>
  );
};

export default GameStatusBar;
