import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useTimerContext } from "@/context/TimerProvider";

export default function SettingsScreen() {
  const { pomodoroDuration, shortBreakDuration, longBreakDuration, updateDurations } =
    useTimerContext();

  const [newPomodoro, setNewPomodoro] = useState((pomodoroDuration / 60).toString());
  const [newShortBreak, setNewShortBreak] = useState((shortBreakDuration / 60).toString());
  const [newLongBreak, setNewLongBreak] = useState((longBreakDuration / 60).toString());

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 justify-center items-center bg-neutral-900"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="w-full flex-1 justify-center items-center px-5 ">
          <Text className="text-white text-5xl font-bold mb-5 text-center">Timer Settings</Text>
          <View className="mb-4">
            <Text className="text-white mb-1">Pomodoro (minutes):</Text>
            <TextInput
              className="bg-gray-800 text-white p-2 rounded-md w-32 text-center"
              keyboardType="numeric"
              value={newPomodoro}
              onChangeText={setNewPomodoro}
            />
          </View>
          <View className="mb-4">
            <Text className="text-white mb-1">Short Break (minutes):</Text>
            <TextInput
              className="bg-gray-800 text-white p-2 rounded-md w-32 text-center"
              keyboardType="numeric"
              value={newShortBreak}
              onChangeText={setNewShortBreak}
            />
          </View>
          <View className="mb-4">
            <Text className="text-white mb-1">Long Break (minutes):</Text>
            <TextInput
              className="bg-gray-800 text-white p-2 rounded-md w-32 text-center"
              keyboardType="numeric"
              value={newLongBreak}
              onChangeText={setNewLongBreak}
            />
          </View>
          <Button
            title="Save Settings"
            onPress={() => {
              updateDurations(
                parseInt(newPomodoro) * 60,
                parseInt(newShortBreak) * 60,
                parseInt(newLongBreak) * 60
              );
              Keyboard.dismiss();
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
