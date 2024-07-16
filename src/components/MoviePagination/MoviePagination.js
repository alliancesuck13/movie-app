import { Pagination, Spin, Flex } from "antd";

export default function MoviePagination(props) {
  const { isPagesLoading, currentPage, onChange, totalPages, isPaginationShow } = props;
  return (
    <Flex jusify="center">
      {isPagesLoading ? (
        <Spin size="small" style={{ marginLeft: "auto", marginRight: "auto" }} />
      ) : (
        <Pagination
          current={currentPage}
          onChange={onChange}
          total={totalPages}
          className={!isPaginationShow ? "hide" : ""}
          showSizeChanger={false}
          style={{ marginLeft: "auto", marginRight: "auto" }}
        />
      )}
    </Flex>
  );
}
