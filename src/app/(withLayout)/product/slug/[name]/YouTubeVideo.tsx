import React from "react";

interface YouTubeEmbedProps {
  videoUrl: string;
}

const YouTubeEmbed = ({ videoUrl }: YouTubeEmbedProps) => {

  const extractVideoId = (url: string) => {
    const urlParams = new URL(url).searchParams;
    return urlParams.get("v"); 
  };

  const videoId = extractVideoId(videoUrl);

  if (!videoId) {
    return <p>Invalid YouTube URL</p>;
  }

  return (
    <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden" }}>
      <iframe
        title="YouTube Video"
        src={`https://www.youtube.com/embed/${videoId}`}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;


