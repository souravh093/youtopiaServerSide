import prisma from "../DB/db.config.js";

export const createAdvertisement = async (req, res) => {
  try {
    const { primary1, primary2, secondary1, secondary2, tertiary1, tertiary2 } =
      req.body;

    const newAdvertisement = await prisma.advertisement.create({
      data: {
        primary1,
        primary2,
        secondary1,
        secondary2,
        tertiary1,
        tertiary2,
      },
    });

    return res.json({
      status: 200,
      data: newAdvertisement,
      message: "Advertisement Created",
    });
  } catch {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

// find advertisement by id
export const getAdvertisementById = async (req, res) => {
  const id = req.params.id;

  try {
    const findAdvertisement = await prisma.advertisement.findUnique({
      where: {
        id: id,
      },
    });

    if (!findAdvertisement) {
      return res.status(404).json({
        status: 404,
        message: "Advertisement Not Found",
      });
    }

    return res.json({
      status: 200,
      data: findAdvertisement,
      message: "Advertisement Found",
    });
  } catch {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

// update advertisement by id
export const updateAdvertisementById = async (req, res) => {
  const id = req.params.id;
  const { primary1, primary2, secondary1, secondary2, tertiary1, tertiary2 } =
    req.body;

  try {
    const updateAdvertisement = await prisma.advertisement.update({
      where: {
        id: id,
      },
      data: {
        primary1,
        primary2,
        secondary1,
        secondary2,
        tertiary1,
        tertiary2,
      },
    });

    return res.json({
      status: 200,
      data: updateAdvertisement,
      message: "Advertisement Updated",
    });
  } catch {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

// delete advertisement by id
export const deleteAdvertisementById = async (req, res) => {
  const id = req.params.id;

  try {
    const deleteAdvertisement = await prisma.advertisement.delete({
      where: {
        id: id,
      },
    });

    return res.json({
      status: 200,
      data: deleteAdvertisement,
      message: "Advertisement Deleted",
    });
  } catch {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};
