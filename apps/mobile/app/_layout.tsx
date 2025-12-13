import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { LogBox } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../global.css";

LogBox.ignoreLogs([
	"SafeAreaView has been deprecated",
	"deprecated and will be removed in a future release",
]);

export const unstable_settings = {
	anchor: "(tabs)",
};

const queryClient = new QueryClient();

export default function RootLayout() {
	return (
		<QueryClientProvider client={queryClient}>
			<SafeAreaProvider>
				<ThemeProvider value={DarkTheme}>
					<Stack>
						<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					</Stack>
					<StatusBar style="auto" />
				</ThemeProvider>
			</SafeAreaProvider>
		</QueryClientProvider>
	);
}
