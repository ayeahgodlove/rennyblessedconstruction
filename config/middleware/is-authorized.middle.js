module.exports = function checkRole(roles) {
  return (req, res, next) => {
    if (req.isAuthenticated() && roles.includes(req.user.role)) {
      return next();
    }
    req.flash("error_msg", "You do not have permission to view this resource");
    res.redirect("/login");
  };
};
