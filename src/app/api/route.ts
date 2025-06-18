import {NextRequest, NextResponse} from "next/server";
import {webHooks} from "@/app/api/data";


export async function GET(request: NextRequest) {
    return NextResponse.json({ webHooks: webHooks.current })
}


export async function DELETE(request: NextRequest) {
    webHooks.current = webHooks.current.filter((_, index) => (index.toString() !== request.headers.get('index')))
    return NextResponse.json({ }, { status: 200 })
}