export class ApplicationEntity {
  id!: number;

  //More properties...

  code!: string;
  name!: string;
  logo_url!: string;
  description!: string;
  chips!: string[];
  price!: string;

  color_primary!: string;

  url_production!: string;
  url_sandbox!: string;
  url_test!: string;

  url_front_production!: string;
  url_front_sandbox!: string;
  url_front_test!: string;

  recursive_payment!: number;

  validateToCreate(): void {
  }

  validateToUpdate(): void {
  }



  created_at!: Date;
  updated_at!: Date;
  deleted_at!: Date;
}
