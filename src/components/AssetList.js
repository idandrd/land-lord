import React from "react";
import PropTypes from "prop-types";
import { Table } from "antd";
import { uniq } from "lodash";

const strings = {
  nameColumn: "שם",
  addressColumn: "כתובת",
  cityColumn: "עיר",
  ownerColumn: "בעלים",
  typeColumn: "שימוש",
  floorsColumn: "קומות",
  yearColumn: "שנת הקמה",
  unitsColumn: "יחידות",
  commentsColumn: "הערות"
};

const columns = [
  {
    title: strings.nameColumn,
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length
  },
  {
    title: strings.cityColumn,
    dataIndex: "city",
    sorter: (a, b) => a.type.length - b.type.length
  },
  {
    title: strings.addressColumn,
    dataIndex: "address",
    sorter: (a, b) => a.comments.length - b.comments.length
  },
  {
    title: strings.floorsColumn,
    dataIndex: "floors",
    sorter: (a, b) => a.comments.length - b.comments.length
  },
  {
    title: strings.yearColumn,
    dataIndex: "year",
    sorter: (a, b) => a.comments.length - b.comments.length
  },
  {
    title: strings.typeColumn,
    dataIndex: "type",
    sorter: (a, b) => a.comments.length - b.comments.length
  },
  {
    title: strings.unitsColumn,
    dataIndex: "unitsCount",
    sorter: (a, b) => a.comments.length - b.comments.length
  },
  {
    title: strings.ownerColumn,
    dataIndex: "owner",
    sorter: (a, b) => a.comments.length - b.comments.length
  }
];

const onChange = (pagination, filters, sorter) => {
  console.log("params", pagination, filters, sorter);
};

const mergeUnitField = (asset, fieldName) =>
  uniq(asset.units.map(unit => unit[fieldName]).filter(a => a)).join(", ");

export class AssetList extends React.Component {
  render() {
    const { assets } = this.props;
    return (
      <Table
        dataSource={
          assets
            ? assets.map((asset, i) => ({
                ...asset,
                key: i,
                owner: mergeUnitField(asset, "owner"),
                type: mergeUnitField(asset, "type"),
                unitsCount: asset.units.length
              }))
            : []
        }
        columns={columns}
        onChange={onChange}
      />
    );
  }
}

AssetList.propTypes = {
  assets: PropTypes.array
};
