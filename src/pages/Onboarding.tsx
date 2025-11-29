import { useState, useEffect, createElement } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, FileText, Library, Network, ArrowRight, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const steps = [
  {
    icon: FileText,
    title: "Capture Your Thoughts",
    description: "Create notes to capture ideas, insights, and knowledge. Use markdown formatting for rich content.",
  },
  {
    icon: Library,
    title: "Build Your Library",
    description: "Save papers, videos, and podcasts. Link them to your notes for complete context.",
  },
  {
    icon: Network,
    title: "Connect Ideas",
    description: "Discover relationships between your notes. Watch your knowledge graph grow organically.",
  },
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });
  }, [navigate]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    // Set flag to trigger tour for first-time users
    localStorage.setItem('skyrius-show-tour', 'true');
    
    toast({
      title: "Welcome to brain-node!",
      description: "Let's start building your second brain.",
    });
    navigate("/");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-lg bg-accent flex items-center justify-center">
              <Brain className="w-10 h-10" />
            </div>
          </div>
          <CardTitle className="text-2xl">Welcome to brain-node!</CardTitle>
          <CardDescription>
            Let's get you started with the basics
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Progress indicator */}
          <div className="flex justify-center gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-12 rounded-full transition-colors ${
                  index <= currentStep ? "bg-accent" : "bg-muted"
                }`}
              />
            ))}
          </div>

          {/* Current step content */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center">
                {createElement(steps[currentStep].icon, {
                  className: "w-10 h-10 text-accent",
                })}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">{steps[currentStep].title}</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                {steps[currentStep].description}
              </p>
            </div>
          </div>

          {/* Features checklist */}
          <div className="space-y-3 max-w-md mx-auto">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border">
              <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-accent" />
              </div>
              <div>
                <p className="font-medium">Smart Organization</p>
                <p className="text-sm text-muted-foreground">Folders, tags, and powerful search</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border">
              <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-accent" />
              </div>
              <div>
                <p className="font-medium">AI-Powered Insights</p>
                <p className="text-sm text-muted-foreground">Get suggestions and discover patterns</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border">
              <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-accent" />
              </div>
              <div>
                <p className="font-medium">Visual Knowledge Graph</p>
                <p className="text-sm text-muted-foreground">See connections come to life</p>
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              Back
            </Button>
            <Button onClick={handleNext} className="bg-accent hover:bg-accent/90">
              {currentStep === steps.length - 1 ? (
                "Get Started"
              ) : (
                <>
                  Next
                  <ArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>
          </div>

          <div className="text-center">
            <button
              onClick={handleComplete}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Skip tutorial
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
