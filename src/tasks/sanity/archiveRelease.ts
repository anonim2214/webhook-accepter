import {SANITY_DATASET, SANITY_TOKEN, SANITY_URL} from "@/utils/constants";

export const archiveRelease = async ({
    id
}: {
    id: string;
}) => {
    try {
        const response = await fetch(`${SANITY_URL}/data/actions/${SANITY_DATASET}`, {
            method: 'POST',
            headers: {
                Authorization: "Bearer " + SANITY_TOKEN,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "actions": [
                    {
                        "actionType": "sanity.action.release.archive",
                        "releaseId": id
                    }
                ]
            })
        });

        if (response.ok) {
            return { ok: true };
        } else {
            return {
                ok: false,
                status: response.status,
                error: JSON.stringify(await response.json())
            };
        }
    } catch (e) {
        return {
            ok: false,
            error: e
        };
    }
}