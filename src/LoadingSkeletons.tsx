import React from 'react';

interface LoadingSkeletonsProps {
  page?: boolean;
}

const LoadingSkeletons: React.FC<LoadingSkeletonsProps> = ({ page = false }) => {
  if (page) {
    return (
      <div className="w-full min-h-screen bg-background flex flex-col space-y-8 p-4 md:p-8 animate-pulse">
        {/* Navbar Skeleton */}
        <div className="h-16 w-full bg-muted rounded-md opacity-50" />
        
        {/* Hero Skeleton */}
        <div className="h-[40vh] w-full bg-muted rounded-xl opacity-30 flex items-center justify-center">
          <div className="h-12 w-1/2 bg-muted-foreground/20 rounded-md" />
        </div>

        {/* Content Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-64 bg-muted rounded-lg opacity-40" />
          <div className="h-64 bg-muted rounded-lg opacity-40" />
          <div className="h-64 bg-muted rounded-lg opacity-40" />
        </div>
      </div>
    );
  }

  // Component level skeleton
  return (
    <div className="w-full h-full min-h-[200px] bg-muted/50 rounded-lg animate-pulse flex flex-col p-4 space-y-4">
      <div className="h-3/4 w-full bg-muted-foreground/10 rounded-md" />
      <div className="h-4 w-2/3 bg-muted-foreground/10 rounded-md" />
      <div className="h-4 w-1/3 bg-muted-foreground/10 rounded-md" />
    </div>
  );
};

export default LoadingSkeletons;