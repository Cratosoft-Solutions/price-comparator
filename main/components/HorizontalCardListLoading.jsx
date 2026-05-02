import React from "react";

const SkeletonCard = () => (
  <div className="rounded-xl border border-dark-border/20 bg-dark-surface/40 overflow-hidden">
    <div className="animate-pulse">
      <div className="aspect-square bg-dark-elevated/40" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-dark-elevated/50 rounded-lg w-full" />
        <div className="h-3 bg-dark-elevated/40 rounded-lg w-3/4" />
        <div className="h-5 bg-dark-elevated/50 rounded-lg w-1/2 mt-3" />
      </div>
    </div>
  </div>
);

const HorizontalCardListLoading = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mt-4 w-full">
      {Array.from({ length: 8 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};

export default HorizontalCardListLoading;
