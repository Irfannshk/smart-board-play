import { motion } from "framer-motion";
import { User } from "lucide-react";
import { Card } from "@/components/ui/card";

interface PlayerCardProps {
  name: string;
  isActive: boolean;
  color: "white" | "black";
  timeRemaining: number;
  onNameChange?: (name: string) => void;
}

const PlayerCard = ({ name, isActive, color, timeRemaining, onNameChange }: PlayerCardProps) => {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  
  return (
    <motion.div
      animate={{ 
        scale: isActive ? 1.02 : 1,
        borderColor: isActive ? "hsl(var(--primary))" : "hsl(var(--border))"
      }}
      transition={{ duration: 0.2 }}
    >
      <Card className={`p-4 flex items-center gap-4 ${isActive ? 'border-primary border-2' : ''}`}>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
          color === 'white' ? 'bg-secondary text-secondary-foreground' : 'bg-primary text-primary-foreground'
        }`}>
          <User className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <input
            type="text"
            value={name}
            onChange={(e) => onNameChange?.(e.target.value)}
            className="font-semibold text-foreground bg-transparent border-none outline-none w-full"
            placeholder={`${color === 'white' ? 'White' : 'Black'} Player`}
          />
          <div className="text-sm text-muted-foreground capitalize">{color}</div>
        </div>
        <div className={`text-2xl font-mono font-bold ${timeRemaining < 60 ? 'text-destructive' : 'text-foreground'}`}>
          {minutes}:{seconds.toString().padStart(2, '0')}
        </div>
      </Card>
    </motion.div>
  );
};

export default PlayerCard;
