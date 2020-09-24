export interface IntermediateExtendsEntry {
    name: '',
    order: 'early'|'middle'|'late',
}

export interface IntermediateConfigCollector {
    plugins: string[],
    extends: IntermediateExtendsEntry[],
}
