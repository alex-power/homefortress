import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { getRepository } from "typeorm"
import { User } from "../entity/User"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

interface DecodedToken {
  userId: number
  username: string
  isAdmin: boolean
  iat: number
  exp: number
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number
        username: string
        isAdmin: boolean
      }
    }
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header missing" })
    }

    const token = authHeader.split(" ")[1]

    if (!token) {
      return res.status(401).json({ error: "Token missing" })
    }

    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken

    // Verify the user exists in the database
    const userRepository = getRepository(User)
    const user = await userRepository.findOne(decoded.userId)

    if (!user) {
      return res.status(401).json({ error: "User not found" })
    }

    // Attach user to request
    req.user = {
      userId: decoded.userId,
      username: decoded.username,
      isAdmin: decoded.isAdmin,
    }

    next()
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Invalid token" })
    }

    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: "Token expired" })
    }

    console.error("Auth middleware error:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
}

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ error: "Admin access required" })
  }

  next()
}

