import {NextRequest, NextResponse} from "next/server";
import {parseSanityObject} from "@/utils/parseSanityObject";
import {printMessage} from "@/utils/console";
import {webHooks} from "@/app/api/route";


export async function POST(request: NextRequest) {
    const paredJson = await request.json();
    webHooks.push({ title: 'Sanity', timestamp: Date.now(), body: paredJson})
    printMessage('Sanity webhook caught', paredJson);
    return NextResponse.json({ }, { status: 200 })
}