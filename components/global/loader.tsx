import { CSSPlugin, Expo, gsap } from "gsap";
import styled from "styled-components";

import React, { useEffect } from "react";

gsap.registerPlugin(CSSPlugin);

const dotStyle: React.CSSProperties = {
  display: "inline-block",
  width: 16,
  height: 16,
  margin: "0 4px",
  borderRadius: "50%",
  background: "#7f5af0",
  animation: "bounce 1s infinite alternate",
};

interface LoaderProps {
  onComplete: () => void;
}

interface IconProps {
  src: string;
  alt: string;
}

const IconPlaceholder: React.FC<IconProps> = ({ src, alt }) => (
  <div className="flex h-12 w-12 items-center justify-center rounded-2xl md:h-20 md:w-20">
    <img
      src={src}
      alt={alt}
      className="mt-4 h-6 w-6 object-contain drop-shadow-md md:h-20 md:w-20"
    />
  </div>
);

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      reveal();
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const reveal = () => {
    const t1 = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    t1.to(".dots-wrapper", { opacity: 0, duration: 0.4, ease: Expo.easeInOut })
      .to(".dots-wrapper", { display: "none", duration: 0 })
      .to(
        ".follow",
        { width: "100%", ease: Expo.easeInOut, duration: 1.2 },
        "-=0.2",
      )
      .to(".follow", {
        height: "100%",
        ease: Expo.easeInOut,
        duration: 0.7,
        delay: 0.2,
      })
      .to(".content", { width: "100%", ease: Expo.easeInOut, duration: 0.7 })

      .to(".word-1", {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: Expo.easeOut,
      })
      .to(".word-1", { opacity: 0, duration: 0.1 }, "+=0.3")
      .to(".word-2", {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: Expo.easeOut,
      })
      .to(".word-2", { opacity: 0, duration: 0.1 }, "+=0.3")
      .to(".word-3", {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: Expo.easeOut,
      })
      .to(".loader-wrapper", {
        opacity: 0,
        duration: 0.8,
        ease: Expo.easeInOut,
        delay: 0.5,
      });
  };

  return (
    <LoaderContainer
      className="loader-wrapper"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        backgroundColor: "#ffffff",
      }}
    >
      <LoadingLayer
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Follow className="follow"></Follow>

        <div className="dots-wrapper" style={{ zIndex: 10 }}>
          <style>{`
            @keyframes bounce {
              0% { transform: translateY(0); }
              100% { transform: translateY(-24px); }
            }
          `}</style>
          <span style={{ ...dotStyle, animationDelay: "0s" }} />
          <span
            style={{
              ...dotStyle,
              background: "#f15bb5",
              animationDelay: "0.2s",
            }}
          />
          <span
            style={{
              ...dotStyle,
              background: "#fee440",
              animationDelay: "0.4s",
            }}
          />
        </div>
      </LoadingLayer>

      <Content className="content">
        <div className="inner-wrapper relative">
          {/* Word 1 */}
          <div
            className="word-1 absolute flex items-center justify-center gap-4 md:gap-8"
            style={{ opacity: 0, transform: "scale(0.95)" }}
          >
            <h1 className="font-primary text-5xl font-extrabold tracking-tighter text-white md:text-7xl lg:text-9xl">
              Design
            </h1>
            <IconPlaceholder src="/icons/icon_1.png" alt="Design Icon" />
          </div>

          {/* Word 2 */}
          <div
            className="word-2 absolute flex items-center justify-center gap-4 md:gap-8"
            style={{ opacity: 0, transform: "scale(0.95)" }}
          >
            <h1 className="font-primary text-5xl font-extrabold tracking-tighter text-white md:text-7xl lg:text-9xl">
              Automate
            </h1>
            <IconPlaceholder src="/icons/icon_2.png" alt="Automate Icon" />
          </div>

          {/* Word 3 */}
          <div
            className="word-3 absolute flex items-center justify-center gap-4 md:gap-8"
            style={{ opacity: 0, transform: "scale(0.95)" }}
          >
            <h1 className="font-primary text-5xl font-extrabold tracking-tighter text-white md:text-7xl lg:text-9xl">
              Scale
            </h1>
            <IconPlaceholder src="/icons/icon_3.png" alt="Scale Icon" />
          </div>
        </div>
      </Content>
    </LoaderContainer>
  );
};

export default Loader;

const LoaderContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background: #ffffff;
  overflow: hidden;
`;

const LoadingLayer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
`;

const Follow = styled.div`
  position: absolute;
  background-color: #0e0d09;
  height: 2px;
  width: 0;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
`;

const Content = styled.div`
  height: 100%;
  width: 0;
  position: absolute;
  left: 0;
  top: 0;
  background-color: #0e0d09;
  z-index: 25;
  overflow: hidden;

  .inner-wrapper {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 20px;
  }
`;
