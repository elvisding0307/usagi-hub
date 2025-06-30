import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "usagihub-secret-key";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("admin-token")?.value;

    if (!token) {
      return NextResponse.json({ error: "未登录" }, { status: 401 });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;

      return NextResponse.json({
        success: true,
        data: {
          user: {
            id: decoded.id,
            username: decoded.username,
            email: decoded.email,
            role: decoded.role,
            name: decoded.name,
          },
        },
      });
    } catch (jwtError) {
      return NextResponse.json({ error: "Token 无效" }, { status: 401 });
    }
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json({ error: "服务器内部错误" }, { status: 500 });
  }
}
