"use client";

type Props = {
  children: React.ReactNode;
};

export const OverlayRoot: React.FC<Props> = ({ children }) => {
  // When clicking the outer container, close the overlay
  const closeOverlay = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      e.stopPropagation();
    }
  };

  return (
    <div
      className="absolute left-0 top-0 z-40 flex h-full w-full flex-col items-center justify-center bg-neutral-900/40"
      onClick={closeOverlay}
    >
      {children}
    </div>
  );
};
