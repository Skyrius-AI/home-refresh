import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface TourContextType {
  isTourActive: boolean;
  startTour: () => void;
  endTour: () => void;
  currentStepIndex: number;
  setCurrentStepIndex: (index: number) => void;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

export const useTour = () => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error('useTour must be used within TourProvider');
  }
  return context;
};

interface TourProviderProps {
  children: ReactNode;
}

export const TourProvider: React.FC<TourProviderProps> = ({ children }) => {
  const [isTourActive, setIsTourActive] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user should see the tour (first-time user who just completed onboarding)
    const shouldShowTour = localStorage.getItem('skyrius-show-tour');
    const tourCompleted = localStorage.getItem('skyrius-tour-completed');
    
    // Start tour only for first-time users on the home page
    if (shouldShowTour === 'true' && !tourCompleted && location.pathname === '/') {
      // Small delay to ensure page is fully rendered
      const timer = setTimeout(() => {
        setIsTourActive(true);
        // Clear the flag so tour doesn't restart on refresh
        localStorage.removeItem('skyrius-show-tour');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  const startTour = () => {
    setCurrentStepIndex(0);
    setIsTourActive(true);
    // Navigate to home page to start the tour
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  const endTour = () => {
    setIsTourActive(false);
    setCurrentStepIndex(0);
    localStorage.setItem('skyrius-tour-completed', 'true');
  };

  return (
    <TourContext.Provider
      value={{
        isTourActive,
        startTour,
        endTour,
        currentStepIndex,
        setCurrentStepIndex,
      }}
    >
      {children}
    </TourContext.Provider>
  );
};
