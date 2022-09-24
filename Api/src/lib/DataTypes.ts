
export interface EntityChangeRecord {
    EntityType: string;
    EntityId: string;
    EntityChangeType: string;
    [propName: string]: unknown;
}
