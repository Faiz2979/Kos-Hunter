

enum Role {
    USER = "user",
    OWNER = "owner",
    ADMIN = "admin"
}

type NormalLogin ={
    email: string;
    password: string;
    phoneNumber?: string;
}
