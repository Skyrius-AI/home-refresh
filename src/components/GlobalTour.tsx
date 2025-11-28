import React, { useCallback } from 'react';
import Joyride, { CallBackProps, STATUS, ACTIONS, Step } from 'react-joyride';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTour } from '@/contexts/TourContext';

const tourSteps: Step[] = [
  // Page 1: Home
  {
    target: '[data-tour-id="sidebar-nav"]',
    content: 'Your hub for Library, Notes, and Profile.',
    title: 'Navigation',
    disableBeacon: true,
    placement: 'right',
  },
  {
    target: '[data-tour-id="weekly-summary"]',
    content: 'See your weekly progress.',
    title: 'Growth Tracker',
    placement: 'bottom',
  },
  {
    target: '[data-tour-id="knowledge-graph"]',
    content: 'Visualizes your connected mind.',
    title: 'The Nexus',
    placement: 'top',
  },
  {
    target: '[data-tour-id="idea-roulette"]',
    content: 'Spin for serendipitous connections.',
    title: 'Idea Roulette',
    placement: 'top',
  },
  // Page 2: Library
  {
    target: '[data-tour-id="add-source-btn"]',
    content: 'Add videos, papers, and pods.',
    title: 'Ingest',
    placement: 'bottom',
  },
  {
    target: '[data-tour-id="content-card-summary"]',
    content: 'Auto-generated summaries.',
    title: 'AI Insight',
    placement: 'top',
  },
  // Page 3: Notes
  {
    target: '[data-tour-id="editor-main"]',
    content: 'Type [[ to link notes.',
    title: 'The Workbench',
    placement: 'top',
  },
  {
    target: '[data-tour-id="ai-sidebar"]',
    content: 'RAG suggestions and local graph view.',
    title: 'AI Companion',
    placement: 'left',
  },
  // Page 4: Profile
  {
    target: '[data-tour-id="insight-tree"]',
    content: 'Your hierarchy of mastery.',
    title: 'Structure',
    placement: 'top',
  },
  {
    target: '[data-tour-id="social-header"]',
    content: 'Your public knowledge stats.',
    title: 'Portfolio',
    placement: 'bottom',
  },
];

export const GlobalTour: React.FC = () => {
  const { isTourActive, endTour, currentStepIndex, setCurrentStepIndex } = useTour();
  const navigate = useNavigate();
  const location = useLocation();

  const handleJoyrideCallback = useCallback(
    (data: CallBackProps) => {
      const { status, action, index, type } = data;

      if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
        endTour();
        return;
      }

      if (action === ACTIONS.CLOSE) {
        endTour();
        return;
      }

      // Handle navigation between pages
      if (type === 'step:after' || action === ACTIONS.NEXT) {
        const nextIndex = index + (action === ACTIONS.PREV ? -1 : 1);
        
        // Navigate to Library before step 4 (index 4)
        if (nextIndex === 4 && location.pathname !== '/library') {
          navigate('/library');
          setTimeout(() => setCurrentStepIndex(nextIndex), 500);
        }
        // Navigate to Notes before step 6 (index 6)
        else if (nextIndex === 6 && location.pathname !== '/notes') {
          navigate('/notes');
          setTimeout(() => setCurrentStepIndex(nextIndex), 500);
        }
        // Navigate to Profile before step 8 (index 8)
        else if (nextIndex === 8 && location.pathname !== '/profile') {
          navigate('/profile');
          setTimeout(() => setCurrentStepIndex(nextIndex), 500);
        }
        // Navigate back to previous pages if going backwards
        else if (action === ACTIONS.PREV) {
          if (nextIndex < 4 && location.pathname !== '/') {
            navigate('/');
            setTimeout(() => setCurrentStepIndex(nextIndex), 500);
          } else if (nextIndex >= 4 && nextIndex < 6 && location.pathname !== '/library') {
            navigate('/library');
            setTimeout(() => setCurrentStepIndex(nextIndex), 500);
          } else if (nextIndex >= 6 && nextIndex < 8 && location.pathname !== '/notes') {
            navigate('/notes');
            setTimeout(() => setCurrentStepIndex(nextIndex), 500);
          } else {
            setCurrentStepIndex(nextIndex);
          }
        } else {
          setCurrentStepIndex(nextIndex);
        }
      }
    },
    [endTour, navigate, location.pathname, setCurrentStepIndex]
  );

  if (!isTourActive) return null;

  return (
    <Joyride
      steps={tourSteps}
      run={isTourActive}
      continuous
      showProgress
      showSkipButton
      stepIndex={currentStepIndex}
      callback={handleJoyrideCallback}
      styles={{
        options: {
          arrowColor: 'hsl(var(--background))',
          backgroundColor: 'hsl(var(--background))',
          primaryColor: 'hsl(var(--primary))',
          textColor: 'hsl(var(--foreground))',
          zIndex: 10000,
        },
        tooltip: {
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
          padding: '1rem',
        },
        tooltipTitle: {
          fontSize: '1rem',
          fontWeight: 600,
          marginBottom: '0.5rem',
          color: 'hsl(var(--foreground))',
        },
        tooltipContent: {
          padding: '0.5rem 0',
          color: 'hsl(var(--muted-foreground))',
        },
        buttonNext: {
          backgroundColor: 'hsl(var(--primary))',
          color: 'hsl(var(--primary-foreground))',
          borderRadius: '0.375rem',
          padding: '0.5rem 1rem',
          fontSize: '0.875rem',
        },
        buttonBack: {
          color: 'hsl(var(--muted-foreground))',
          marginRight: '0.5rem',
        },
        buttonSkip: {
          color: 'hsl(var(--muted-foreground))',
        },
      }}
      locale={{
        back: 'Back',
        close: 'Close',
        last: 'Finish',
        next: 'Next',
        skip: 'Skip Tour',
      }}
    />
  );
};
