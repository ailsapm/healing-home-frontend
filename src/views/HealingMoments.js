import React from 'react';
import '../styles/style.css'; //import styling

const HealingMoments = () => {
  //list of guided meditation videos, just hardcoded 
  const meditations = [
    { title: 'Gratitude Meditation', url: 'https://player.vimeo.com/video/1080894561?h=a2fe5274bf' },
    { title: 'Fireplace Meditation', url: 'https://player.vimeo.com/video/1080906782?h=d7ad60be2d' },
    { title: 'Snowfall Meditation', url: 'https://player.vimeo.com/video/1080978451?h=6a14cec3d8' },
    { title: 'Beach Meditation', url: 'https://player.vimeo.com/video/1080864669?h=29618c03a2' },
    { title: 'Forest Meditation', url: 'https://player.vimeo.com/video/1080729645?h=ca352361ec' },
  ];

  //list of ambient sound videos
  const ambientSounds = [
    { title: 'Ocean Sounds', url: 'https://player.vimeo.com/video/1080698508?h=3810fcb20c' },
    { title: 'River Sounds', url: 'https://player.vimeo.com/video/1080698669?h=907e7af11a' },
    { title: 'Birdsong', url: 'https://player.vimeo.com/video/1080698419?h=114ccfef8d' },
    { title: 'Wind', url: 'https://player.vimeo.com/video/1080698259?h=1a2c9fa2f5' },
    { title: 'Fire', url: 'https://player.vimeo.com/video/1080922118?h=178c6be6f2' },
  ];

  //writing and gentle activity prompts
  const promptSections = {
    writingPrompts: [
      "Take 5 minutes to list three things you're grateful for today.",
      "Reflect on a recent challenge and write what it taught you.",
      "List five small things that made you smile in the last week.",
      "Imagine your ideal peaceful space. Describe it with all five senses.",
      "Write about something you're looking forward to, no matter how small."
    ],
    activityPrompts: [
      "Step outside for 3–5 minutes and observe something in nature. What do you notice?",
      "Make yourself a warm drink and drink it slowly, noticing the smell, warmth, and taste.",
      "Do a one-minute body scan: relax your shoulders, unclench your jaw, and breathe deeply.",
      "Pick one object nearby and spend a full minute observing it. Describe what you see.",
      "Put on a calming piece of music and close your eyes while you listen to the entire track."
    ]
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Healing Moments</h2>

      <p className="hm-intro-text mb-5">
        Welcome to our Healing Moments section — a curated space offering writing prompts, gentle activities, 
        ambient relaxation videos, and meditations to help you de-stress and recharge. Even if you only have 
        five minutes, there's something here to soothe your mind and lift your spirit.
      </p>

      {/* ambient sounds */}
      <section className="mb-5">
        <h2>Ambient Relaxation</h2>
        <div className="row">
          {ambientSounds.map((video, index) => (
            <div className="col-md-6 col-lg-4 mb-4" key={index}>
              <div className="card h-100 border rounded">
                <iframe
                  src={video.url}
                  title={video.title}
                  className="hm-healing-iframe"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
                <div className="card-body">
                  <h5 className="card-title">{video.title}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* prompts */}
      <section className="mb-5">
        <h3>Writing & Reflection Prompts</h3>
        <ul>
          {promptSections.writingPrompts.map((prompt, index) => (
            <li key={`writing-${index}`}>{prompt}</li>
          ))}
        </ul>

        <h3>Gentle Activity Prompts</h3>
        <ul>
          {promptSections.activityPrompts.map((prompt, index) => (
            <li key={`activity-${index}`}>{prompt}</li>
          ))}
        </ul>
      </section>

      {/* guided meditations */}
      <section className="mb-5">
        <h2>Guided Meditations</h2>
        <div className="row">
          {meditations.map((video, index) => (
            <div className="col-md-6 col-lg-4 mb-4" key={index}>
              <div className="card h-100 border rounded">
                <iframe
                  src={video.url}
                  title={video.title}
                  className="hm-healing-iframe"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
                <div className="card-body">
                  <h5 className="card-title">{video.title}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HealingMoments;

