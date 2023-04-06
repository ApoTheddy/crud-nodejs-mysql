const has_data = (req, res, next) => {
  console.log(!req.body);
  if (!req.body) return res.json({ msg: "No hay nada para actualizar" });
  next();
};

module.exports = has_data;
