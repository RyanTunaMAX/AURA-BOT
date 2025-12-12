import { Task, TaskStatus } from './types';

export const MOCK_TASKS: Task[] = [
  {
    id: '1',
    time: '09:30',
    title: '報到與掛號',
    location: '一樓大廳',
    floor: '1F',
    description: '請至自動服務機感應健保卡完成報到。',
    status: TaskStatus.COMPLETED,
    estimatedDuration: 10,
    requiresBot: false,
  },
  {
    id: '2',
    time: '09:45',
    title: '內科門診',
    location: '門診 A 區',
    floor: '3F',
    description: '林醫師 - 一般內科問診。',
    status: TaskStatus.ACTIVE,
    estimatedDuration: 20,
    requiresBot: true,
  },
  {
    id: '3',
    time: '10:30',
    title: 'X 光檢查',
    location: '放射科 B 區',
    floor: '2F',
    description: '胸腔 X 光檢查，請移除身上金屬物品。',
    status: TaskStatus.PENDING,
    estimatedDuration: 15,
    requiresBot: true,
  },
  {
    id: '4',
    time: '11:00',
    title: '藥局領藥',
    location: '領藥櫃檯',
    floor: '1F',
    description: '請領取處方籤號 #99281 的藥品。',
    status: TaskStatus.PENDING,
    estimatedDuration: 10,
    requiresBot: false,
  },
];

export const MAP_NODES = {
  entrance: { x: 50, y: 350, label: '大門入口' },
  elevator: { x: 150, y: 350, label: '電梯' },
  clinic302: { x: 250, y: 150, label: '302 診間' },
  xray: { x: 300, y: 250, label: 'X 光室' },
  pharmacy: { x: 100, y: 150, label: '藥局' },
};

export const MOCK_USER = {
  name: "周大尾",
  idNumber: "00000000",
  patientId: "P-2024-0012",
  accessibilityMode: false
};