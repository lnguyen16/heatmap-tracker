import React from 'react';
import ReactCalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { ActivityEntry } from '../types';
import type { ReactCalendarHeatmapValue, ReactCalendarHeatmapDate, TooltipDataAttrs } from 'react-calendar-heatmap';

// Add custom CSS for styling the heatmap
import './CalendarHeatmap.css';

// Define the data format expected by the calendar heatmap
interface CalendarValue {
  date: string;
  count: number;
}

interface CalendarHeatmapProps {
  data: ActivityEntry[];
}

type CustomTooltipAttrs = {
  'data-tooltip': string;
};

const CalendarHeatmap: React.FC<CalendarHeatmapProps> = ({ data }) => {
  // Calculate start and end dates (last 12 months)
  const getDateRange = () => {
    const today = new Date();
    const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const startDate = new Date(endDate);
    startDate.setMonth(startDate.getMonth() - 11);
    startDate.setDate(1); // Start from the 1st of the month
    return { startDate, endDate };
  };

  const { startDate, endDate } = getDateRange();

  // Format data for the heatmap
  const formatData = (): CalendarValue[] => {
    if (!data || data.length === 0) return [];

    return data.map(entry => ({
      date: entry.date,
      count: entry.value
    }));
  };

  // Function to determine CSS class based on value
  const getClassForValue = (value: any): string => {
    if (!value || value.count === 0) {
      return 'color-empty';
    }
    
    if (value.count === 1) return 'color-scale-1';
    if (value.count === 2) return 'color-scale-2';
    if (value.count === 3) return 'color-scale-3';
    return 'color-scale-4'; // 4 or more
  };

  // Function to format the tooltip title
  const getTitleForValue = (value: any): string => {
    if (!value || !value.date) {
      return 'No activity';
    }
    return `${value.date}: ${value.count} activity${value.count !== 1 ? 'ies' : ''}`;
  };

  // Function to generate tooltip data attributes
  const getTooltipDataAttrs = (value: ReactCalendarHeatmapValue<string> | undefined): { [key: string]: string } => ({
    'data-tooltip': value ? `${value.date}: ${value.count} activity${value.count !== 1 ? 'ies' : ''}` : 'No activity'
  });

  return (
    <div className="calendar-heatmap-container">
      <ReactCalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={formatData()}
        classForValue={getClassForValue}
        titleForValue={getTitleForValue}
        showMonthLabels={true}
        showWeekdayLabels={true}
        monthLabels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
        gutterSize={1}
        // Fix the tooltip attribute type issue by using the correct property name
        tooltipDataAttrs={getTooltipDataAttrs}      />
      
      {(!data || data.length === 0) && (
        <div className="empty-message text-center text-gray-500 mt-4">
          <p>No activity data to display</p>
          <p className="text-sm mt-1">Activity data will appear here when entries are added</p>
        </div>
      )}
    </div>
  );
};

export default CalendarHeatmap;