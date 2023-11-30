const cloudinary = require("../utils/cloudinary");
const Post = require("../models/postModel");
const ErrorResponse = require("../utils/errorResponse");

//Crear post
exports.createPost = async (req, res, next) => {
  const { title, content, postedBy, likes, comments } = req.body;

  try {
    //Cargar imagen en Cloudinary
    const result = await cloudinary.uploader.upload(image, {
      folder: "posts",
      width: 1200,
      crop: "scale",
    });
    const post = await Post.create({
      title,
      content,
      postedBy: req.user._id,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });
    res.status(201).json({
      success: true,
      post,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Mostrar Posts
exports.showPost = async (req, res, next) => {
  try {
    const post = await Post.find()
      .sort({ createdAt: -1 })
      .populate("postedBy", "name");
    res.status(201).json({
      success: true,
      post,
    });
  } catch (error) {
    next(error);
  }
};

// Mostrar post individual
exports.showSinglePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "comments.postedBy",
      "name"
    );
    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    next(error);
  }
};

// Eliminar post
exports.deletePost = async (req, res, next) => {
  const currentPost = await Post.findById(req.params.id);

  //Eliminar la imagen de la publicación en cloudinary
  const ImgId = currentPost.image.public_id;
  if (ImgId) {
    await cloudinary.uploader.destroy(ImgId);
  }

  try {
    const post = await Post.findByIdAndRemove(req.params.id);
    res.status(200).json({
      success: true,
      message: "post eliminado",
    });
  } catch (error) {
    next(error);
  }
};

// Actualizar post
exports.updatePost = async (req, res, next) => {
  try {
    const { title, content, image } = req.body;
    const currentPost = await Post.findById(req.params.id);

    //Construcción de los datos del objeto
    const data = {
      title: title || currentPost.title,
      content: content || currentPost.content,
      image: image || currentPost.image,
    };

    //Modificar la imagen de publicación condicionalmente
    if (req.body.image !== "") {
      const ImgId = currentPost.image.public_id;
      if (ImgId) {
        await cloudinary.uploader.destroy(ImgId);
      }

      const newImage = await cloudinary.uploader.upload(req.body.image, {
        folder: "posts",
        width: 1200,
        crop: "scale",
      });

      data.image = {
        public_id: newImage.public_id,
        url: newImage.secure_url,
      };
    }

    const postUpdate = await Post.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });

    res.status(200).json({
      success: true,
      postUpdate,
    });
  } catch (error) {
    next(error);
  }
};

//Agregar comentario
exports.addComment = async (req, res, next) => {
  const { comment } = req.body;
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $push: { comments: { text: comment, postedBy: req.user._id } },
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    next(error);
  }
};

//Agregar like
exports.addLike = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likes: req.user._id },
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    next(error);
  }
};

//Eliminar like
exports.removeLike = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likes: req.user._id },
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    next(error);
  }
};
