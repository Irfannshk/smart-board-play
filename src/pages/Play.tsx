import { useState, useCallback } from "react";
import { Chess, Square } from "chess.js";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import GameControls from "@/components/GameControls";
import MoveHistory from "@/components/MoveHistory";
import ChessBoard from "@/components/ChessBoard";
import { toast } from "react-hot-toast";

const Play = () => {
  const [game, setGame] = useState(new Chess());
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [gameMode, setGameMode] = useState<"ai" | "human">("ai");
  const [aiDifficulty, setAiDifficulty] = useState(5);
  
  const handleSquareClick = useCallback((square: Square) => {
    if (!selectedSquare) {
      // First click - select a piece
      const piece = game.get(square);
      if (piece) {
        setSelectedSquare(square);
      }
    } else {
      // Second click - try to move
      try {
        const gameCopy = new Chess(game.fen());
        const move = gameCopy.move({
          from: selectedSquare,
          to: square,
          promotion: "q",
        });
        
        if (move === null) {
          // If move is invalid, maybe selecting a new piece
          const piece = game.get(square);
          if (piece) {
            setSelectedSquare(square);
          } else {
            setSelectedSquare(null);
            toast.error("Invalid move!", {
              duration: 2000,
              position: "top-center",
            });
          }
          return;
        }
        
        setGame(gameCopy);
        setMoveHistory([...moveHistory, `${move.color === 'w' ? 'White' : 'Black'}: ${move.san}`]);
        setSelectedSquare(null);
        
        // Check for game over
        if (gameCopy.isCheckmate()) {
          toast.success(`Checkmate! ${move.color === 'w' ? 'White' : 'Black'} wins!`, {
            duration: 5000,
          });
        } else if (gameCopy.isDraw()) {
          toast("Game ended in a draw", {
            duration: 5000,
          });
        } else if (gameCopy.isCheck()) {
          toast("Check!", {
            duration: 2000,
          });
        }
      } catch (error) {
        setSelectedSquare(null);
        toast.error("Invalid move!", {
          duration: 2000,
          position: "top-center",
        });
      }
    }
  }, [game, moveHistory, selectedSquare]);
  
  const resetGame = () => {
    setGame(new Chess());
    setMoveHistory([]);
    setSelectedSquare(null);
    toast.success("Game reset!", {
      duration: 2000,
    });
  };

  const handleDifficultyChange = (level: number) => {
    if (moveHistory.length > 0) {
      if (window.confirm("Change AI Difficulty? This will reset the current game.")) {
        setAiDifficulty(level);
        resetGame();
      }
    } else {
      setAiDifficulty(level);
    }
  };

  const handleModeChange = (mode: "ai" | "human") => {
    if (moveHistory.length > 0) {
      if (window.confirm("Change game mode? This will reset the current game.")) {
        setGameMode(mode);
        resetGame();
      }
    } else {
      setGameMode(mode);
    }
  };
  
  const undoMove = () => {
    const gameCopy = new Chess(game.fen());
    gameCopy.undo();
    setGame(gameCopy);
    setMoveHistory(moveHistory.slice(0, -1));
    setSelectedSquare(null);
    toast.success("Move undone", {
      duration: 2000,
    });
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container pt-20 pb-12 px-6">
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          {/* Chess Board */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex items-center justify-center"
          >
            <div className="chess-board-wrapper max-w-[640px] w-full">
              <ChessBoard
                position={game.fen()}
                onSquareClick={handleSquareClick}
              />
            </div>
          </motion.div>
          
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-96 flex flex-col gap-6"
          >
            <GameControls
              onReset={resetGame}
              onUndo={undoMove}
              canUndo={moveHistory.length > 0}
              gameMode={gameMode}
              onModeChange={handleModeChange}
              aiDifficulty={aiDifficulty}
              onDifficultyChange={handleDifficultyChange}
            />
            
            <MoveHistory moves={moveHistory} />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Play;
