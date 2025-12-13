import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function scramble(word: string) {
  return word
    .split("")
    .map((c) => (c === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)]))
    .join("");
}

function EncryptedWord({
  word,
  duration = 350,
}: {
  word: string;
  duration?: number;
}) {
  const [text, setText] = useState(scramble(word));

  useEffect(() => {
    let frame = 0;
    const frames = Math.max(1, Math.floor(duration / 40));

    const interval = setInterval(() => {
      frame++;
      if (frame >= frames) {
        setText(word);
        clearInterval(interval);
      } else {
        setText(scramble(word));
      }
    }, 40);

    return () => clearInterval(interval);
  }, [word, duration]);

  return <span>{text}</span>;
}

export function EncryptedHeading({
  text,
  wordDelay = 120,
  className = "",
}: {
  text: string;
  wordDelay?: number;
  className?: string;
}) {
  const words = text.split(" ");

  return (
    <span className={`inline-flex flex-wrap gap-x-2 ${className}`}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block"
          style={{ animationDelay: `${i * wordDelay}ms` }}
        >
          <EncryptedWord word={word} />
        </span>
      ))}
    </span>
  );
}
