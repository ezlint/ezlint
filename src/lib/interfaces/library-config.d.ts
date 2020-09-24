interface OptionalExport {
    "if": string,
    "include": string
}

export interface LibraryConfig {
    "name": string,
    "plugins": string[],
    "extendsConfigs": string[],
    "optionalExtends": OptionalExport[],
}
