import prisma from "../DB/db.config.js";

export const createComment = async (req, res) => {
  try {
    const { customerId, adminUserId, newsId, comment, videoNewsId } = req.body;

    const newComment = await prisma.comment.create({
      data: {
        customerId,
        adminUserId,
        newsId,
        comment,
        videoNewsId,
      },
    });

    return res.json({
      status: 200,
      data: newComment,
      message: "Comment Created",
    });
  } catch (error) {
    console.error("Error creating comment:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};


 
