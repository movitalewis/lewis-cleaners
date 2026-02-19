export interface CustomerGrowth {
  year: string;
  customers: number;
}

export const fetchCustomerGrowth = (): Promise<CustomerGrowth[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { year: "2015", customers: 120 },
        { year: "2016", customers: 180 },
        { year: "2017", customers: 260 },
        { year: "2018", customers: 340 },
        { year: "2019", customers: 430 },
        { year: "2020", customers: 480 },
        { year: "2021", customers: 560 },
        { year: "2022", customers: 650 },
        { year: "2023", customers: 780 },
        { year: "2024", customers: 920 },
      ]);
    }, 1000);
  });
};
