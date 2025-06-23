import {SanityDocument, TranslatedField} from "@/utils/types";
import {isInternationalizedArrayStringValue} from "@/utils/guards";



export const parseSanityDocument = ({_id: id, _type: type, _createdAt, _rev, _updatedAt, sysName, ...rest}: SanityDocument) => {
    const keyPrefix = `${type}.${id}.`
    const translatedFields: TranslatedField[] = []
    Object.entries(rest).forEach(([key, value]) => {
        if (isInternationalizedArrayStringValue(value)) {
            translatedFields.push({
                key_name: keyPrefix+key,
                platforms: ['web'],
                translations: value.map(e => ({
                    language_iso: e._key,
                    translation: e.value || ''
                }))
            })
        }
    })
    return translatedFields;
}