import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs, addDoc, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { db, auth, firebaseInitialized } from '../services/firebase';
import CalendarHeatmap from './Heatmap'; // Import your custom wrapper component
import { ActivityEntry } from '../types';

const HeatmapTracker: React.FC = () => {
  const { activityId } = useParams<{ activityId: string }>();
  const [activityData, setActivityData] = useState<ActivityEntry[]>([]);
  const [activityName, setActivityName] = useState<string>('');
  const [error, setError] = useState<boolean>(!firebaseInitialized);

  useEffect(() => {
    if (firebaseInitialized) {
      loadActivityData();
    }
  }, [activityId]);

  const loadActivityData = async () => {
    if (!activityId) return;
    
    try {
      // Load activity details
      const activitiesRef = collection(db, 'activities');
      const activityQuery = query(activitiesRef, where('id', '==', activityId));
      const activityDoc: QuerySnapshot<DocumentData> = await getDocs(activityQuery);
      
      if (!activityDoc.empty) {
        const activity = activityDoc.docs[0].data();
        setActivityName(activity.name);
      }

      // Load activity entries
      const entriesRef = collection(db, 'entries');
      const entriesQuery = query(entriesRef, where('activityId', '==', activityId));

      const querySnapshot = await getDocs(entriesQuery);
      const entries: ActivityEntry[] = [];
      
      querySnapshot.forEach(doc => {
        const data = doc.data();
        entries.push({
          id: doc.id,
          activityId: data.activityId,
          userId: data.userId,
          date: data.date,
          value: data.value,
          createdAt: data.createdAt?.toDate?.() || new Date(),
        });
      });

      setActivityData(entries);
      setError(false);
    } catch (err) {
      console.error("Firebase error:", err);
      setError(true);
      // Set empty data when there's an error
      setActivityData([]);
    }
  };

  const addEntry = async () => {
    if (!firebaseInitialized || !activityId) {
      setError(true);
      return;
    }
    
    try {
      const today = new Date().toISOString().split('T')[0];
      const entriesRef = collection(db, 'entries');
      
      await addDoc(entriesRef, {
        activityId,
        userId: auth.currentUser?.uid || 'anonymous',
        date: today,
        value: 1,
        createdAt: new Date(),
      });

      loadActivityData(); // Refresh the data
    } catch (err) {
      console.error("Error adding entry:", err);
      setError(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {error ? "Activity Tracker" : activityName || "Loading..."}
          </h2>
          {!error && (
            <button
              onClick={addEntry}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Today's Entry
            </button>
          )}
        </div>
        {error && (
          <div className="mb-4 p-4 bg-yellow-50 text-yellow-700 rounded-md">
            Unable to connect to database. Displaying empty heatmap.
          </div>
        )}
        <div className="mt-4 p-4 border rounded-lg bg-white relative">
          {/* Pass data prop to your custom CalendarHeatmap wrapper component */}
          <CalendarHeatmap data={activityData} />
        </div>
      </div>
    </div>
  );
};

export default HeatmapTracker;