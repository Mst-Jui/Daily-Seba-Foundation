// app/api/dealer-application/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, district, address, city, state, zip } = body;

    // ── Basic server-side validation ──
    if (!name?.trim() || !phone?.trim() || !district?.trim()) {
      return NextResponse.json(
        { error: "Name, phone, and district are required." },
        { status: 400 }
      );
    }

    // ── এখানে database-এ save করার কোড বসবে ──
    // উদাহরণ (Supabase দিয়ে করলে এমন হবে):
    //
    // const { error } = await supabase
    //   .from("dealer_applications")
    //   .insert([{ name, phone, district, address, city, state, zip }]);
    //
    // if (error) throw error;

    // আপাতত শুধু log করছি (যেহেতু database connect করা নেই)
    console.log("New dealer application:", body);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Dealer application error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}