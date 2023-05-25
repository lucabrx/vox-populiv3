import {z, TypeOf} from 'zod';

export const CreateStorySchema = z.object({
    id: z.string(),
    title: 
    z.string()
    .min(25, "Minimal 25 characters long")
    .max(38, "Max 38 characters long")
    ,
    category:
    z.enum(["World", "Sport", "Tech", "Lifestyle"])
    ,
    description: 
    z.string()
    .min(98, "Minimal 98 characters long")
    .max(188, "Max 188 characters long"),
    body : 
    z.string()
    .min(300, "Minimal 100 characters long"),
 })
export type CreateStoryType = TypeOf<typeof CreateStorySchema>

export const EditStorySchema = z.object({
    title: 
    z.string()
    .min(25, "Minimal 25 characters long")
    .max(38, "Max 38 characters long")
    .optional()
    ,
    category:
    z.string()
    .optional()
    ,
    description: 
    z.string()
    .min(98, "Minimal 98 characters long")
    .max(188, "Max 188 characters long")
    .optional(),
    body : 
    z.string()
    .min(300, "Minimal 100 characters long")
    .optional()
 })
export type EditStoryType = TypeOf<typeof EditStorySchema>

