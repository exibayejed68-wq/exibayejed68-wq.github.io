import React, { useEffect, useRef, useState } from "react";

const YouTubePlayer = () => {
  const playerRef = useRef(null);
  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Load YouTube IFrame Player API
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    // This function gets called automatically by YouTube API
    window.onYouTubeIframeAPIReady = () => {
      const newPlayer = new window.YT.Player(playerRef.current, {
        height: "0", // hidden visually
        width: "0",
        videoId: "jfKfPfyJRdk", // your video ID
        playerVars: {
          autoplay: 0,
          controls: 0,
          modestbranding: 1,
          loop: 1,
          playlist: "jfKfPfyJRdk", // needed for looping
        },
        events: {
          onReady: () => setPlayer(newPlayer),
        },
      });
    };
  }, []);

  const togglePlay = () => {
    if (!player) return;
    if (isPlaying) {
      player.pauseVideo();
      setIsPlaying(false);
    } else {
      player.playVideo();
      setIsPlaying(true);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h3>🎵 Lo-fi Radio Player</h3>
      <button
        onClick={togglePlay}
        style={{
          background: isPlaying ? "#e74c3c" : "#2ecc71",
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
      {/* Hidden YouTube iframe */}
      <div ref={playerRef}></div>
    </div>
  );
};

export default YouTubePlayer;
