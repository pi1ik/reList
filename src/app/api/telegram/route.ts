import { NextRequest, NextResponse } from "next/server";
import { bot } from "@/lib/bot";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    console.log("Incoming Telegram update:", body);
    await bot.handleUpdate(body);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[Telegram webhook error]", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
};

export const GET = () => {
  return NextResponse.json({ message: "Telegram webhook endpoint is alive" });
};
