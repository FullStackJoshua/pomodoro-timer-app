import React, { useEffect, useCallback, useState } from "react";
import { Text, RefreshControl, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/Button";
import { useTimerContext } from "@/context/TimerProvider";
import Background from "@/components/Background";
import Toast from "react-native-toast-message";
import { useFocusEffect } from "expo-router";

export default function HomeScreen() {
  const { isRunning, startTimer, pauseTimer, resetTimer, timeLeft, sessionType } =
    useTimerContext();
  const [refreshing, setRefreshing] = useState(false);
  const [hasSessionEnded, setHasSessionEnded] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    isRunning ? pauseTimer() : startTimer();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, [isRunning, startTimer, pauseTimer]);

  useFocusEffect(
    useCallback(() => {
      Toast.show({
        type: "success",
        text1: "Pull down to start/pause the timer",
        visibilityTime: 3000,
      });

      return () => {
        Toast.hide();
      };
    }, [])
  );

  useEffect(() => {
    if (timeLeft === 0 && !hasSessionEnded) {
      Toast.show({
        type: "success",
        text1: sessionType === "work" ? "Work session complete!" : "Break time is over!",
        text2: sessionType === "work" ? "Take a short break! ☕" : "Time to focus again! 🎯",

        visibilityTime: 4000,
      });
      setHasSessionEnded(true);
    }

    if (timeLeft > 0) {
      setHasSessionEnded(false);
    }
  }, [timeLeft, sessionType]);

  return (
    <Background>
      <SafeAreaView className="flex-1 items-center justify-center">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <Text className="text-2xl font-bold text-white">
            {sessionType === "work" && "🛠 Focus Mode"}
            {sessionType === "shortBreak" && "☕ Short Break"}
            {sessionType === "longBreak" && "🌿 Long Break"}
          </Text>

          <Text className="text-5xl font-bold text-white mt-2">
            {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
          </Text>

          <Button
            title={isRunning ? "Pause" : "Start"}
            variant={isRunning ? "danger" : "success"}
            onPress={isRunning ? pauseTimer : startTimer}
          />
          <Button title="Reset" variant="default" onPress={resetTimer} />
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
}
