import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

interface TypingEffectProps {
  text: string;
  isMarkdown?: boolean;
  onTyping?: () => void;
  onComplete?: () => void;
}

const TypingEffect: React.FC<TypingEffectProps> = ({
  text,
  isMarkdown = false,
  onTyping,
  onComplete,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
        onTyping?.(); // Gọi callback mỗi khi có ký tự mới
      }, 30);

      return () => clearTimeout(timeout);
    } else {
      onComplete?.(); // Gọi callback khi hoàn thành typing
    }
  }, [currentIndex, text, onTyping, onComplete]);

  useEffect(() => {
    setDisplayedText("");
    setCurrentIndex(0);
  }, [text]);

  if (isMarkdown) {
    return <ReactMarkdown>{displayedText}</ReactMarkdown>;
  }

  return <>{displayedText}</>;
};

export default TypingEffect;
