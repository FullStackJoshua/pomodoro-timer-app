//StatusBar(displays the current time, Wi-Fi and cellular network information, battery level and/or other status icons):
//Show the status bar when the user touches the screen and goes away after 10 seconds of the app not being touched/inactive.
//Status bar style base on users OS system IE Light or dark mode. defualt light mode since bg is dark.

import React from "react";
import { Text, RefreshControl, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/Button";
import { useTimerContext } from "@/context/TimerProvider";
import Background from "@/components/Backgorund";

export default function HomeScreen() {
  const { isRunning, startTimer, pauseTimer, resetTimer, timeLeft, sessionType } =
    useTimerContext();

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    if (isRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, [isRunning, startTimer, pauseTimer]);

  return (
    <Background>
      <SafeAreaView className="flex-1 items-center justify-center">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <Text className="text-2xl font-bold text-white">Pull Down to Start and Stop Timer</Text>
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
