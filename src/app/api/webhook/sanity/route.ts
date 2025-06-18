import {NextRequest, NextResponse} from "next/server";
import {printMessage} from "@/utils/console";
import {webHooks} from "@/app/api/data";


export async function POST(request: NextRequest) {
    const paredJson = await request.json();
    webHooks.current.push({ title: 'Sanity', timestamp: Date.now(), body: paredJson})
    printMessage('Sanity webhook caught', paredJson);
    return NextResponse.json({ }, { status: 200 })
}