import { client } from "../axiosClient/axiosClientApi";

export const fetchTeams = async () => {
    let result
    try {
        const response = await client.get("/teams")
          result = response.data;         
    } catch (error) {
        console.log("Error fetching teams", error);
        
    }
    return result
}
