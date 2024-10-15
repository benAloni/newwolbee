import { getAuth } from "firebase-admin/auth";

// check if user is authenticated
export const isAuthenticated = async (req, res, next) => {
  let { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization key is missing" });
  }
    // console.log(req.headers);
  const idToken = authorization.startsWith("Bearer ")
    ? authorization.slice(7)
    : null;
  if (!idToken) {
    return res.status(401).json({ error: "Bearer token is missing" });
  }
  try {
    const decodedToken = await getAuth().verifyIdToken(idToken); //check if token is valid - authentication(where does the request come from?)   
    req.user = decodedToken; //return the user from firebase in the req - identification(who's making the request)
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    let status = 401;
    let message = "Unauthorized";

    switch (error.code) {
      case "auth/argument-error":
        message = "Invalid token format";
        break;
      case "auth/id-token-expired":
        message = "Token has expired";
        break;
      case "auth/id-token-revoked":
        message = "Token has been revoked";
        break;
      default:
        status = 500;
        message = "Internal server error";
        break;
    }

    return res.status(status).json({ error: message });
  }
};

// validate user role

// export const authorizeRoles = (...roles) => {
//     return (req, res, next) => {
//       if (!roles.includes(req.user?.role || "")) {
//         return next(
//           new Error(
//             `Role: ${req.user?.role} is not allowed to access this resource`,
//             403
//           )
//         );
//       }
//       next();
//     };
//   };

