interface OptionalExport {
    if: string,
    include: string,
}

export interface LibraryConfig {
    name: string,
    order?: 'early'|'normal'|'late'
    plugins: string[],
    extendsConfigs: string[],
    optionalExtends?: OptionalExport[],
}
