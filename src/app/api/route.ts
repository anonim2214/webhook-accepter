import {NextRequest, NextResponse} from "next/server";


const webHooks: any[] = [
];

export async function POST(request: NextRequest) {
    const paredJson = await request.json();
    webHooks.push({  timestamp: Date.now(), body: paredJson})
    console.info(request.body);
    return NextResponse.json({ }, { status: 200 })
}

export async function GET(request: NextRequest) {

    return NextResponse.json({ webHooks })
}