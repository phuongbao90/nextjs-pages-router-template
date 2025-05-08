// import ky from "ky";
import wretch from "wretch";

// export const apiClient = ky.create({
//   prefixUrl: process.env.NEXT_PUBLIC_API_URL || "",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   hooks: {
//     beforeRequest: [(request, options) => {}],
//     afterResponse: [
//       (request, options, response) => {
//         const accessTokenHeader = response.headers.get("set-cookie");
//         const accessToken = accessTokenHeader?.startsWith("accessToken=")
//           ? accessTokenHeader?.split("=")[1]
//           : null;
//         const accessTokenOnly = accessToken?.split(";")[0];
//         request.headers.set("Authorization", `Bearer ${accessTokenOnly}`);
//       },
//     ],
//   },
// });

export const apiClient = wretch(process.env.NEXT_PUBLIC_API_URL || "")
  .headers({
    "Content-Type": "application/json",
  })
  // .options({
  //   credentials: "include",
  // })
  .catcher(401, (error) => {
    // Handle unauthorized access
    console.error("Unauthorized access:", error);
    // You might want to redirect to login page or refresh token here
    // refreshToken();

    throw new Error("Unauthorized access. Please login again.");
  })
  .catcher(403, (error) => {
    // Handle forbidden access
    console.error("Forbidden access:", error);
    throw new Error("You don't have permission to access this resource.");
  })
  .catcher(404, (error) => {
    // Handle not found
    console.error("Resource not found:", error);
    throw new Error("The requested resource was not found.");
  })
  .catcher(422, (error) => {
    // Handle validation errors
    console.error("Validation error:", error);
    throw new Error("Invalid data provided. Please check your input.");
  })
  .catcher(429, (error) => {
    // Handle rate limiting
    console.error("Rate limit exceeded:", error);
    throw new Error("Too many requests. Please try again later.");
  })
  .catcher(500, (error) => {
    // Handle server errors
    console.error("Server error:", error);
    throw new Error("An unexpected error occurred. Please try again later.");
  })
  .catcher(503, (error) => {
    // Handle service unavailable
    console.error("Service unavailable:", error);
    throw new Error(
      "The service is currently unavailable. Please try again later."
    );
  })
  .catcher(0, (error) => {
    // Handle network errors
    console.error("Network error:", error);
    throw new Error("Network error. Please check your internet connection.");
  });
