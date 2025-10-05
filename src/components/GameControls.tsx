import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { FaUndo, FaSync } from "react-icons/fa";

interface GameControlsProps {
  onReset: () => void;
  onUndo: () => void;
  canUndo: boolean;
  gameMode: "ai" | "human";
  onModeChange: (mode: "ai" | "human") => void;
  aiDifficulty: number;
  onDifficultyChange: (level: number) => void;
}

const difficultyLevels = [
  { level: 1, label: "Beginner", elo: "~800" },
  { level: 2, label: "Novice", elo: "~1000" },
  { level: 3, label: "Casual", elo: "~1200" },
  { level: 4, label: "Amateur", elo: "~1400" },
  { level: 5, label: "Intermediate", elo: "~1600" },
  { level: 6, label: "Advanced", elo: "~1800" },
  { level: 7, label: "Expert", elo: "~2000" },
  { level: 8, label: "Master", elo: "~2200" },
  { level: 9, label: "International Master", elo: "~2600" },
  { level: 10, label: "Grandmaster", elo: "~3200" },
];

const GameControls = ({ 
  onReset, 
  onUndo, 
  canUndo, 
  gameMode, 
  onModeChange, 
  aiDifficulty, 
  onDifficultyChange 
}: GameControlsProps) => {
  const currentLevel = difficultyLevels.find(d => d.level === aiDifficulty) || difficultyLevels[4];
  
  return (
    <Card className="p-6 bg-card">
      <h3 className="text-xl font-semibold mb-4 text-foreground">Game Controls</h3>
      
      <div className="flex flex-col gap-4 mb-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Game Mode</label>
          <Select value={gameMode} onValueChange={(value) => onModeChange(value as "ai" | "human")}>
            <SelectTrigger className="w-full bg-background border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border z-50">
              <SelectItem value="ai">Human vs AI</SelectItem>
              <SelectItem value="human">Human vs Human</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {gameMode === "ai" && (
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">AI Difficulty</label>
              <Select 
                value={aiDifficulty.toString()} 
                onValueChange={(value) => onDifficultyChange(parseInt(value))}
              >
                <SelectTrigger className="w-full bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border z-50 max-h-[300px]">
                  {difficultyLevels.map((level) => (
                    <SelectItem key={level.level} value={level.level.toString()}>
                      Level {level.level}: {level.label} ({level.elo} Elo)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="p-3 bg-background rounded-lg">
              <p className="text-xs text-muted-foreground">
                {aiDifficulty <= 3 && "AI will make occasional mistakes, perfect for learning!"}
                {aiDifficulty > 3 && aiDifficulty <= 6 && "Balanced play with some tactical depth."}
                {aiDifficulty > 6 && aiDifficulty <= 8 && "Strong tactical play, challenging for most players."}
                {aiDifficulty > 8 && "Expert level play with deep calculations."}
              </p>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex flex-col gap-3">
        <Button 
          onClick={onReset}
          variant="destructive"
          className="btn-animate w-full"
          size="lg"
        >
          <FaSync className="mr-2" />
          Reset Game
        </Button>
        
        <Button 
          onClick={onUndo}
          disabled={!canUndo}
          variant="secondary"
          className="btn-animate w-full"
          size="lg"
        >
          <FaUndo className="mr-2" />
          Undo Move
        </Button>
      </div>
      
      <div className="mt-4 p-4 bg-background rounded-lg">
        <p className="text-sm text-muted-foreground text-center">
          Click pieces to select, then click destination square
        </p>
      </div>
    </Card>
  );
};

export default GameControls;
