import {Pagination} from "@heroui/react";

interface IProps {
  page: number
  pages: number
  setPage: (page: number) => void
}

export default function CustomPagination({ page, pages, setPage }: IProps) {
  return <Pagination size="md" loop showControls initialPage={page} total={pages} onChange={setPage} />;
}
