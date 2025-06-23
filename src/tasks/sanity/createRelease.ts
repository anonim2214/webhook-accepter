import {SANITY_DATASET, SANITY_TOKEN, SANITY_URL} from "@/utils/constants";

export const createRelease = async ({
    title,
    id
}: {
    title: string;
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
                        "actionType": "sanity.action.release.create",
                        "releaseId": id,
                        "metadata": {
                            "title": title,
                        }
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