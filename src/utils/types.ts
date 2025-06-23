type InternationalizedArrayStringValue = {
    value: string;
    _key: string;
    _type: 'internationalizedArrayStringValue'
}
export type InternationalizedArray = InternationalizedArrayStringValue[];

export type SanityResponse = {
    result: unknown;
}

export type SanityDocument = {
    [key: string]: unknown;
    _id: string;
    _rev: string;
    _updatedAt: string;
    _createdAt: string;
    _type: string;
    _system?: {
        base: {
            id: string;
            rev: string;
        }
    };
};


export type SanityRelease = SanityDocument & {
    name: string;
    state: string;
    metadata: {
        title: string;
    }
};

export type TranslatedField = {
    key_name: string;
    platforms: string[];
    translations: {
        language_iso: string;
        translation: string;
    }[]
}

export type LocaliseResponse = {
    project_id: string;
    project_uuid: string;
    keys: LocaliseKey[];
}

export type LocaliseTranslation = {
    language_iso: string;
    translation: string;
}


export type LocaliseKey = {
    key_id: number;
    created_at: string;
    created_at_timestamp: number;
    key_name: {
        ios: string;
        android: string;
        web: string;
        other: string;
    };
    filenames: {
        ios: string;
        android: string;
        web: string;
        other: string;
    };
    description: string;
    platforms: string[];
    translations: LocaliseTranslation[];
    is_plural: boolean;
    plural_name: "";
    is_hidden: boolean;
    is_archived: boolean;
    context: string;
    base_words: number;
    char_limit: number;
    custom_attributes: string;
    modified_at: string;
    modified_at_timestamp: number;
    translations_modified_at: string;
    translations_modified_at_timestamp: number;
}
