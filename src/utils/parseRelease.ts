import {isInternationalizedArrayStringValue} from "@/utils/guards";
import {LocaliseKey, SanityDocument} from "@/utils/types";

export const parseRelease = (localiseKeys: LocaliseKey[], sanityDocuments: SanityDocument[]): SanityDocument[] => {
    const documentsToUpdate: Record<string, SanityDocument> = {};
    localiseKeys.forEach(localiseKey => {
        const [type, id, key] = localiseKey.key_name.web.split('.');
        const translations = localiseKey.translations.filter(e => e.translation);
        const sanityDocument = sanityDocuments.find(e => e._id === id && e._type === type);
        if (sanityDocument) {
            const sanityValue = sanityDocument[key];
            if (isInternationalizedArrayStringValue(sanityValue)){
                const needToBeUpdated = translations.some(translation => !sanityValue.find(e => e._key === translation.language_iso && e.value === translation.translation));
                if (needToBeUpdated) {
                    if (!documentsToUpdate[id]) {
                        documentsToUpdate[id] = sanityDocument;
                    }
                    documentsToUpdate[id][key] = translations.map(e => ({_key: e.language_iso, _type: 'internationalizedArrayStringValue', value: e.translation}))
                }
            }
        }
    })

    return Object.values(documentsToUpdate);
}