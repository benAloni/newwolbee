import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchHolidaysDetailsOptions } from '../../../../../../../services';


function HolidayOptionsDetails({ selectedOptionData }) {
    
    const { data: optionsDetails, isLoading } = useQuery({
          queryKey: ['optionsDetails'],
          queryFn: fetchHolidaysDetailsOptions,
          staleTime: 1000 * 60 * 5, // Cache for 5 minutes
          refetchOnWindowFocus: false, // Prevent refetching when window refocuses
        });
      

  if (isLoading) return <p>Loading...</p>;

  const selectedData = optionsDetails?.find(item => item.optionName === selectedOptionData.key);

  return (
    <div>

      {/* Check if we found a matching selectedOptionData */}
        <div>
          <h3>Selected Option Details:</h3>
          <p><strong>{selectedData.title}</strong> {selectedData.content}</p>
        </div>
     
    </div>
  );
}
export default HolidayOptionsDetails