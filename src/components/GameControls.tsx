import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaUndo, FaSync } from "react-icons/fa";

interface GameControlsProps {
  onReset: () => void;
  onUndo: () => void;
  canUndo: boolean;
}

const GameControls = ({ onReset, onUndo, canUndo }: GameControlsProps) => {
  return (
    <Card className="p-6 bg-card">
      <h3 className="text-xl font-semibold mb-4 text-foreground">Game Controls</h3>
      
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
      
      <div className="mt-6 p-4 bg-background rounded-lg">
        <p className="text-sm text-muted-foreground text-center">
          Drag and drop pieces to make your move
        </p>
      </div>
    </Card>
  );
};

export default GameControls;
