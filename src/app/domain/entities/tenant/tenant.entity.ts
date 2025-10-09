export class TenantEntity {
    id!: number;

    //More properties...

    validateToCreate(): void {}

    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
