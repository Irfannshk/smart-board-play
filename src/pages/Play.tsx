import { useState, useCallback, useEffect } from "react";
import { Chess, Square } from "chess.js";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import GameControls from "@/components/GameControls";
import MoveHistory from "@/components/MoveHistory";
import ChessBoard from "@/components/ChessBoard";
import GameStatusBar from "@/components/GameStatusBar";
import PlayerCard from "@/components/PlayerCard";
import EvaluationBar from "@/components/EvaluationBar";
import PostGameSummary from "@/components/PostGameSummary";
import OnboardingModal from "@/components/OnboardingModal";
import { toast } from "react-hot-toast";
import { playMoveSound, playCaptureSound, playCheckSound, playGameOverSound } from "@/utils/sounds";

const Play = () => {
  const [game, setGame] = useState(new Chess());
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [gameMode, setGameMode] = useState<"ai" | "human">("ai");
  const [aiDifficulty, setAiDifficulty] = useState(5);
  const [whiteName, setWhiteName] = useState("White Player");
  const [blackName, setBlackName] = useState("Black Player");
  const [whiteTime, setWhiteTime] = useState(600); // 10 minutes in seconds
  const [blackTime, setBlackTime] = useState(600);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [evaluation, setEvaluation] = useState(0);
  const [showPostGame, setShowPostGame] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [gameStartTime, setGameStartTime] = useState<number>(Date.now());
  
  // Timer effect
  useEffect(() => {
    if (!isTimerActive || game.isGameOver()) return;
    
    const interval = setInterval(() => {
      if (game.turn() === 'w') {
        setWhiteTime(prev => Math.max(0, prev - 1));
      } else {
        setBlackTime(prev => Math.max(0, prev - 1));
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isTimerActive, game]);
  
  // Mock evaluation update
  useEffect(() => {
    // Simple mock evaluation based on material count
    const pieces = game.board().flat();
    let score = 0;
    pieces.forEach(piece => {
      if (piece) {
        const value = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 }[piece.type] || 0;
        score += piece.color === 'w' ? value : -value;
      }
    });
    setEvaluation(score);
  }, [game]);
  
  const handleSquareClick = useCallback((square: Square) => {
    if (!selectedSquare) {
      // First click - select a piece
      const piece = game.get(square);
      if (piece && piece.color === game.turn()) {
        setSelectedSquare(square);
      }
    } else {
      // Second click - try to move
      try {
        const gameCopy = new Chess(game.fen());
        const capturedPiece = gameCopy.get(square);
        const move = gameCopy.move({
          from: selectedSquare,
          to: square,
          promotion: "q",
        });
        
        if (move === null) {
          // If move is invalid, maybe selecting a new piece
          const piece = game.get(square);
          if (piece && piece.color === game.turn()) {
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
        
        // Start timer on first move
        if (moveHistory.length === 0) {
          setIsTimerActive(true);
          setGameStartTime(Date.now());
        }
        
        // Play sound effects
        if (capturedPiece) {
          playCaptureSound();
        } else {
          playMoveSound();
        }
        
        setGame(gameCopy);
        setMoveHistory([...moveHistory, `${move.color === 'w' ? 'White' : 'Black'}: ${move.san}`]);
        setSelectedSquare(null);
        
        // Check for game over
        if (gameCopy.isCheckmate()) {
          playGameOverSound();
          setIsTimerActive(false);
          setShowPostGame(true);
          toast.success(`Checkmate! ${move.color === 'w' ? 'White' : 'Black'} wins!`, {
            duration: 5000,
          });
        } else if (gameCopy.isDraw()) {
          playGameOverSound();
          setIsTimerActive(false);
          setShowPostGame(true);
          toast("Game ended in a draw", {
            duration: 5000,
          });
        } else if (gameCopy.isCheck()) {
          playCheckSound();
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
    setWhiteTime(600);
    setBlackTime(600);
    setIsTimerActive(false);
    setEvaluation(0);
    setShowPostGame(false);
    setGameStartTime(Date.now());
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
  
  const gameTime = Math.floor((Date.now() - gameStartTime) / 1000);
  const winner = game.isCheckmate() 
    ? (game.turn() === 'w' ? 'black' : 'white')
    : 'draw';
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <OnboardingModal 
        isOpen={showOnboarding} 
        onClose={() => setShowOnboarding(false)} 
      />
      
      <PostGameSummary
        isOpen={showPostGame}
        onClose={() => setShowPostGame(false)}
        winner={winner}
        totalMoves={Math.ceil(moveHistory.length / 2)}
        gameTime={gameTime}
      />
      
      <main className="container pt-20 pb-12 px-6">
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          {/* Left Column - Players & Board */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex flex-col gap-4"
          >
            <PlayerCard
              name={blackName}
              isActive={game.turn() === 'b' && isTimerActive}
              color="black"
              timeRemaining={blackTime}
              onNameChange={setBlackName}
            />
            
            <GameStatusBar game={game} />
            
            <div className="chess-board-wrapper max-w-[640px] w-full mx-auto">
              <ChessBoard
                position={game.fen()}
                onSquareClick={handleSquareClick}
              />
            </div>
            
            <PlayerCard
              name={whiteName}
              isActive={game.turn() === 'w' && isTimerActive}
              color="white"
              timeRemaining={whiteTime}
              onNameChange={setWhiteName}
            />
          </motion.div>
          
          {/* Right Sidebar */}
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
            
            <EvaluationBar evaluation={evaluation} />
            
            <MoveHistory moves={moveHistory} />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Play;
