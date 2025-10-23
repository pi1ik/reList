import { bot } from "@/lib/bot";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    await bot.handleUpdate(body); // обрабатываем Telegram updates
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[Telegram webhook error]", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
};

// Для проверки доступности вебхука в браузере
export const GET = () => {
  return NextResponse.json({ message: "Telegram webhook endpoint is alive" });
};
