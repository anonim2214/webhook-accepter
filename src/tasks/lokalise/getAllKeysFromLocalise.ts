import {isLocaliseResponse} from "@/utils/guards";
import {LocaliseKey} from "@/utils/types";
import {LOCALISE_TOKEN, LOCALISE_URL} from "@/utils/constants";

const limit = 500;

export const getKeysFromLocalise = async (page: number) => {
    return await fetch(`${LOCALISE_URL}/keys?include_translations=1&limit=${limit}&page=${page}`, {
        headers: {
            'X-Api-Token': LOCALISE_TOKEN
        }
    });
}


export const getAllKeysFromLocalise = async () => {
    try {

        let page = 1;
        const allKeys:LocaliseKey[]  = [];
        let currentPage: LocaliseKey[] = [];
        do {
            const response = await getKeysFromLocalise(page);
            const data = await response.json();
            if (response.ok && isLocaliseResponse(data)) {
                currentPage = data.keys;
                page++;
                allKeys.push(...currentPage);
            } else {
                return {
                    ok: false,
                    status: response.status,
                    error: data
                };
            }
        } while (currentPage.length === limit)

        return { ok: true, data: allKeys };
    } catch (e) {
        return {
            ok: false,
            error: e
        };
    }
}