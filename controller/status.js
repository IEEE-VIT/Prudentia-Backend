const Deadline = require("../models/deadlinesModel");

const statusController = {
  getstatus: async (req, res) => {
    try {
      const deadlines = await Deadline.findAll();

      const currentDate = new Date();

      const roundStatus = deadlines.map((deadline) => {
        const { round, end_date, end_time } = deadline.dataValues;

        const endDateTime = new Date(`${end_date} ${end_time}`);

        let status;
        if (currentDate > endDateTime) {
          status = "Round ended";
        } else if (currentDate.getTime() === endDateTime.getTime()) {
          status = "Round ending soon";
        } else {
          status = "Round ongoing";
        }

        return { round, status };
      });

      res.json({ roundStatus });
    } catch (error) {
      console.error("Error fetching status:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = statusController;
