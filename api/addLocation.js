// import { db } from "../components/config";
// import { ref, set, update, onValue, remove, get } from "firebase/database"


// export const create = (location, city) => {
//     set(ref(db, "location/" + location), {
//         city: city
//     }).then(() => {
//         console.log("submitted")
//     })
// }

// export const readFile = async (dataLocation) => {
//     try {
//         const snapshot = await get(ref(db, "location"));
//         const data = snapshot.val();
//         dataLocation = data;
//         console.log("Data:", data);
//     } catch (error) {
//         console.error("Error reading data:", error);
//     }
// };


// export const deleteData = (location, city) => { // Replace with actual path
//     remove(ref(db, "location/" + location + "/" + city))
//         .then(() => console.log("Value deleted successfully"))
//         .catch((error) => console.error("Error deleting value:", error));
// }

