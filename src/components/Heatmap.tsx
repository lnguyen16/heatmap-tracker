import React, { useEffect, useRef } from 'react';
import CalHeatmap from 'cal-heatmap';
import 'cal-heatmap/dist/cal-heatmap.css';
import { ActivityEntry } from '../types';

const Heatmap: React.FC<{ data: ActivityEntry[] }> = ({ data }) => {
  const calendarRef = useRef<HTMLDivElement>(null);
  const heatmapInstance = useRef<CalHeatmap | null>(null);

  useEffect(() => {
    if (!heatmapInstance.current) {
      heatmapInstance.current = new CalHeatmap();
    }

    const formattedData = data.reduce((acc, entry) => {
      acc[entry.date] = (acc[entry.date] || 0) + entry.value; // Assuming value is the count for that date
      return acc;
    }, {} as Record<string, number>);

    heatmapInstance.current.paint({
      data: {
        source: formattedData,
      },
      range: 12,
      domain: {
        type: 'month',
      },
      subDomain: {
        type: 'day',
      },
      itemSelector: calendarRef.current,
    });

    return () => {
      heatmapInstance.current?.destroy();
    };
  }, [data]);

  return <div ref={calendarRef} className="cal-heatmap" />;
};

export default Heatmap;