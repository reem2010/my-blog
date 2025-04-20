export default function validate(schema) {
  return (req, res, next) => {
    try {
      const { error } = schema.validate(req.body);
      if (!error) {
        next();
      } else {
        return res.status(400).json({ error: error.details[0].message });
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };
}
