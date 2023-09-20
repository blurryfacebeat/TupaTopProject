export enum FirstCategory {
  Courses,
  Services,
  Books,
  Products,
}

type THeadHunter = {
  count: number;
  juniorSalary: number;
  middleSalary: number;
  seniorSalary: number;
};

type TAdvantage = {
  title: string;
  description: string;
};

export class TopPageModel {
  id: string;
  firstCategory: FirstCategory;
  secondCategory: string;
  title: string;
  category: string;
  hh?: THeadHunter;
  advantages: TAdvantage[];
  seoText: string;
  tagsTitle: string;
  tags: string[];
}
