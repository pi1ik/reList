import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    console.log("[WebApp user data]", body.user); // Здесь сервер видит данные пользователя
    // Можно сохранять в БД или передавать боту через Telegraf
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[WebApp user error]", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
};
