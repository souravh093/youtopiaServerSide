import prisma from "../DB/db.config.js";

export const createRole = async (req, res) => {
  try {
    const { roleName, featuresName, subFeaturesName } = req.body;

    const adminRole = await prisma.adminRole.create({
      data: {
        roleName: roleName,
        AdminFeatures: {
          create: featuresName.map((featureName) => ({
            featuresName: featureName,
            AdminSubFeatures: {
              create: subFeaturesName.map((subFeatureName) => ({
                subFeaturesName: subFeatureName,
              })),
            },
          })),
        },
      },
    });

    return res.json({
      status: 200,
      data: adminRole,
      message: "Role Created",
    });
  } catch (error) {
    console.error("Error creating role:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

// find all role with features and subfeatures
export const getAllRoles = async (req, res) => {
  try {
    const getAllRoles = await prisma.adminRole.findMany({
      include: {
        AdminFeatures: {
          include: {
            AdminSubFeatures: true,
          },
        },
      },
    });

    return res.json({
      status: 200,
      data: getAllRoles,
      message: "All Roles",
    });
  } catch (error) {
    console.error("Error getting all roles:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

// delete all roles
export const deleteAllRoles = async (req, res) => {
  try {
    const deleteAllRoles = await prisma.adminRole.deleteMany();

    return res.json({
      status: 200,
      data: deleteAllRoles,
      message: "All Roles Deleted",
    });
  } catch (error) {
    console.error("Error deleting all roles:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};
