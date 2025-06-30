import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// 模拟管理员数据（实际项目中应该从数据库获取）
const adminUsers = [
  {
    id: 1,
    username: "admin",
    email: "admin@usagihub.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password
    role: "super_admin",
    name: "超级管理员",
  },
  {
    id: 2,
    username: "moderator",
    email: "mod@usagihub.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password
    role: "moderator",
    name: "内容管理员",
  },
];

const JWT_SECRET = process.env.JWT_SECRET || "usagihub-secret-key";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password, rememberMe } = body;

    // 验证输入
    if (!username || !password) {
      return NextResponse.json(
        { error: "用户名和密码不能为空" },
        { status: 400 }
      );
    }

    // 查找用户
    const user = adminUsers.find(
      (u) => u.username === username || u.email === username
    );

    if (!user) {
      return NextResponse.json({ error: "用户名或密码错误" }, { status: 401 });
    }

    // 验证密码
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json({ error: "用户名或密码错误" }, { status: 401 });
    }

    // 生成 JWT token
    const tokenPayload = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      name: user.name,
    };

    const expiresIn = rememberMe ? "30d" : "24h";
    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn });

    // 设置 HTTP-only cookie
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as const,
      maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000, // 30天或24小时
      path: "/",
    };

    const response = NextResponse.json({
      success: true,
      message: "登录成功",
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          name: user.name,
        },
      },
    });

    response.cookies.set("admin-token", token, cookieOptions);

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "服务器内部错误" }, { status: 500 });
  }
}
