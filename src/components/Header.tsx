import { Link, useLocation } from "react-router-dom";
import { FaChessBoard } from "react-icons/fa";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 h-16 bg-card border-b border-border"
    >
      <div className="container h-full flex items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3 group">
          <FaChessBoard className="text-3xl text-primary transition-transform group-hover:rotate-12" />
          <h1 className="text-2xl font-bold text-foreground">SmartChessBoard</h1>
        </Link>
        
        <nav className="flex items-center gap-4">
          <Link to="/play">
            <Button 
              variant={isActive("/play") ? "default" : "outline"}
              className="btn-animate"
            >
              Play Game
            </Button>
          </Link>
          <Link to="/analysis">
            <Button 
              variant={isActive("/analysis") ? "default" : "outline"}
              className="btn-animate"
            >
              AI Analysis
            </Button>
          </Link>
          <Link to="/connect">
            <Button 
              variant={isActive("/connect") ? "default" : "outline"}
              className="btn-animate"
            >
              Connect Device
            </Button>
          </Link>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
