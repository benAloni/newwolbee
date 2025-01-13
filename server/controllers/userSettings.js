import UserModel from "../models/UserModel.js";

export const saveUserImageUrl = async (req, res) => {
  const { user } = req;
  const { imageUrl } = req.body;
  try {
    if (!user || !user.uid) {
      return res.status(400).json({ error: "User not found or unauthorized" });
    }
    if (!imageUrl) {
      return res.status(400).json({ error: "Image URL is required" });
    }
    const image = await UserModel.findOneAndUpdate(
      { uid: user.uid },
      { imageUrl },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json(image);
  } catch (error) {
    console.error("Error updating user's profile image:", error);
    res.status(500).send("Internal Server Error");
  }
};
