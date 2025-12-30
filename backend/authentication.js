//check if user is logged in
export function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next(); // proceed if logged in
    }
    return res.status(401).json({ message: "Unauthorized" });
}
