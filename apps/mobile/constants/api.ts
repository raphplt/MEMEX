import Constants from "expo-constants";

const DEFAULT_API_PORT = 3000;

const inferHostFromExpo = (): string | undefined => {
	// In dev, hostUri is often like "192.168.1.10:8081".
	const hostUri = Constants.expoConfig?.hostUri;
	if (!hostUri) return undefined;
	return hostUri.split(":")[0];
};

export const getApiBaseUrl = (): string => {
	const fromEnv = process.env.EXPO_PUBLIC_API_URL;
	if (fromEnv && fromEnv.trim().length > 0) {
		return fromEnv.replace(/\/$/, "");
	}

	const inferredHost = inferHostFromExpo();
	if (inferredHost) {
		return `http://${inferredHost}:${DEFAULT_API_PORT}`;
	}

	// Fallback mainly for web / simulator cases.
	return `http://localhost:${DEFAULT_API_PORT}`;
};
