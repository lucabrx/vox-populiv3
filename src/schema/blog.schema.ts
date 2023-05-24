import {z, TypeOf} from "zod";


export const CreateBlogSchema = z.object({
    id: z.string(),
    title: 
    z.string()
    .min(25, "Minimal 25 characters long")
    .max(38, "Max 38 characters long")
    ,
    description: 
    z.string()
    .min(98, "Minimal 98 characters long")
    .max(188, "Max 188 characters long"),
    body : 
    z.string()
    .min(300, "Minimal 100 characters long"),
 })
export type CreateBlogType = TypeOf<typeof CreateBlogSchema>

export const EditBLogSchema = z.object({
    title: 
    z.string()
    .min(10, "Minimal 10 characters long")
    .optional(),
    description: 
    z.string()
    .min(100, "Minimal 100 characters long")
    .max(188, "Max 188 characters long").optional(),
    body  : 
    z.string()
    .min(300, "Minimal 100 characters long")
    .optional(),
})
export type EditBlogType = TypeOf<typeof EditBLogSchema>