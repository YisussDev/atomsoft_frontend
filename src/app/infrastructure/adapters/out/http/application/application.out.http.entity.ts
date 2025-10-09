export interface ApplicationOutHttpEntity {

  id: number;

  code: string;
  name: string;
  logo_url: string;
  description: string;
  chips: string[];
  price: string;

  url_production: string;
  url_sandbox: string;
  url_test: string;

  url_front_production: string;
  url_front_sandbox: string;
  url_front_test: string;

  recursive_payment: number;

  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
