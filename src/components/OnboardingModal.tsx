import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = [
  {
    title: "Welcome to SmartChessBoard!",
    description: "Play, analyze, and improve your chess game with AI-powered insights.",
    icon: "♟️"
  },
  {
    title: "Play Against AI",
    description: "Choose from 10 difficulty levels, from beginner (800 Elo) to grandmaster (3200 Elo).",
    icon: "🤖"
  },
  {
    title: "Track Your Progress",
    description: "View move history, position evaluation, and post-game analysis to improve your skills.",
    icon: "📊"
  },
  {
    title: "Connect Physical Board",
    description: "Link your Arduino-powered chessboard for a hybrid digital-physical experience.",
    icon: "🔌"
  }
];

const OnboardingModal = ({ isOpen, onClose }: OnboardingModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };
  
  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center">Getting Started</DialogTitle>
        </DialogHeader>
        
        <div className="py-6 min-h-[300px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center space-y-4"
            >
              <div className="text-6xl mb-4">{steps[currentStep].icon}</div>
              <h3 className="text-2xl font-bold text-foreground">{steps[currentStep].title}</h3>
              <p className="text-muted-foreground text-lg">{steps[currentStep].description}</p>
            </motion.div>
          </AnimatePresence>
          
          <div className="space-y-4 mt-8">
            <div className="flex justify-center gap-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === currentStep ? 'w-8 bg-primary' : 'w-2 bg-muted'
                  }`}
                />
              ))}
            </div>
            
            <div className="flex justify-between gap-4">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="flex-1"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <Button
                onClick={handleNext}
                className="flex-1"
              >
                {currentStep === steps.length - 1 ? "Get Started" : "Next"}
                {currentStep < steps.length - 1 && <ChevronRight className="w-4 h-4 ml-2" />}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
