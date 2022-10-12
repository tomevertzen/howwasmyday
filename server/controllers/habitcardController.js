const { connectToDb } = require("../configs/db.config");

//Get all habitcard
// const getAllHabitCards = async (req, res) => {
//   db.collection("habitcards")
//     .find({})
//     .toArray((err, habitcards) => {
//       res.json(habitcards);
//     });
// };

// //Get habitcard by id
// const getHabitCardById = async (req, res) => {
//   const id = req.params.id;
//   await database
//     .collection("habitcards")
//     .findOne({ _id: id }, (err, habitcard) => {
//       res.json(habitcard);
//     });
// };

//Create habitcard
const createHabitCard = async (req, res) => {
  const habitcard = req.body;
  try {
    let database = await connectToDb();
    let collection = database.collection("habitcards");
    collection.insertOne(habitcard, (err, result) => {
      res.json("It all worked");
    });
  } catch (err) {
    console.log(err);
  }
};

//Update habitcard
// const updateHabitCard = async (req, res) => {
//   const id = req.params.id;
//   const habitcard = req.body;
//   database
//     .collection("habitcards")
//     .updateOne({ _id: id }, { $set: habitcard }, (err, result) => {
//       res.json(result);
//     });
// };

// //Delete habitcard
// const deleteHabitCard = async (req, res) => {
//   const id = req.params.id;
//   database.collection("habitcards").deleteOne({ _id: id }, (err, result) => {
//     res.json(result);
//   });
// };

module.exports = {
  createHabitCard,
};
