import User from "../models/User.js";

export const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    return res.status(201).json({
      data: user,
      message: "Successfully created User",
      success: true,
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: {},
      message: "Couldn't create User",
      success: false,
      err: { error },
    });
  }
};

export const LoginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(500).json({
        data: {},
        message: "user doesnt exist password",
        success: false,
        err: { error },
      });
    } else if (user.password === req.body.password) {
      return res.status(201).json({
        id:user.id,
        name:user.name,
        addresses:user.addresses,
        data: user,
        message: "Successfully found User",
        success: true,
        err: {},
      });
    } else {
      res.status(500).json({
        data: {},
        message: "wrong password",
        success: false,
        err: { error },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: {},
      message: "Couldn't find User",
      success: false,
      err: { error },
    });
  }
};
