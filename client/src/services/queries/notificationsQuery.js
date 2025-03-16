import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchNotifications } from "../api/notifications";
import { fetchEmployee } from "../api/employees";
import { userProfile } from "../../imgs";

export const useGetNotificationsQuery = (numOfDaysPrior) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["notifications", numOfDaysPrior],
    queryFn: async () => {
      const notifications = await fetchNotifications(numOfDaysPrior);
      const notificationsArray = await Promise.all(
        notifications?.map(async (notification) => {
          const employee = await fetchEmployee(notification.employeeId);
          return {
            ...notification,
            imageUrl: employee.imageUrl || userProfile,
          };
        })
      );
// console.log(notificationsArray);

      return notificationsArray;
    },
  });
};
