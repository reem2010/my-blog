export default function validate(schema) {
  return (req, res, next) => {
    try {
      const { error } = schema.validate(req.body);
      if (!error) {
        next();
      } else {
        console.log(error.details);
        return res.status(400).json({ error: "Invalide data" });
      }
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };
}
