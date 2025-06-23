import {NextResponse} from "next/server";

import {printMessage} from "@/utils/console";
import {getActiveReleases} from "@/tasks/sanity/getActiveReleases";
import {SANITY_RELEASE_ID_PREFIX, SANITY_RELEASE_TITLE_PREFIX} from "@/utils/constants";
import {archiveRelease} from "@/tasks/sanity/archiveRelease";
import {removeRelease} from "@/tasks/sanity/removeRelease";
import {createRelease} from "@/tasks/sanity/createRelease";
import {getAllKeysFromLocalise} from "@/utils/getAllKeysFromLocalise";
import {getAllDocumentsFromSanity} from "@/utils/getAllDocumentsFromSanity";
import {parseRelease} from "@/utils/parseRelease";
import {fillRelease} from "@/tasks/sanity/fillRelease";

export async function POST() {
    printMessage('SyncSanity called');
    const localiseKeys = await getAllKeysFromLocalise();

    if (localiseKeys.ok) {
        printMessage('Got all lokalise keys', localiseKeys.data!.length.toString());
        const sanityDocuments = await getAllDocumentsFromSanity();
        if (sanityDocuments.ok) {
            printMessage('Got all sanity documents', sanityDocuments.data!.length.toString());
            const documentsToUpdate = parseRelease(localiseKeys.data!, sanityDocuments.data!);
            if (documentsToUpdate.length > 0) {
                printMessage('Found documents to update', documentsToUpdate.length.toString());
                const releases = await getActiveReleases();
                if (releases.ok) {
                    printMessage('Got active releases');
                    const lokaliseReleases = releases.data!.filter(e => e._id.includes(SANITY_RELEASE_ID_PREFIX));
                    if (lokaliseReleases.length > 0) {
                        printMessage('Found lokalise releases');
                        for (const release of lokaliseReleases) {
                            const releaseId = release._id.split('_.releases.')[1];
                            const archiveRes = await archiveRelease({ id: releaseId });
                            if (archiveRes.ok) {
                                printMessage(`Moved release ${releaseId} to archive`);
                                const deleteRes = await removeRelease({id: releaseId});
                                if (deleteRes.ok) {
                                    printMessage(`Release ${releaseId} removed`);
                                } else {
                                    return NextResponse.json({ status: deleteRes.status, error: deleteRes.error, text: `Failed to remove release ${releaseId}`  }, { status: 500 })
                                }
                            } else {
                                return NextResponse.json({ status: archiveRes.status, error: archiveRes.error, text: `Failed to archive release ${releaseId}`  }, { status: 500 })
                            }
                        }
                    } else {
                        printMessage('No lokalise releases found');
                    }

                    const now = new Date();
                    const releaseId = SANITY_RELEASE_ID_PREFIX + now.valueOf();
                    const title = SANITY_RELEASE_TITLE_PREFIX + now.toDateString();

                    const createRes = await createRelease({ id: releaseId, title: title });
                    if (createRes.ok) {
                        printMessage(`Created lokalise release ${releaseId}`);
                        const fillReleaseRes = await fillRelease({ releaseId, documentsToUpdate });
                        if (fillReleaseRes.ok) {
                            return NextResponse.json({ releaseId }, { status: 200 })
                        } else {
                            return NextResponse.json({ status: createRes.status, error: createRes.error, text: 'Failed to fill release'  }, { status: 500 })
                        }

                    } else {
                        return NextResponse.json({ status: createRes.status, error: createRes.error, text: 'Failed to create release'  }, { status: 500 })
                    }
                } else {
                    return NextResponse.json({ status: releases.status, error: releases.error, text: 'Failed to get active releases'  }, { status: 500 })
                }
            } else {
                printMessage('No documents to update found');
                return NextResponse.json({ }, { status: 200 })
            }

        } else {
            return NextResponse.json({ status: sanityDocuments.status, error: sanityDocuments.error, text: `Failed to get sanity documents`  }, { status: 500 })
        }
    } else {
        return NextResponse.json({ status: localiseKeys.status, error: localiseKeys.error, text: `Failed to get localize keys`  }, { status: 500 })
    }
}