
export enum ViewState {
  LOGIN = 'LOGIN',
  HOME = 'HOME',
  MAP = 'MAP',
  AIR = 'AIR',
  PROFILE = 'PROFILE',
  CHAT = 'CHAT',
}

export enum TaskStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',      // Next Stop (下一站)
  IN_PROGRESS = 'IN_PROGRESS', // Currently doing (進行中)
  COMPLETED = 'COMPLETED',
}

export interface Task {
  id: string;
  time: string;
  title: string;
  location: string;
  floor: string;
  description: string;
  status: TaskStatus;
  estimatedDuration: number; // minutes
  requiresBot: boolean;
}

export enum BotStatus {
  IDLE = 'IDLE',
  NAVIGATING = 'NAVIGATING', // Combined guiding state
  ARRIVED = 'ARRIVED',
}

export interface AirQualityData {
  co2: number;
  bacteriaIndex: number; // 0-100
  temp: number;
  humidity: number;
  timestamp: string;
}

export interface UserProfile {
  name: string;
  idNumber: string; // Masked
  patientId: string;
  accessibilityMode: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
