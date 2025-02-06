
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { auth } from '../../../../firebase/firebaseConfig';

const useUpdateEvent = (eventType) => {
  const updateEventMutation = useMutation({
    mutationFn: async (eventData) => {
      const token = await auth.currentUser.getIdToken();
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URI}/updateEmployeeEvent`,  // Make sure this is correct
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
  const updateVacationMutation = useUpdateEvent('Vacation');

  const updateVacation = async (selectedEmployee, selectedStartDate, selectedEndDate, selectedPurpose, selectedCountry) => {
    const formattedStartDate = new Date(selectedStartDate);
    const formattedEndDate = new Date(selectedEndDate);

    const startDateString = `${formattedStartDate.getFullYear()}-${(formattedStartDate.getMonth() + 1).toString().padStart(2, '0')}-${formattedStartDate.getDate().toString().padStart(2, '0')}`;
    const endDateString = `${formattedEndDate.getFullYear()}-${(formattedEndDate.getMonth() + 1).toString().padStart(2, '0')}-${formattedEndDate.getDate().toString().padStart(2, '0')}`;

    const vacationData = {
      id: selectedEmployee.id,
      purposeOfTrip: selectedPurpose,
      destination: selectedCountry?.value,
      startDate: startDateString,
      endDate: endDateString,
    };

    await updateVacationMutation.mutateAsync(vacationData);
  };

  return { updateVacationMutation, updateVacation };
};

// Sick Day Event
const useUpdateSickDay = () => {
  const updateSickDayMutation = useUpdateEvent('SickLeave');

  const updateSickDay = async (selectedEmployee, selectedStartDate, selectedEndDate) => {
    const formattedStartDate = new Date(selectedStartDate);
    const formattedEndDate = new Date(selectedEndDate);

    const startDateString = `${formattedStartDate.getFullYear()}-${(formattedStartDate.getMonth() + 1).toString().padStart(2, '0')}-${formattedStartDate.getDate().toString().padStart(2, '0')}`;
    const endDateString = `${formattedEndDate.getFullYear()}-${(formattedEndDate.getMonth() + 1).toString().padStart(2, '0')}-${formattedEndDate.getDate().toString().padStart(2, '0')}`;

    const sickDayData = {
      id: selectedEmployee.id,
      startDate: startDateString,
      endDate: endDateString,
    };

    await updateSickDayMutation.mutateAsync(sickDayData);
  };

  return { updateSickDayMutation, updateSickDay };
};

// Son Event (Handle Sick Day)
const useAddSickDayForSon = () => {
  const addSickDayForSonMutation = useMutation({
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

  const addSickDayForSon = async (selectedSon, startDate, endDate, selectedEmployee) => {
    const sonEvents = {
      id: selectedEmployee._id,
      childName: selectedSon.name,
      startDate,
      endDate,
    };
    await addSickDayForSonMutation.mutateAsync(sonEvents);
  };

  return { addSickDayForSonMutation, addSickDayForSon };
};

export { useUpdateVacation, useUpdateSickDay, useAddSickDayForSon,useUpdateEvent };
