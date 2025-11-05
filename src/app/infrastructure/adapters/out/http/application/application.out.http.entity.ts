export interface ApplicationOutHttpEntity {

  id: number;

  code: string;
  name: string;
  logo_url: string;
  description: string;
  chips: string[];
  img_chips: string[];
  color_primary: string;
  rate: number;

  url_production: string;
  url_sandbox: string;
  url_test: string;

  url_front_production: string;
  url_front_sandbox: string;
  url_front_test: string;

  recursive_payment: number;
  plans: any[];

  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
