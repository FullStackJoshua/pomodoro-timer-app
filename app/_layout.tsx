import { Tabs } from "expo-router";
import { TimerProvider } from "@/context/TimerProvider";
import { Ionicons } from "@expo/vector-icons";
import Background from "@/components/Background";
import ToastNotification from "@/components/ToastNotification";
import "./global.css";

export default function Layout() {
  return (
    <TimerProvider>
      <Background>
        <Tabs screenOptions={{ headerShown: false }}>
          <Tabs.Screen
            name="index"
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
            }}
          />

          <Tabs.Screen
            name="settings"
            options={{
              tabBarLabel: "Settings",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="settings" size={size} color={color} />
              ),
            }}
          />
        </Tabs>

        <ToastNotification />
      </Background>
    </TimerProvider>
  );
}
