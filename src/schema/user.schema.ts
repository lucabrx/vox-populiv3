import { TypeOf, z } from "zod"

export const UserRegisterSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password needs to be 6 character long"),
    passwordConfirmation: z.string({
        required_error: "passwordConfirmation is required",
      }),
    name: z.string().min(2, "Minimal 2 character long").max(100, "Maximal 100 character long"),
}).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
});
export type UserRegisterType = TypeOf<typeof UserRegisterSchema>



export const UserLoginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password needs to be 6 character long"),
})
export type UserLoginType = TypeOf<typeof UserLoginSchema>

export const UserChangePaswordSchema = z.object({
    oldPassword: z.string().min(6, "Password needs to be 6 character long"),
    newPassword: z.string().min(6, "Password needs to be 6 character long"),
    userId: z.string(),
})
export type UserChangePaswordType = TypeOf<typeof UserChangePaswordSchema>

export const EditUserSchema = z.object({
    userId: z.string(),
    name: z.string().min(2, "Minimal 2 character long").max(100, "Maximal 100 character long"),
    bio: z.any().optional(),
    page: z.any().optional(),
})

export type EditUserType = TypeOf<typeof EditUserSchema>