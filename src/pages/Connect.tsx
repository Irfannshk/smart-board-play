import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaUsb, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { toast } from "react-hot-toast";

const Connect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  
  const handleConnect = () => {
    setIsConnecting(true);
    
    // Simulate connection
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
      toast.success("Successfully connected to chessboard!", {
        duration: 3000,
      });
    }, 2000);
  };
  
  const handleDisconnect = () => {
    setIsConnected(false);
    toast.success("Disconnected from chessboard", {
      duration: 2000,
    });
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container pt-24 pb-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h2 className="text-3xl font-bold mb-4 text-foreground">Device Connection</h2>
          <p className="text-muted-foreground">
            Connect your physical chessboard via USB
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="p-12 bg-card text-center">
            {/* Connection Icon */}
            <motion.div
              animate={isConnecting ? { rotate: 360 } : {}}
              transition={{ duration: 1, repeat: isConnecting ? Infinity : 0 }}
              className="mx-auto mb-8"
            >
              <FaUsb className={`text-8xl mx-auto ${
                isConnected ? "text-success" : "text-muted-foreground"
              }`} />
            </motion.div>
            
            {/* Status */}
            <div className="mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                {isConnected ? (
                  <>
                    <FaCheckCircle className="text-2xl text-success" />
                    <h3 className="text-2xl font-semibold text-foreground">
                      Connected
                    </h3>
                  </>
                ) : (
                  <>
                    <FaTimesCircle className="text-2xl text-muted-foreground" />
                    <h3 className="text-2xl font-semibold text-foreground">
                      Not Connected
                    </h3>
                  </>
                )}
              </div>
              
              <p className="text-muted-foreground">
                {isConnected 
                  ? "Your Arduino-powered chessboard is ready" 
                  : "Connect your chessboard to enable hardware features"}
              </p>
            </div>
            
            {/* Connection Details */}
            {isConnected && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-background rounded-lg p-6 mb-8 text-left"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Port</p>
                    <p className="font-mono text-sm text-foreground">COM3 (Simulated)</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Status</p>
                    <p className="font-mono text-sm text-success">Active</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Device</p>
                    <p className="font-mono text-sm text-foreground">Arduino Uno</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Baud Rate</p>
                    <p className="font-mono text-sm text-foreground">9600</p>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Action Button */}
            {isConnected ? (
              <Button 
                onClick={handleDisconnect}
                variant="destructive"
                size="lg"
                className="btn-animate"
              >
                Disconnect Device
              </Button>
            ) : (
              <Button 
                onClick={handleConnect}
                disabled={isConnecting}
                size="lg"
                className="btn-animate"
              >
                {isConnecting ? "Connecting..." : "Connect Device"}
              </Button>
            )}
            
            {/* Info */}
            <div className="mt-12 p-6 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Note:</strong> Physical device connection 
                requires node-serialport backend integration. This is a simulated connection 
                for demonstration purposes.
              </p>
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default Connect;
