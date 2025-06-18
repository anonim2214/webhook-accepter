import {NextRequest, NextResponse} from "next/server";


export let webHooks: any[] = [
];

export async function GET(request: NextRequest) {
    return NextResponse.json({ webHooks })
}


export async function DELETE(request: NextRequest) {
    webHooks = webHooks.filter((_, index) => (index.toString() !== request.headers.get('index')))
    return NextResponse.json({ }, { status: 200 })
}