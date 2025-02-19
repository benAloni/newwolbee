import { useQuery } from "@tanstack/react-query";
import { fetchTeams } from "../api/teams.js";

export const useGetTeamsQuery = () => 
  useQuery({
    queryKey: ["teams"],
    queryFn: async () => fetchTeams(),
    staleTime: 20000,
  })
