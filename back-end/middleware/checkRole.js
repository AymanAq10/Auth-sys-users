// middleware/checkRole.js
module.exports = (role) => {
  return (req, res, next) => {
    const userRole = req.user.role; // Assuming you store the user's role in the request object
    console.log(userRole)
    if (userRole === role) {
      next(); // User has the required role, allow access
    } else {
      res.status(403).json({ error: 'Access denied' }); // User does not have the required role, deny access
    }
  };
};

