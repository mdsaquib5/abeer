'use client';

import React, { useRef, useState } from 'react';
import { IoVolumeMuteOutline, IoVolumeHighOutline, IoPlayOutline, IoPauseOutline } from 'react-icons/io5';
;
import SectionTitle from '../ui/SectionTitle';

const reelsData = [
  {
    id: 1,
    title: "Floral Affairé",
    subtitle: "Launching June 15",
    videoSrc: "/2nd Collection- Nargis.mp4",
  },
  {
    id: 2,
    title: "Qala Editorial",
    subtitle: "Solid Ivory Dress",
    videoSrc: "/qala-one-pirce-ethenic-dress/IMG_0436.MOV",
  },
  {
    id: 3,
    title: "Geet Lookbook",
    subtitle: "Basant Bahaar",
    videoSrc: "/geet-kurta-set-2pc/IMG_8635.mov",
  },
  {
    id: 4,
    title: "Hania Movement",
    subtitle: "Slow Crafted Rust",
    videoSrc: "/hania-kurta-set/IMG_0527.MOV",
  }
];

function ReelCard({ reel }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(err => console.log('Video play interrupted:', err));
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="reels-card" onClick={togglePlay}>
      <video
        ref={videoRef}
        src={reel.videoSrc}
        className="reels-video"
        loop
        muted={isMuted}
        autoPlay
        playsInline
      />
      
      {/* Video controls overlays */}
      <div className="reels-overlay">
        <div className="reels-meta">
          <span className="reels-subtitle">{reel.subtitle}</span>
          <h3 className="reels-title">{reel.title}</h3>
        </div>

        <div className="reels-controls">
          <button className="reels-controlBtn" onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
            {isMuted ? <IoVolumeMuteOutline /> : <IoVolumeHighOutline />}
          </button>
          <div className="reels-playStateIcon">
            {isPlaying ? <IoPauseOutline /> : <IoPlayOutline />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReelsSection() {
  return (
    <section className="reels-section">
      <div className="container">
        <SectionTitle 
          title="The Abeer Muse" 
          subtitle="Wear Your Soul in Motion" 
        />
        
        <div className="reels-grid">
          {reelsData.map((reel) => (
            <ReelCard key={reel.id} reel={reel} />
          ))}
        </div>
      </div>
    </section>
  );
}
