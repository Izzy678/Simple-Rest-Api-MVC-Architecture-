export interface CreateUserDto {
    name: string
    password: string
    email: string
    confirmPassword: string
}

export type updateUserProfile = Pick<CreateUserDto,"name"|"email">