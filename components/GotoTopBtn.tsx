"use client";

export function GotoTopBtn() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-16 right-6 bg-purple-900 text-white py-2 px-4 rounded-full shadow-xl/60 font-bold shadow-purple-950 hover:bg-purple-950 transition-colors"
      aria-label="Go to top"
    >
      Go to Top
    </button>
  );
}