import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface EvaluationBarProps {
  evaluation: number; // Positive favors white, negative favors black
}

const EvaluationBar = ({ evaluation }: EvaluationBarProps) => {
  // Clamp evaluation between -10 and 10 for display
  const clampedEval = Math.max(-10, Math.min(10, evaluation));
  // Convert to percentage (0-100, where 50 is equal)
  const whiteAdvantage = ((clampedEval + 10) / 20) * 100;
  
  const getEvalText = () => {
    if (Math.abs(evaluation) > 5) return Math.abs(evaluation) > 20 ? "Winning" : "Advantage";
    if (Math.abs(evaluation) > 2) return "Better";
    return "Equal";
  };
  
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-muted-foreground">Position Evaluation</span>
        <span className={`text-sm font-bold ${evaluation > 0 ? 'text-foreground' : evaluation < 0 ? 'text-primary' : 'text-muted-foreground'}`}>
          {evaluation > 0 ? `+${evaluation.toFixed(1)}` : evaluation.toFixed(1)}
        </span>
      </div>
      <div className="relative h-6 bg-secondary rounded-full overflow-hidden border border-border">
        <motion.div
          className="absolute top-0 left-0 h-full bg-foreground"
          initial={{ width: "50%" }}
          animate={{ width: `${whiteAdvantage}%` }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className="absolute top-0 right-0 h-full bg-primary"
          initial={{ width: "50%" }}
          animate={{ width: `${100 - whiteAdvantage}%` }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-background mix-blend-difference">
            {getEvalText()}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default EvaluationBar;
