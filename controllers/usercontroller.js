var db = require("../model");
var User = db.user;
var contact = db.contact;
var mobile = db.mobile;
var mobileusers = db.mobileusers;

// var adduser = async (req, res) => {
//   const jane = await User.create({ firstName: "JAWADD" }); //instead of create we can use build but we have to save jane.save()
//   console.log(jane instanceof User);
//   console.log(`this is the name `, jane.firstName);
//   console.log(jane.toJSON());
//   res.status(200).json(jane.toJSON());
// };

var showusers = async (req, res) => {
  const data = await User.findAll({});
  res.status(200).json(data);
};

var user = async (req, res) => {
  const data = await User.findOne({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json(data);
};

var adduser_by_rawdata = async (req, res) => {
  const get_data = req.body;
  if (get_data.length > 1) {
    var create = await User.bulkCreate(get_data);
  } else {
    var create = await User.create(get_data);
  }
  res.status(200).json(`data which is inserted in to the database   `);
};
var delete_user = async (req, res) => {
  const data = await User.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json(`the USER WITH ID :${req.params.id} is deleted`);
};
var patch_user = async (req, res) => {
  const update_data = req.body;
  console.log(update_data, req.params.id);
  const data = await User.update(update_data, {
    where: {
      id: req.params.id,
    },
  });
  res
    .status(200)
    .json(`data is patched successfuly with id : ${req.params.id}`);
};

var addSingleUser = async (req, res) => {
  try {
    const { firstName, lastName, contactData, mobileid } = req.body;
    const user = await User.create({ firstName, lastName });

    if (contactData) {
      await contact.create({
        ...contactData,
        userId: user.id,
      });
    }

    // if (mobileData) {
    //   const mobiles = await mobile.bulkCreate(mobileData);
    //   for (const mobile of mobiles) {
    //     await user.addMobile(mobile);
    //   }
    // }
    if (mobileid) {
      if (mobileid.length > 1) {
        for (const id of mobileid) {
          const mobilee = await mobile.findByPk(id);
          if (mobilee) {
            console.log(`Mobile with ID ${id} exists.`);
            user.addMobile(id);
          }
        }
      } else {
        const mobilee = await mobile.findByPk(id);
        if (mobilee) {
          console.log(`Mobile with ID ${mobileid} exists.`);
          user.addMobile(id);
        }
      }
    }
    res.status(200).json({
      message: "User and related data inserted successfully!",
      user,
    });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "An error occurred while inserting data." });
  }
};

var getUserDetails = async (req, res) => {
  try {
    const userId = req.params.id;

    const userDetails = await User.findOne({
      where: { id: userId },
      include: [
        {
          model: contact,
          attributes: ["permanent_add", "current_add"],
        },
        {
          model: mobile,
          attributes: ["mobileName"],
          through: { attributes: [] },
        },
      ],
    });

    if (!userDetails) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User details fetched successfully", userDetails });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching user details." });
  }
};

var updatemobile = async (req, res) => {
  try {
    const userId = req.params.id;
    const { mobileid } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (mobileid) {
      const mobiles = await mobile.findAll({
        where: { id: mobileid },
      });

      if (mobiles.length !== mobileid.length) {
        return res
          .status(400)
          .json({ message: "One or more provided mobile IDs are invalid" });
      }

      await user.setMobiles(mobileid);
    }

    res.status(200).json({
      message: "User mobile details updated successfully",
      userId,
      updatedMobileIds: mobileid,
    });
  } catch (error) {
    console.error("Error updating mobile details:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating user mobile details." });
  }
};

//     if (mobileid) {
//       if (mobileid.length > 1) {
//         for (const id of mobileid) {
//           const mobilee = await mobile.findByPk(id);
//           if (mobilee) {
//             console.log(`Mobile with ID ${id} exists.`);
//             user.addMobile(id);
//           }
//         }
//       }
//     }

//     res.status(200).json({
//       message: "User mobile details updated successfully",
//       userDetails,
//     });
//   } catch (error) {
//     console.error("Error updating mobile details:", error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while updating user mobile." });
//   }
// };

module.exports = {
  //   adduser,
  showusers,
  user,
  adduser_by_rawdata,
  delete_user,
  patch_user,
  addSingleUser,
  getUserDetails,
  updatemobile,
};
