import dotenv from 'dotenv';
dotenv.config();

export const env =  {
 PORT : process.env.PORT,
 CONNECTION_STRING : String(process.env.CONNECTION_STRING),
 SECRET_KEY:process.env.SECRET_KEY,
 JWT_TTL:process.env.JWT_TTL,
 REFRESH_TOKEN_TTL:process.env. REFRESH_TOKEN_TTL
}



