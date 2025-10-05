import { useState } from "react";
import { Square } from "chess.js";

interface ChessBoardProps {
  position: string;
  onSquareClick: (square: Square) => void;
}

const ChessBoard = ({ position, onSquareClick }: ChessBoardProps) => {
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  
  // Parse FEN to get piece positions
  const parseFEN = (fen: string) => {
    const board: (string | null)[][] = Array(8).fill(null).map(() => Array(8).fill(null));
    const rows = fen.split(" ")[0].split("/");
    
    rows.forEach((row, rowIndex) => {
      let colIndex = 0;
      for (const char of row) {
        if (isNaN(parseInt(char))) {
          board[rowIndex][colIndex] = char;
          colIndex++;
        } else {
          colIndex += parseInt(char);
        }
      }
    });
    
    return board;
  };
  
  const board = parseFEN(position);
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
  
  // Unicode chess pieces
  const pieceUnicode: { [key: string]: string } = {
    'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙',
    'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟',
  };
  
  const handleSquareClick = (rowIndex: number, colIndex: number) => {
    const square = `${files[colIndex]}${ranks[rowIndex]}` as Square;
    
    if (selectedSquare) {
      onSquareClick(square);
      setSelectedSquare(null);
    } else {
      setSelectedSquare(square);
      onSquareClick(square);
    }
  };
  
  return (
    <div className="inline-block rounded-lg overflow-hidden shadow-lg">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((piece, colIndex) => {
            const isLight = (rowIndex + colIndex) % 2 === 0;
            const square = `${files[colIndex]}${ranks[rowIndex]}` as Square;
            const isSelected = selectedSquare === square;
            
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleSquareClick(rowIndex, colIndex)}
                className={`
                  w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center cursor-pointer
                  transition-all duration-200 hover:opacity-80
                  ${isLight ? 'bg-board-light' : 'bg-board-dark'}
                  ${isSelected ? 'ring-4 ring-primary ring-inset' : ''}
                `}
              >
                {piece && (
                  <span className={`text-4xl sm:text-5xl select-none ${
                    piece === piece.toUpperCase() ? 'text-white' : 'text-black'
                  }`}>
                    {pieceUnicode[piece]}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default ChessBoard;
