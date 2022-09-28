import Post from "./post.interface";
import PostModel from "./post.model";

class PostService {
    private post = PostModel;

    public async create(title: string, body: string): Promise<Post> {
        try {
            const post = await this.post.create({ title, body });
            return post;
        } catch (err) {
            throw new Error('Unable to create post');
        }
    }
}

export default PostService;
