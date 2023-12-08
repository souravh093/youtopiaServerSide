import prisma from "../DB/db.config.js";

export const createAdvertisement = async (req, res) => {
  try {
    const { verticalAds, squireAds, miniSidebarAds } = req.body;
    const advertisement = await prisma.advertisement.create({
      data: {
        verticalAds,
        squireAds,
        miniSidebarAds,
      },
    });

    res
      .status(200)
      .json({
        success: true,
        data: advertisement,
        message: "Advertisement Created Successfully",
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
