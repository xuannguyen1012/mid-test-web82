import { createPostDB, updatePostDB, findPostDB} from "../models/post.models.js";

export const createPost = async(req, res) => {
    const { userId } = req.data
    const { content } = req.body
    try {
        if(!content) throw new Error('content is required')
        const newPost = await createPostDB({
            userId,
            content
        })
        res.status(201).send({
            message: "Create Post success",
            newPost
        })
    } catch (error) {
        res.status(403).send({
            message: error.message
        })
    }
}
export const editPost = async (req, res) => {
    const { userId } = req.data
    const { postId } = req.params
    const { content } = req.body
    try {
        const post = await updatePostDB(
            {
                _id: postId,
                userId
            },
            {
                content,
                updatedAt: Date.now()
            }
        )
        if(!post) throw new Error('This post not exist')
        if(!content) throw new Error('content is required')
        const crrPost = await findPostDB({_id: postId, userId})
        res.status(201).send({
            message: "Edited post success",
            crrPost
        })
    } catch (error) {
        res.status(403).send({
            message: error.message
        })
    }
}