import {isSanityDocumentsArray} from "@/utils/guards";
import {SANITY_DATASET, SANITY_URL} from "@/utils/constants";
import {SanityResponse} from "@/utils/types";

export const getAllDocumentsFromSanity = async () => {
    try {
        const response = await fetch(`${SANITY_URL}/data/query/${SANITY_DATASET}?query=*&perspective=published`);
        const data = await response.json() as SanityResponse;
        if (isSanityDocumentsArray(data.result)) {
            return { ok: true, data: data.result };
        } else {
            return {
                ok: false,
                status: response.status,
                error: data
            };
        }
    } catch (e) {
        return {
            ok: false,
            error: e
        };
    }

};