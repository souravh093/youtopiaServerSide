import prisma from "../DB/db.config.js";

export const createRole = async (req, res) => {
  try {
    const { roleName, features } = req.body;

    // Create AdminRole
    const adminRole = await prisma.adminRole.create({
      data: {
        roleName,
        AdminFeatures: {
          create: features.map((feature) => ({
            featuresName: feature.featuresName,
            AdminSubFeatures: {
              create: feature.subFeatures.map((subFeature) => ({
                subFeaturesName: subFeature,
              })),
            },
          })),
        },
      },
      include: {
        AdminFeatures: {
          include: {
            AdminSubFeatures: true,
          },
        },
      },
    });

    res.json({ success: true, adminRole });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
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
