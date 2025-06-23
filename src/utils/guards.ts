import {InternationalizedArray, LocaliseResponse, SanityDocument, SanityRelease} from "@/utils/types";

export const isInternationalizedArrayStringValue = (value: unknown): value is InternationalizedArray => {
    return Array.isArray(value) && value.length > 0 && value[0]._type === 'internationalizedArrayStringValue'
}

export const isSanityDocument = (value: unknown): value is SanityDocument => {
    return typeof value === 'object' && value !== null && '_id' in value && '_type' in value
}

export const isSanityDocumentsArray = (value: unknown): value is SanityDocument[] => {
    return Array.isArray(value) && (value.length > 0 && isSanityDocument(value[0]) || value.length === 0)
}

export const isSanityRelease = (value: unknown): value is SanityRelease => {
    return isSanityDocument(value) && value._type === 'system.release'
}

export const isSanityReleasesArray = (value: unknown): value is SanityRelease[] => {
    return Array.isArray(value) && (value.length > 0 && isSanityRelease(value[0]) || value.length === 0)
}

export const isLocaliseResponse = (value: unknown): value is LocaliseResponse => {
    return typeof value === 'object' && value !== null && 'project_id' in value && 'project_uuid' in value && 'keys' in value
}