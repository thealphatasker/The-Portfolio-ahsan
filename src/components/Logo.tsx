export default function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <img 
      src="https://i.ibb.co/Y7sQqjq0/image.png" 
      alt="Website Logo" 
      className={`object-contain dark:invert-0 invert transition-all duration-500 ${className}`}
      referrerPolicy="no-referrer"
    />
  );
}
