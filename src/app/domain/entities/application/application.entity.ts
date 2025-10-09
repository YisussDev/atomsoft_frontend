export class ApplicationEntity {
    id!: number;

    //More properties...

    validateToCreate(): void {}

    validateToUpdate(): void {}

    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
