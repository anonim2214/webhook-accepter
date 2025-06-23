import {SANITY_DATASET, SANITY_TOKEN, SANITY_URL} from "@/utils/constants";
import {SanityResponse} from "@/utils/types";
import {isSanityReleasesArray} from "@/utils/guards";

export const getActiveReleases = async () => {
    try {
        const response = await fetch(`${SANITY_URL}/data/query/${SANITY_DATASET}?query=*%5B+_type+%3D%3D+%22system.release%22+%26%26+state+%3D%3D+%22active%22%5D&perspective=published`, {
            headers: {
                Authorization: "Bearer " + SANITY_TOKEN,
                "Content-Type": "application/json",
            }
        });

        const data = await response.json() as SanityResponse;
        if (response.ok && isSanityReleasesArray(data.result)) {
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
}