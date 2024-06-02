import { Pagination, Stack } from "@mui/material";

export interface PaginateLink {
  active: boolean;
  label: string;
  url: string;
}

interface PaginateInterface {
  links: PaginateLink[];
  handleChange: (e: any, v: any) => void;
  path: string;
}

export const Paginate = ({ links, path, handleChange }: PaginateInterface) => (
  <Stack spacing={2} sx={{ display: "flex", alignItems: "center", py: 4 }}>
    <Pagination
      count={links.length - 2}
      page={Number(links.filter((i: PaginateLink) => i.active)?.[0]?.label)}
      onChange={(e: any, v: any) => handleChange(e, `${path}?page=${v}`)}
    />
  </Stack>
);
