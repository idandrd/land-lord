import React from 'react';
import { Table } from 'antd';

const columns = [{
  title: 'שם',
  dataIndex: 'name',
  sorter: (a, b) => a.name.length - b.name.length,
}, {
  title: 'גיל',
  dataIndex: 'age',
  defaultSortOrder: 'descend',
  sorter: (a, b) => a.age - b.age,
}, {
  title: 'כתובת',
  dataIndex: 'address',
  sorter: (a, b) => a.address.length - b.address.length,
}];

const data = [{
  key: '1',
  name: 'עידן דרדיקמן',
  age: 27,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'אורן יומטוב',
  age: 24,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'דניאל לרנר',
  age: 28,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '4',
  name: 'אוהד סטולר',
  age: 32,
  address: 'London No. 2 Lake Park',
}];

const onChange = (pagination, filters, sorter) => {
  console.log('params', pagination, filters, sorter);
}

const ContactsTable = () => {
  return <Table dataSource={data} columns={columns} onChange={onChange}/>
}

export default ContactsTable;