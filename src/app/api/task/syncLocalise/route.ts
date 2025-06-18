import {NextResponse} from "next/server";

import {printMessage} from "@/utils/console";
import {syncLocalise} from "@/utils/syncLocalise";

export async function POST() {
    printMessage('SyncLocalise called');
    await syncLocalise();
    return NextResponse.json({ }, { status: 200 })
}