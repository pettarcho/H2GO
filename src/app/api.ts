const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://10.184.248.211:5285/api";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const contentType = response.headers.get("content-type") ?? "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    throw new Error(typeof payload === "string" ? payload : "Request failed");
  }

  return payload as T;
}

export type LoginPayload = {
  email: string;
  password: string;
};

export type HydrationGoalResponse = {
  dailyGoalMl?: number;
  daily_goal_ml?: number;
  DailyGoalMl?: number;
};

export type HydrationReadingResponse = {
  id?: number;
  waterConsumedMl?: number;
  WaterConsumedMl?: number;
  timestamp?: string;
  Timestamp?: string;
};

export type NotificationResponse = {
  id?: number;
  reminderType?: string;
  ReminderType?: string;
  triggeredAt?: string;
  TriggeredAt?: string;
  acknowledged?: boolean;
  Acknowledged?: boolean;
};

export function login(payload: LoginPayload) {
  return request<string>("/Auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function register(payload: LoginPayload) {
  return request<string>("/Auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getDashboardGoal() {
  return request<HydrationGoalResponse | null>("/Dashboard");
}

export function getWeeklyAnalytics() {
  return request<HydrationReadingResponse[]>("/Analytics");
}

export function getNotifications() {
  return request<NotificationResponse[]>("/Notifications");
}
