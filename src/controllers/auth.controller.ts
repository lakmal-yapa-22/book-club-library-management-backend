import {NextFunction, Request, Response} from "express";
import bcrypt from "bcrypt";
import {UserModel} from "../models/user";
import jwt, {JsonWebTokenError, JwtPayload, TokenExpiredError} from "jsonwebtoken";
import {ApiError} from "../errors/apiError";
import {Error} from "mongoose";


const createAccessToken = (userId:string) => {

    return jwt.sign(
        {userId},
        process.env.ACCESS_TOKEN_SECRET!,
        {expiresIn: "1h"}
    )
}


const createRefreshToken = (userId:string) => {

    return jwt.sign(
        {userId},
        process.env.REFRESH_TOKEN_SECRET!,
        {expiresIn: "7d"}
    )
}


export const signUpUser = async(req:Request, res:Response,next:NextFunction) => {

    try{
        const{firstName, lastName, email, password,role} = req.body
        const SALT = 10
        const hashedPassword = await bcrypt.hash(password,SALT)
        const  user = new UserModel({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            role
        })
        await user.save();

        const userWithoutPassword = {
            _id:user._id,
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email
        }
        res.status(200).json(userWithoutPassword);

    }catch(err){

        next(err)
    }

}


export const loginUser = async(req:Request,res:Response,next:NextFunction) =>{

    try{
        const{email,password} = req.body
        const user = await UserModel.findOne({email})

        if(!user){
            throw  new ApiError(404,"User not found")
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            throw new ApiError(401,"Invalid email or password!")
        }

        const accessToken = createAccessToken(user._id.toString())
        const refreshToken = createRefreshToken(user._id.toString())

        const isProduction =  process.env.NODE_ENV === "production"

        res.cookie("refreshToken",refreshToken, {
            httpOnly: true,
            secure:isProduction,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/api/auth/refresh-token"
        })

        const userWithoutPassword = {
            _id:user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            accessToken
        }

        res.status(200).json(userWithoutPassword);

    }catch(err){
        next(err)
    }
}




export const refreshToken = async (req:Request, res:Response,next:NextFunction) => {


    try{
        const token = req.cookies?.refreshToken

        if(!token){
            throw new ApiError(401,"Refresh token missing")
        }

        jwt.verify(
            token,
            process.env.REFRESH_TOKEN_SECRET!,

            async (
                error: Error | null,
                decoded: string | JwtPayload | undefined
            ) =>{

                if(error){
                    if(error instanceof TokenExpiredError){
                        return next(new ApiError(401,"Refresh token expired"))
                    }else if(error instanceof JsonWebTokenError){
                        return next(new ApiError(401,"Invalid refresh token"))
                    }else{
                        return next(new ApiError(401,"Error verifying refresh token"))
                    }
                }
                if(!decoded || typeof decoded === "string"){
                    return next(new ApiError(401,"Refresh token payload invalid"))
                }

                const userId = decoded.userId as string
                const user = await UserModel.findById(userId)

                if(!user){
                    return  next (new ApiError(401,"User not found"))
                }

                const newAccessToken = createAccessToken(user._id.toString())
                res.status(200).json({accessToken:newAccessToken})
            }
        )


    }catch(err){
        next(err)
    }


}