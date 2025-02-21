import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { db, auth } from '../services/firebase';
import Heatmap from './Heatmap';
import { ActivityEntry } from '../types';

const HeatmapTracker: React.FC = () => {
  const { activityId } = useParams<{ activityId: string }>();
  const [activityData, setActivityData] = useState<ActivityEntry[]>([]);
  const [activityName, setActivityName] = useState<string>('');

  useEffect(() => {
    loadActivityData();
  }, [activityId]);

  const loadActivityData = async () => {
    // Load activity details
    const activityDoc = await getDocs(query(collection(db, 'activities'), where('id', '==', activityId)));
    if (!activityDoc.empty) {
      const activity = activityDoc.docs[0].data();
      setActivityName(activity.name);
    }

    // Load activity entries
    const entriesQuery = query(
      collection(db, 'entries'),
      where('activityId', '==', activityId)
    );

    const querySnapshot = await getDocs(entriesQuery);
    const entries: ActivityEntry[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      activityId: doc.data().activityId,
      userId: doc.data().userId,
      date: doc.data().date,
      value: doc.data().value,
      createdAt: doc.data().createdAt.toDate(),
    }));

    setActivityData(entries);
  };

  const addEntry = async () => {
    const today = new Date().toISOString().split('T')[0];

    await addDoc(collection(db, 'entries'), {
      activityId,
      userId: auth.currentUser?.uid,
      date: today,
      value: 1,
      createdAt: new Date(),
    });

    loadActivityData(); // Refresh the data
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{activityName}</h2>
          <button
            onClick={addEntry}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Today's Entry
          </button>
        </div>
        <div className="mt-4">
          <Heatmap data={activityData} />
        </div>
      </div>
    </div>
  );
};

export default HeatmapTracker;
