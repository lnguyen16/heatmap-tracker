export interface ActivityEntry {
  id: string;
  activityId: string;
  userId: string;
  date: string; // Format: YYYY-MM-DD
  value: number; // This could represent the count of activities for that date
  createdAt: Date; // Timestamp of when the entry was created
}
