import {NextRequest, NextResponse} from "next/server";


let webHooks: any[] = [
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


export async function DELETE(request: NextRequest) {
    webHooks = webHooks.filter((_, index) => (index.toString() !== request.headers.get('index')))
    return NextResponse.json({ }, { status: 200 })
}