import {TranslatedField} from "@/utils/parseSanityObject";
import {printError, printMessage} from "@/utils/console";

export const createKeysInLocalise = async (fields: TranslatedField[]) => {
    if (fields.length > 0) {
        try {
            printMessage('Calling https://api.lokalise.com/api2/projects/2876656467ff510a246440.34817828/keys', JSON.stringify(fields));
            const result = await fetch('https://api.lokalise.com/api2/projects/2876656467ff510a246440.34817828/keys', {
                method: 'POST',
                headers: {
                    "X-Api-Token": "68fa65064ba1123c7fc420fc8dc4c959cd1b34aa"
                },
                body: JSON.stringify({
                    keys: fields
                })
            })
            printMessage('Result from lokalise', `${result.status} ${JSON.stringify(await result.json())}`)
        } catch (e) {
            printError('Error', e)
        }
    }
};