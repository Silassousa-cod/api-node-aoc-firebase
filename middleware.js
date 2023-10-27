export const isAuthenticated = (req, res, next) => {
    const idToken = req.headers.authorization;
  
    admin.auth().verifyIdToken(idToken)
      .then(decodedToken => {
        req.user = decodedToken;
        if (req.user.admin) {
          req.isAdmin = true;
        } else {
          req.isAdmin = false;
        }
        next();
      })
      .catch(error => {
        res.status(403).json({ error: 'Não autorizado' });
      });
  };

  