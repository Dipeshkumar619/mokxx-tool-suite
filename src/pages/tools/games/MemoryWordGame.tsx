import { useState, useEffect, useCallback, useRef } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Brain, Trophy, Clock, RotateCcw, ArrowRight, CheckCircle, XCircle } from "lucide-react";
import { findTool } from "@/data/tools";

const WORD_POOL = [
  "apple", "bridge", "castle", "dragon", "eagle", "forest", "garden", "hammer",
  "island", "jacket", "knight", "lantern", "mirror", "needle", "ocean", "palace",
  "quartz", "rocket", "silver", "temple", "umbrella", "violet", "winter", "xenon",
  "yellow", "zephyr", "anchor", "bottle", "candle", "desert", "engine", "falcon",
  "glacier", "harbor", "ivory", "jungle", "kernel", "lemon", "marble", "nebula",
  "orchid", "planet", "ribbon", "sunset", "thunder", "voyage", "walnut", "crystal",
  "breeze", "cobalt", "dagger", "ember", "flint", "goblet", "helmet", "indigo",
  "jasper", "kettle", "lotus", "magnet", "nimbus", "olive", "prism", "quiver",
  "rapids", "sphinx", "tiger", "urchin", "velvet", "willow", "amber", "blaze",
  "cipher", "drift", "echo", "flame", "grove", "haven", "iron", "jewel",
  "kite", "lunar", "mist", "nova", "opal", "pearl", "quest", "raven",
  "storm", "thorn", "unity", "valor", "wave", "zenith", "arctic", "beacon"
];

