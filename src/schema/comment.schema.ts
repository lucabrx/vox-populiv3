import { z, TypeOf } from "zod";

export const deleteCommentSchema = z.object({
    commentId: z.string(),
    userId: z.string(),
});
export type deleteCommentType = TypeOf<typeof deleteCommentSchema>;

export const createCommentSchema = z.object({
    blogId: z.string(),
    body: z.string(),
});
export type createCommentType = TypeOf<typeof createCommentSchema>;

export const updateCommentSchema = z.object({
    commentId: z.string(),
    body: z.string(),
    userId: z.string(),
});
export type  updateCommentType = TypeOf<typeof updateCommentSchema>;