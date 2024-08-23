// types.ts
export interface AlertSettings {
  email: boolean;
  sms: boolean;
  inApp: boolean;
}

export interface BudgetSettingsType {
  currency: string;
  rounding: string;
  alerts: AlertSettings;
}

export interface Budget {
  id: number | string;
  name: string;
  type: string;
  currency: string;
  startDate: string;
  endDate: string;
  frequency: string;
  categories: Array<{
    name: string;
    type: string;
    amount: string;
    subcategories: Array<{
      name: string;
      amount: string;
    }>;
  }>;
  notes: string;
  tags: string;
  settings: BudgetSettingsType;
}

// Props for the BudgetSettings component
export interface BudgetSettingsProps {
  settings: BudgetSettingsType;
  onSave: (settings: BudgetSettingsType) => void;
}

// chat type properties
export interface Message {
  type: "text" | "file";
  content: string;
  sender: "user" | "other";
  timestamp: string;
  fileName?: string;
}

export interface Contact {
  id: number | string;
  name: string;
  status: "online" | "offline";
  avatar: string;
  telephone: string;
}

export interface ChatMessagesProps {}

export interface Conversation {
  id: number | string;
  avatar: string;
  name: string;
  lastMessage: string;
  timestamp: string;
}

export interface ChatState {
  messages: Message[];
  contacts: Contact[];
  conversations: Conversation[];
  activeConversation: Conversation | null;
  isTyping: boolean;
  theme: "light" | "dark";
  fontSize: number;
  userBubbleColor: string;
  otherBubbleColor: string;
  notificationSound: boolean;
  notificationPreview: boolean;
  status: "idle" | "loading" | "failed";
  error: string | null;
}

// Action Payloads
export interface SetActiveConversationPayload {
  id: number;
}

export interface SetIsTypingPayload {
  isTyping: boolean;
}

export interface SetThemePayload {
  theme: "light" | "dark";
}

export interface SetFontSizePayload {
  fontSize: number;
}

export interface SetUserBubbleColorPayload {
  color: string;
}

export interface SetOtherBubbleColorPayload {
  color: string;
}

export interface SetNotificationSoundPayload {
  enabled: boolean;
}

export interface SetNotificationPreviewPayload {
  enabled: boolean;
}

// Async Thunk Types
export interface SendMessagePayload {
  type: "text";
  content: string;
  sender: "user";
  timestamp: string;
}

export interface ReceiveMessagePayload {
  type: "text";
  content: string;
  sender: "other";
  timestamp: string;
}

export interface UploadFilePayload {
  type: "file";
  content: string;
  fileName: string;
  sender: "user";
  timestamp: string;
}

// schedule types
export type EventType = "appointment" | "specialEvent";

export interface Appointment {
  id: number | string;
  title: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  location: string;
  description: string;
  attendees: string;
  reminder: string;
  status: "Pending" | "Confirmed" | "Cancelled";
}

export interface Event {
  id: number | string;
  eventName: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  type: "Birthday" | "Anniversary" | "Holiday" | "Other";
  reminder: string;
}

export interface AppointmentState {
  appointments: Appointment[];
}

export interface EventState {
  events: Event[];
}

// todo types
export interface Todo {
  id: string;
  name: string;
  description: string;
  dueDate: Date;
  priority: "low" | "medium" | "high";
  category: string;
  status: "pending" | "in progress" | "completed";
  reminder: string;
}

export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

// routineTypes.ts
export interface RoutineFormData {
  _id?: string; // Optional, as it won't be present for new routines
  name: string;
  startTime: string;
  endTime: string;
  frequency: "daily" | "weekly" | "monthly";
  daysOfWeek: number[];
  description?: string;
  reminder: boolean;
  status?: "active" | "inactive";
}

export interface RoutineFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RoutineFormData) => Promise<void>;
  initialData?: RoutineFormData | null;
}

// Types for Redux slice
export interface RoutineState {
  routines: RoutineFormData[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface Routine {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  frequency: string;
  daysOfWeek: number[];
  description?: string;
  status: "active" | "inactive";
  reminder?: boolean;
}
