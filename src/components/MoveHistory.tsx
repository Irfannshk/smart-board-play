import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MoveHistoryProps {
  moves: string[];
}

const MoveHistory = ({ moves }: MoveHistoryProps) => {
  return (
    <Card className="p-6 bg-card flex-1">
      <h3 className="text-xl font-semibold mb-4 text-foreground">Move History</h3>
      
      <ScrollArea className="h-[400px] w-full rounded-md border border-border p-4">
        {moves.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No moves yet. Start playing!
          </p>
        ) : (
          <ul className="space-y-2">
            {moves.map((move, index) => (
              <li 
                key={index}
                className="text-sm font-mono p-2 hover:bg-primary/10 rounded transition-colors"
              >
                <span className="text-primary font-semibold">
                  {Math.floor(index / 2) + 1}.
                </span>{" "}
                {move}
              </li>
            ))}
          </ul>
        )}
      </ScrollArea>
    </Card>
  );
};

export default MoveHistory;
