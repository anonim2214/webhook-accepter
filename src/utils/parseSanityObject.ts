import {printError, printMessage} from "@/utils/console";

type InternationalizedArrayStringValue = {
    value: string;
    _key: string;
    _type: 'internationalizedArrayStringValue'
}
type InternationalizedArray = InternationalizedArrayStringValue[];
const isInternationalizedArrayStringValue = (value: unknown): value is InternationalizedArray => {
    return Array.isArray(value) && value.length > 0 && value[0]._type === 'internationalizedArrayStringValue'
}

export const isSanityObject = (value: unknown): value is SanityObject => {
    return typeof value === 'object' && value !== null && '_id' in value && '_type' in value
}

export const isSanityObjectsArray = (value: unknown): value is SanityObject[] => {
    return Array.isArray(value) && value.length > 0 && isSanityObject(value[0])
}

export type SanityObject = {
    [key: string]: unknown;
    _id: string;
    sysName: string;
    _rev: string;
    _updatedAt: string;
    _createdAt: string;
    _type: string;
}

export type TranslatedField = {
    key_name: string;
    platforms: string[];
    translations: {
        language_iso: string;
        translation: string;
    }[]
}

export const parseSanityObject = ({_id: id, _type: type, _createdAt, _rev, _updatedAt, sysName, ...rest}: SanityObject) => {
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