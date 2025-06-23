import {SANITY_DATASET, SANITY_TOKEN, SANITY_URL} from "@/utils/constants";
import {SanityDocument} from "@/utils/types";

export const fillRelease = async ({
    releaseId,
    documentsToUpdate
}: {
    releaseId: string;
    documentsToUpdate: SanityDocument[];
}) => {
    try {
        const response = await fetch(`${SANITY_URL}/data/actions/${SANITY_DATASET}`, {
            method: 'POST',
            headers: {
                Authorization: "Bearer " + SANITY_TOKEN,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                actions: Object.values(documentsToUpdate).map(e => ( {
                    actionType: 'sanity.action.document.version.create',
                    publishedId: e._id,
                    document: {  ...e, _id: `versions.${releaseId}.${e._id}`, }}))
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