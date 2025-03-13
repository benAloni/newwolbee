
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { auth } from '../../firebase/firebaseConfig';

const useUpdateEvent = (eventType) => {
  const updateEventMutation = useMutation({
    mutationFn: async (eventData) => {
      const token = await auth.currentUser.getIdToken();
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URI}/employee/create-marriage-event`,  
        eventData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      console.log(`${eventType} updated successfully`);
    },
    onError: (error) => {
      console.error(`Error updating ${eventType}:`, error);
    },
  });

  return updateEventMutation;
};


// Vacation Event
const useUpdateVacation = () => {
  const addVacationForEmployeeMutation = useMutation({
    mutationFn: async (vacationData) => {
      const token = await auth.currentUser.getIdToken();
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URI}/employee/create-vacation`,
        vacationData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      console.log('Vacation added successfully');
    },
    onError: (error) => {
      console.error('Error adding Vacation:', error);
    },
  });

  const updateVacation = async (selectedEmployee, selectedPurpose, selectedCountry, selectedStartDate, selectedEndDate) => {
    const vacation = {
      id: selectedEmployee.id,
      purposeOfTrip: selectedPurpose,
      destination: selectedCountry?.value,
      startDate: selectedStartDate ? selectedStartDate.toISOString() : "",  
      endDate: selectedEndDate ? selectedEndDate.toISOString() : "",    
    };
        
    await addVacationForEmployeeMutation.mutateAsync(vacation);
  };

  return { addVacationForEmployeeMutation, updateVacation };
};




// Sick Day Event
// const useUpdateSickDay = () => {
//   const updateSickDayMutation = useUpdateEvent('SickLeave');

//   const updateSickDay = async (selectedEmployee, selectedStartDate, selectedEndDate) => {
//     const formattedStartDate = new Date(selectedStartDate);
//     const formattedEndDate = new Date(selectedEndDate);

//     const startDateString = `${formattedStartDate.getFullYear()}-${(formattedStartDate.getMonth() + 1).toString().padStart(2, '0')}-${formattedStartDate.getDate().toString().padStart(2, '0')}`;
//     const endDateString = `${formattedEndDate.getFullYear()}-${(formattedEndDate.getMonth() + 1).toString().padStart(2, '0')}-${formattedEndDate.getDate().toString().padStart(2, '0')}`;

//     const sickDayData = {
//       id: selectedEmployee.id,
//       startDate: startDateString,
//       endDate: endDateString,
//     };

//     await updateSickDayMutation.mutateAsync(sickDayData);
//   };

//   return { updateSickDayMutation, updateSickDay };
// };

const useUpdateSickDay = () => {
  const updateSickDayMutation = useMutation({
    mutationFn: async (sickDayData) => {
      const token = await auth.currentUser.getIdToken();
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URI}/employee/create-sick-leave`,
        sickDayData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      console.log('sickDay added successfully');
    },
    onError: (error) => {
      console.error('Error adding sickDay:', error);
    },
  });

  const updateSickDay = async (selectedEmployee, selectedStartDate, selectedEndDate) => {
    const sickDay = {
      id: selectedEmployee.id,
      startDate: selectedStartDate ? selectedStartDate.toISOString() : "",  
      endDate: selectedEndDate ? selectedEndDate.toISOString() : "",    
    };
        
    await updateSickDayMutation.mutateAsync(sickDay);
  };

  return { updateSickDayMutation, updateSickDay };
};

// Son Event (Handle Sick Day)
const useAddEventForSon = () => {
  const addEventForSonMutation = useMutation({
    mutationFn: async (sonEventData) => {
      const token = await auth.currentUser.getIdToken();
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URI}/addSonEvents`,
        sonEventData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      console.log('Sick day for son added successfully');
    },
    onError: (error) => {
      console.error('Error adding sick day for son:', error);
    },
  });

  const addEventForSon = async (selectedSon, startDate, endDate, selectedEmployee, eventType) => {
    const sonEvents = {
      id: selectedEmployee._id,
      childName: selectedSon.name,
      startDate,
      endDate,
      eventType,
    };
    await addEventForSonMutation.mutateAsync(sonEvents);
  };

  return { addEventForSonMutation, addEventForSon };
};

export { useUpdateVacation, useUpdateSickDay, useAddEventForSon,useUpdateEvent };