function pickRandomWords(count: number, exclude: string[] = []): string[] {
  const available = WORD_POOL.filter(w => !exclude.includes(w));
  const shuffled = [...available].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function getWordsForLevel(level: number): number {
  return Math.min(3 + level, 15); // starts at 4 words, caps at 15
}

function getTimeForLevel(level: number): number {
  const base = 10;
  const words = getWordsForLevel(level);
  return Math.max(base, Math.ceil(words * 1.5)); // more words = more time
}

type Phase = "idle" | "memorize" | "recall" | "result";

export default function MemoryWordGame() {
  const [level, setLevel] = useState(1);
  const [phase, setPhase] = useState<Phase>("idle");
  const [words, setWords] = useState<string[]>([]);
  const [userInputs, setUserInputs] = useState<string[]>([]);
  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    const saved = localStorage.getItem("memory-game-best");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [results, setResults] = useState<{ word: string; entered: string; correct: boolean }[]>([]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const startRound = useCallback(() => {
    const count = getWordsForLevel(level);
    const newWords = pickRandomWords(count);
    setWords(newWords);
    setUserInputs(Array(count).fill(""));
    setResults([]);
    setTimer(getTimeForLevel(level));
    setPhase("memorize");
  }, [level]);

  // Timer countdown during memorize phase
  useEffect(() => {
    if (phase !== "memorize") return;
    if (timer <= 0) {
      setPhase("recall");
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
      return;
    }
    const id = setTimeout(() => setTimer(t => t - 1), 1000);
    return () => clearTimeout(id);
  }, [phase, timer]);

  const handleInputChange = (index: number, value: string) => {
    setUserInputs(prev => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (index < words.length - 1) {
        inputRefs.current[index + 1]?.focus();
      } else {
        submitAnswers();
      }
    }
  };

  const submitAnswers = () => {
    const res = words.map((word, i) => ({
      word,
      entered: userInputs[i]?.trim().toLowerCase() || "",
      correct: userInputs[i]?.trim().toLowerCase() === word.toLowerCase(),
    }));
    setResults(res);
    const correctCount = res.filter(r => r.correct).length;
    const allCorrect = correctCount === words.length;

    if (allCorrect) {
      const newScore = score + words.length * level;
      setScore(newScore);
      if (newScore > bestScore) {
        setBestScore(newScore);
        localStorage.setItem("memory-game-best", String(newScore));
      }
    }

    setPhase("result");
  };

  const nextLevel = () => {
    setLevel(l => l + 1);
    setPhase("idle");
  };

  const restart = () => {
    setLevel(1);
    setScore(0);
    setPhase("idle");
    setWords([]);
    setUserInputs([]);
    setResults([]);
  };

  const allCorrect = results.length > 0 && results.every(r => r.correct);
  const correctCount = results.filter(r => r.correct).length;

  const found = findTool("games", "memory-word-game");
  if (!found) return null;

  return (
    <ToolLayout
      category={found.category}
      tool={found.tool}
    >
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Stats bar */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Brain className="w-4 h-4 text-primary" />
              Level {level}
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Trophy className="w-4 h-4 text-yellow-500" />
              Score: {score}
            </div>
            <div className="text-xs text-muted-foreground">
              Best: {bestScore}
            </div>
          </div>
          {phase !== "idle" && (
            <Button variant="ghost" size="sm" onClick={restart}>
              <RotateCcw className="w-4 h-4 mr-1" /> Restart
            </Button>
          )}
        </div>

        {/* IDLE */}
        {phase === "idle" && (
          <div className="text-center py-12 space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20">
              <Brain className="w-10 h-10 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Level {level}
              </h2>
              <p className="text-muted-foreground">
                Memorize <span className="text-foreground font-semibold">{getWordsForLevel(level)} words</span> in{" "}
                <span className="text-foreground font-semibold">{getTimeForLevel(level)} seconds</span>
              </p>
            </div>
            <Button size="lg" onClick={startRound} className="gap-2">
              Start Round <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* MEMORIZE */}
        {phase === "memorize" && (
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-2 text-lg font-semibold text-foreground">
              <Clock className="w-5 h-5 text-primary animate-pulse" />
              <span className={timer <= 3 ? "text-destructive" : ""}>{timer}s</span>
            </div>
            <p className="text-center text-sm text-muted-foreground">Memorize these words!</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {words.map((word, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center h-14 rounded-xl bg-primary/10 border border-primary/20 text-foreground font-semibold text-lg tracking-wide animate-in fade-in"
                >
                  {word}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RECALL */}
        {phase === "recall" && (
          <div className="space-y-6">
            <p className="text-center text-muted-foreground">
              Enter the {words.length} words you memorized (in order):
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {words.map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground w-5 text-right">{i + 1}.</span>
                  <Input
                    ref={el => { inputRefs.current[i] = el; }}
                    value={userInputs[i]}
                    onChange={e => handleInputChange(i, e.target.value)}
                    onKeyDown={e => handleKeyDown(i, e)}
                    placeholder={`Word ${i + 1}`}
                    autoComplete="off"
                    autoCapitalize="off"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Button size="lg" onClick={submitAnswers} className="gap-2">
                Submit Answers <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* RESULT */}
        {phase === "result" && (
          <div className="space-y-6">
            <div className="text-center py-4">
              {allCorrect ? (
                <div className="space-y-2">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                  <h3 className="text-xl font-bold text-foreground">Perfect! 🎉</h3>
                  <p className="text-muted-foreground">You got all {words.length} words correct!</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <XCircle className="w-12 h-12 text-destructive mx-auto" />
                  <h3 className="text-xl font-bold text-foreground">
                    {correctCount}/{words.length} Correct
                  </h3>
                  <p className="text-muted-foreground">Try again to beat this level!</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {results.map((r, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg border ${
                    r.correct
                      ? "bg-green-500/10 border-green-500/20"
                      : "bg-destructive/10 border-destructive/20"
                  }`}
                >
                  {r.correct ? (
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-destructive shrink-0" />
                  )}
                  <div className="min-w-0">
                    <span className="text-foreground font-medium">{r.word}</span>
                    {!r.correct && r.entered && (
                      <span className="text-muted-foreground text-sm ml-2">
                        (you: {r.entered})
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-3">
              {allCorrect ? (
                <Button size="lg" onClick={nextLevel} className="gap-2">
                  Next Level <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button size="lg" onClick={startRound} className="gap-2">
                  <RotateCcw className="w-4 h-4" /> Try Again
                </Button>
              )}
              <Button variant="outline" size="lg" onClick={restart}>
                Restart
              </Button>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
