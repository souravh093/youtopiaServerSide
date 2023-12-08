import prisma from "../DB/db.config.js";

export const createNews = async (req, res) => {
  try {
    const { title, content, thumbnail, category, authorId, adminUserId } =
      req.body;

    if ((authorId && adminUserId) || (!authorId && !adminUserId)) {
      return res
        .status(400)
        .json({ error: "Provide either authorId or adminUserId" });
    }

    const newNews = await prisma.news.create({
      data: {
        title,
        content,
        thumbnail,
        category,
        authorId,
        adminUserId,
      },
    });

    return res.json({
      status: 200,
      data: newNews,
      message: "News Created",
    });
  } catch (error) {
    console.error("Error creating news:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

// find all news
export const getNewsAll = async (req, res) => {
  try {
    const allNews = await prisma.news.findMany({
      skip: 0,
      take: 4,
      include: {
        adminUser: true,
        customer: true,
        Comment: {
          include: {
            adminUser: true,
            customer: true,
          },
        },
      },
    });

    return res.json({
      status: 200,
      data: allNews,
      message: "All News Found",
    });
  } catch (error) {
    console.error("Error finding all news:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

export const getNewsAllWithPagination = async (req, res) => {
  try {
    const takeLimit = req.query.take;
    const skipLimit = req.query.skip;
    const allNews = await prisma.news.findMany({
      skip: +skipLimit,
      take: +takeLimit,
      include: {
        Comment: {
          include: {
            adminUser: true,
            customer: true,
          },
        },
      },
    });

    return res.json({
      status: 200,
      data: allNews,
      message: "All News Found",
    });
  } catch (error) {
    console.error("Error finding all news:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

// news find unique
export const getNewsById = async (req, res) => {
  const id = req.params.id;

  try {
    const findNews = await prisma.news.findUnique({
      where: {
        id: id,
      },
      include: {
        adminUser: true,
        customer: true,
        Comment: {
          include: {
            customer: true,
            adminUser: true,
          },
        },
      },
    });

    if (!findNews) {
      return res.json({
        status: 400,
        message: "News not found. Please enter another id",
      });
    }

    return res.json({
      status: 200,
      data: findNews,
      message: "News Found",
    });
  } catch (error) {
    console.error("Error finding news:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

// news find latest all
export const getAllNews = async (req, res) => {
  try {
    const allNews = await prisma.news.findMany({
      orderBy: {
        created_at: "desc",
      },
    });

    return res.json({
      status: 200,
      data: allNews,
      message: "All News Found",
    });
  } catch (error) {
    console.error("Error finding all news:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

export const getLatestNews = async (req, res) => {
  try {
    const allNews = await prisma.news.findMany({
      orderBy: {
        created_at: "desc",
      },
      take: 4,
      include: {
        adminUser: true,
        customer: true,
      },
    });

    return res.json({
      status: 200,
      data: allNews,
      message: "All News Found",
    });
  } catch (error) {
    console.error("Error finding all news:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

// update news
export const updateNewsById = async (req, res) => {
  const id = req.params.id;
  const { title, content, thumbnail, category } = req.body;

  try {
    const updateNews = await prisma.news.update({
      where: {
        id: id,
      },
      data: {
        title,
        content,
        thumbnail,
        category,
      },
    });

    return res.json({
      status: 200,
      data: updateNews,
      message: "News Updated",
    });
  } catch (error) {
    console.error("Error updating news:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

// delete news
export const deleteNewsById = async (req, res) => {
  const id = req.params.id;

  try {
    const deleteNews = await prisma.news.delete({
      where: {
        id: id,
      },
    });

    return res.json({
      status: 200,
      data: deleteNews,
      message: "News Deleted",
    });
  } catch (error) {
    console.error("Error deleting news:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

export const getSportNews = async (req, res) => {
  try {
    const sportNews = await prisma.news.findMany({
      where: {
        status: "Pending",
      },
    });

    return res.json({
      status: 200,
      data: sportNews,
      message: "Sport News Found",
    });
    console.log(sportNews)
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

// news find all by category
export const getNewsByCategory = async (req, res) => {
  const category = req.params.category;
  const id = req.params.id;

  try {
    const findNews = await prisma.news.findMany({
      where: {
        category: category,
        NOT: {
          id: id,
        },
      },
      include: {
        adminUser: true,
        customer: true,
        Comment: {
          include: {
            customer: true,
            adminUser: true,
          },
        },
      },
      take: 3,
    });

    if (!findNews) {
      return res.json({
        status: 400,
        message: "News not found. Please enter another id",
      });
    }

    return res.json({
      status: 200,
      data: findNews,
      message: "News Found",
    });
  } catch (error) {
    console.error("Error finding news:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};
