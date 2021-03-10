import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Input, Button, Popconfirm, Form } from "antd";
import { FormInstance } from "antd/lib/form";
const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
  [propName: string]: any;
}

interface EditableRowProps {
  index: number;
}
//
const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  data;
  handleSave: (record: Item) => void;
}
//
const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  data,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<Input>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    if (data.filter(x => !x.valid).length) {
      return;
    }
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };
  //自定义验证
  const commonValValidate = (rule, value) => {
    // console.log(rule) //表单控件当前属性
    // console.log(value)//表单控件当前值
    if (rule.field === "age") {
      // data.map((x) => {
      //   if (x.key === record.key) {
      //     x.age = value;
      //   }
      //   return x;
      // });
      const filterVal = data.filter(
        (x) => x.key !== record.key && x.age === value
      );
      if (filterVal.length) {
        return Promise.reject("age不能相同");
      }
      // form.validateFields(['age']);
    }
    return Promise.resolve();
  };
  //编辑项失去焦点时触发
  const save = async () => {
    try {
      data.map((x) => {
        if (x.key === record.key) {
          x.valid = true;
        }
        return x;
      });
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      data.map((x) => {
        if (x.key === record.key) {
          x.valid = false;
        }
        return x;
      });
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
          { validator: commonValValidate },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: React.Key;
  name: string;
  age: string;
  address: string;
}

interface EditableTableState {
  dataSource: DataType[];
  count: number;
}

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

//可编辑表格
export default class EditableTable extends React.Component<any, any> {
  columns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[];

  constructor(props: EditableTableProps) {
    super(props);
    this.columns = [
      {
        title: "name",
        dataIndex: "name",
        width: "30%",
        editable: true,
      },
      {
        title: "age",
        dataIndex: "age",
        editable: true,
      },
      {
        title: "address",
        dataIndex: "address",
      },
      {
        title: "operation",
        dataIndex: "operation",
        render: (_, row, index) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => this.handleDelete(row)}
            >
              <a>Delete</a>
            </Popconfirm>
          ) : null,
      },
    ];

    this.state = {
      dataSource: [
        {
          key: "0",
          name: "Edward King 0",
          age: "32",
          address: "London, Park Lane no. 0",
          valid: true, //用于验证
        },
        {
          key: "1",
          name: "Edward King 1",
          age: "32",
          address: "London, Park Lane no. 1",
          valid: true,
        },
      ],
      count: 2,
    };
  }

  handleDelete = (row) => {
    let key = row.key;
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData: DataType = {
      key: count,
      name: `Edward King ${count}`,
      age: "32",
      address: `London, Park Lane no. ${count}`,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };

  handleSave = (row: DataType) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record: DataType) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
          data: dataSource,
        }),
      };
    });
    return (
      <div>
        <Button
          type="primary"
          onClick={() => this.props.history.go(-1)}
          style={{ marginRight: 10 }}
        >
          返回
        </Button>
        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{ marginBottom: 16 }}
        >
          Add a row
        </Button>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={columns as ColumnTypes}
        />
      </div>
    );
  }
}
