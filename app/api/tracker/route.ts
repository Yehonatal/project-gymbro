import { NextResponse } from "next/server";
import { getEntries, saveEntry } from "../../actions/tracker";

export async function GET() {
    try {
        const data = await getEntries();
        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json([], { status: 200 });
    }
}

export async function POST(request: Request) {
    try {
        const payload = await request.json();
        const entry = await saveEntry(payload);
        return NextResponse.json(entry, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "failed" }, { status: 500 });
    }
}
