import { HTMLAttributes, ReactNode, useCallback, useState } from "react";
import type { ColumnsType } from "antd/lib/table";
import { Table as AntdTable } from "antd";
import DraggableBodyRow from "./DraggableBodyRow";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { reorder } from "./utils/mutate-tree";
import { mockData } from "./utils/mock-data";

export interface DataType {
  key: ReactNode;
  name: string;
  age: number;
  address: string;
  children?: DataType[];
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    width: "12%",
  },
  {
    title: "Address",
    dataIndex: "address",
    width: "30%",
    key: "address",
  },
];

const initialData: DataType[] = mockData

const Table = () => {
  const [data, setData] = useState(initialData);

  const components = {
    body: {
      row: DraggableBodyRow,
    },
  };

  const moveRow = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragRow = data[dragIndex];
      console.log("dragRow: ", dragRow);
      const newData = reorder(data, dragIndex, hoverIndex);
      setData(newData);
    },
    [data]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <AntdTable
        columns={columns}
        dataSource={data}
        components={components}
        onRow={(record, index) => {
          const attr = {
            index,
            record,
            moveRow,
          };
          return attr as HTMLAttributes<any>;
        }}
      />
    </DndProvider>
  );
};

export default Table;
