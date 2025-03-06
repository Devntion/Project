export interface Author {
  name: string;
  affiliation: string;
  role: 'creator' | 'contributor';
}

export const authors: Author[] = [
  {
    name: "Dörthe Arndt",
    affiliation: "ICCL, TU Dresden",
    role: "creator"
  },
  {
    name: "Martin Diller",
    affiliation: "ICCL, TU Dresden",
    role: "creator"
  },
  {
    name: "Piotr Gorczyca",
    affiliation: "ICCL, TU Dresden",
    role: "creator"
  },
  {
    name: "Pascal Kettmann",
    affiliation: "ICCL, TU Dresden",
    role: "creator"
  },
  {
    name: "Stephan Mennicke",
    affiliation: "ICCL, TU Dresden",
    role: "creator"
  },
  {
    name: "Hannes Straß",
    affiliation: "ICCL, TU Dresden",
    role: "creator"
  },
  {
    name: "Evi Hartig",
    affiliation: "EKFZ, TU Dresden",
    role: "contributor"
  },
  {
    name: "Sarah Tsurkan",
    affiliation: "EKFZ, TU Dresden",
    role: "contributor"
  },
  {
    name: "Georg Heidenreich",
    affiliation: "Siemens Healthineers",
    role: "contributor"
  }
]; 