export interface FilterInterface {
  type?: string;
  selectColumns?: string[];
  singleQuery?: string[];
  singleQueries?: string[][];
  orSingleQueries?: string[][];
  withRelationships?: string[];
  lucky?: boolean;
  orSingleFullTextQuery?: [];
  orderColumn?: string;
  singleFullTextQuery?: [];
  dateQuery?: dateQuery;
  columnQuery?: string[];
  paginate?: number;
}

interface dateQuery {
  column: string;
  operator: string;
  param: string;
}
