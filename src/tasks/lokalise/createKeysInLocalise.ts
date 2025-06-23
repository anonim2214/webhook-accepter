import {TranslatedField} from "@/utils/types";
import {LOCALISE_TOKEN, LOCALISE_URL} from "@/utils/constants";

export const createKeysInLocalise = async (fields: TranslatedField[]) => {
    try {
        const response = await fetch(`${LOCALISE_URL}/keys`, {
            method: 'POST',
            headers: {
                "X-Api-Token": LOCALISE_TOKEN
            },
            body: JSON.stringify({
                keys: fields
            })
        })
        if (response.ok) {
            return { ok: true };
        } else {
            return {
                ok: false,
                status: response.status,
                error: JSON.stringify(await response.json())
            };
        }
    }
    catch (e) {
        return {
            ok: false,
            error: e
        };
    }
};