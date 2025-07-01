// utils/validateEmail.js
// import axios from "axios";

//  const validateEmailWithZeroBounce = async (email) => {
//   try {
//     const response = await axios.get("https://api.zerobounce.net/v2/validate", {
//       params: {
//         api_key: process.env.ZEROBOUNCE_API_KEY,
//         email: email,
//         ip_address: "", // optional, can be left empty
//       },
//     });

//     return response.data; // will include `status`, `sub_status`, etc.
//   } catch (error) {
//     console.error("ZeroBounce Error:", error.message);
//     return null;
//   }
// };

// export default validateEmailWithZeroBounce;