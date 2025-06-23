import {NextResponse} from "next/server";

import {printMessage} from "@/utils/console";
import {TranslatedField} from "@/utils/types";
import {parseSanityDocument} from "@/utils/parseSanityDocument";
import {getAllDocumentsFromSanity} from "@/tasks/sanity/getAllDocumentsFromSanity";
import {createKeysInLocalise} from "@/tasks/lokalise/createKeysInLocalise";

export async function POST() {
    printMessage('SyncLocalise called');

    const sanityResp = await getAllDocumentsFromSanity();

    if (sanityResp.ok) {
        printMessage('SyncLocalise called');
        const translatedFields: TranslatedField[] = [];
        sanityResp.data!.forEach(e => {
            translatedFields.push(...parseSanityDocument(e))
        })
        const createResp = await createKeysInLocalise(translatedFields);

        if (createResp.ok) {
            return NextResponse.json({ }, { status: 200 })
        } else {
            return NextResponse.json({ status: sanityResp.status, error: sanityResp.error, text: 'Failed to create keys in localise'  }, { status: 500 })
        }
    } else {
        return NextResponse.json({ status: sanityResp.status, error: sanityResp.error,
            text: 'Failed to get sanity documents'  }, { status: 500 })
    }
}