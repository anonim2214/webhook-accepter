import {isSanityObjectsArray, parseSanityObject, TranslatedField} from "@/utils/parseSanityObject";
import {createKeysInLocalise} from "@/utils/createKeysInLocalise";
import {printMessage} from "@/utils/console";

export const syncLocalise = async () => {
    const sanityResponse = await fetch('https://azt8azvu.api.sanity.io/v2025-06-17/data/query/production?query=*&perspective=published');
    const sanityData = (await sanityResponse.json()).result;
    printMessage('Got sanity data', JSON.stringify(sanityData))
    if (isSanityObjectsArray(sanityData)) {
        const translatedFields: TranslatedField[] = [];
        sanityData.forEach(e => {
            translatedFields.push(...parseSanityObject(e))
        })
        printMessage('Going to send', JSON.stringify(translatedFields))
        await createKeysInLocalise(translatedFields);
    }
}