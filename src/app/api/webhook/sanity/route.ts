import {NextRequest, NextResponse} from "next/server";
import {printError, printMessage} from "@/utils/console";
import {webHooks} from "@/app/api/data";
import {isSanityDocument} from "@/utils/guards";
import {parseSanityDocument} from "@/utils/parseSanityDocument";
import {TranslatedField} from "@/utils/types";
import {createKeysInLocalise} from "@/tasks/lokalise/createKeysInLocalise";


export async function POST(request: NextRequest) {
    try {
        const paredJson = await request.json();
        webHooks.current.push({ title: 'Sanity', timestamp: Date.now(), body: paredJson})
        printMessage('Sanity webhook caught');
        const translatedFields: TranslatedField[] = [];
        if (isSanityDocument(paredJson)) {
            translatedFields.push(...parseSanityDocument(paredJson));
        }
        if (translatedFields.length > 0) {
            const createResp = await createKeysInLocalise(translatedFields);
            if (createResp.ok) {
                return NextResponse.json({ }, { status: 200 })
            } else {
                return NextResponse.json({ status: createResp.status, error: createResp.error, text: 'Failed to create keys in localise'  }, { status: 500 })
            }
        } else {
            return NextResponse.json({ }, { status: 200 })
        }
    } catch (e) {
        printError('Failed to process sanity webhook', e);
    }
    return NextResponse.json({ }, { status: 200 })
}