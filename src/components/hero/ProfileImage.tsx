import { useScrollReveal } from '@/hooks/useScrollReveal';

const ProfileImage = () => {
  const imageRef = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });

  return (
    <div 
      ref={imageRef}
      className="reveal-text flex-shrink-0 order-first md:order-last mx-auto md:mx-0"
    >
      {/* Replaced 'dark-glow' with a primary (green) shadow */}
      <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl shadow-primary/20">
        <img
          src="lovable-uploads/user1.png"
          alt="Aidiel Ziat - AI & Data Consultant"
          className="w-full h-full object-cover"
        />
        
        {/* Changed ring to white/5 to keep it neutral and professional */}
        <div className="absolute inset-0 ring-4 ring-white/5 rounded-full"></div>
      </div>
    </div>
  );
};

export default ProfileImage;