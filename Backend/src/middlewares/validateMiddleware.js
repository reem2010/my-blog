export default function validate(schema) {
  return (req, res, next) => {
    try {
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (!error) {
        next();
      } else {
        const errors = {};
        error.details.forEach((err) => {
          errors[err.path[0]] = err.message;
        });
        console.log(error.details);

        return res.status(400).json({ errors });
      }
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };
}
