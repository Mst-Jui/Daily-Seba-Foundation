// app/api/contact/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, subject, message } = body;

    if (!name?.trim() || !phone?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, phone, and message are required." },
        { status: 400 }
      );
    }

    // TODO: এখানে email/database connect করুন
    // উদাহরণ: nodemailer দিয়ে email send করতে পারবেন
    // await sendEmail({ name, phone, subject, message });
    console.log("New contact message:", body);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}