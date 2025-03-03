import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type SessionType = "work" | "shortBreak" | "longBreak";

type TimerContextType = {
  timeLeft: number;
  isRunning: boolean;
  sessionType: SessionType;
  pomodoroDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  setTimeLeft: (time: number) => void;
  updateDurations: (pomodoro: number, shortBreak: number, longBreak: number) => void;
};

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pomodoroDuration, setPomodoroDuration] = useState(25 * 60);
  const [shortBreakDuration, setShortBreakDuration] = useState(5 * 60);
  const [longBreakDuration, setLongBreakDuration] = useState(15 * 60);

  const [timeLeft, setTimeLeft] = useState(pomodoroDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState<SessionType>("work");

  useEffect(() => {
    const loadSettings = async () => {
      const pomodoro = await AsyncStorage.getItem("pomodoroDuration");
      const shortBreak = await AsyncStorage.getItem("shortBreakDuration");
      const longBreak = await AsyncStorage.getItem("longBreakDuration");

      if (pomodoro) setPomodoroDuration(parseInt(pomodoro));
      if (shortBreak) setShortBreakDuration(parseInt(shortBreak));
      if (longBreak) setLongBreakDuration(parseInt(longBreak));
    };
    loadSettings();
  }, []);

  const updateDurations = async (pomodoro: number, shortBreak: number, longBreak: number) => {
    setPomodoroDuration(pomodoro);
    setShortBreakDuration(shortBreak);
    setLongBreakDuration(longBreak);
    setTimeLeft(pomodoro);

    await AsyncStorage.setItem("pomodoroDuration", pomodoro.toString());
    await AsyncStorage.setItem("shortBreakDuration", shortBreak.toString());
    await AsyncStorage.setItem("longBreakDuration", longBreak.toString());
  };

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);

  const resetTimer = () => {
    setSessionType("work");
    setTimeLeft(pomodoroDuration);
    setIsRunning(false);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0) {
      switch (sessionType) {
        case "work":
          setSessionType("shortBreak");
          setTimeLeft(shortBreakDuration);
          break;
        case "shortBreak":
          setSessionType("work");
          setTimeLeft(pomodoroDuration);
          break;
        case "longBreak":
          setSessionType("work");
          setTimeLeft(pomodoroDuration);
          break;
      }
      setIsRunning(false);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, timeLeft, sessionType]);

  return (
    <TimerContext.Provider
      value={{
        timeLeft,
        isRunning,
        sessionType,
        pomodoroDuration,
        shortBreakDuration,
        longBreakDuration,
        startTimer,
        pauseTimer,
        resetTimer,
        setTimeLeft,
        updateDurations,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimerContext = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("useTimerContext must be used within a TimerProvider");
  }
  return context;
};
