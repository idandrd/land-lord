import React from "react";
import { Table } from "antd";
import { uniq } from "lodash";
import { strings } from "./AssetForm";

export class AssetList extends React.Component<{ assets: any[] }> {
  columns = [
    {
      title: strings.assetName,
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length
    },
    {
      title: strings.assetCity,
      dataIndex: "city",
      sorter: (a, b) => a.type.length - b.type.length
    },
    {
      title: strings.assetAddress,
      dataIndex: "address",
      sorter: (a, b) => a.comments.length - b.comments.length
    },
    {
      title: strings.assetFloors,
      dataIndex: "floors",
      sorter: (a, b) => a.comments.length - b.comments.length
    },
    {
      title: strings.assetYear,
      dataIndex: "year",
      sorter: (a, b) => a.comments.length - b.comments.length
    },
    {
      title: strings.assetType,
      dataIndex: "type",
      sorter: (a, b) => a.comments.length - b.comments.length
    },
    {
      title: strings.units,
      dataIndex: "unitsCount",
      sorter: (a, b) => a.comments.length - b.comments.length
    },
    {
      title: strings.assetOwner,
      dataIndex: "owner",
      sorter: (a, b) => a.comments.length - b.comments.length
    }
  ];

  onChange = (pagination, filters, sorter) => {
    console.log("params", pagination, filters, sorter);
  };

  mergeUnitField = (asset, fieldName) =>
    uniq(asset.units.map(unit => unit[fieldName]).filter(a => a)).join(", ");

  parseAssets = assets =>
    assets.map((asset, i) => ({
      ...asset,
      key: i,
      owner: this.mergeUnitField(asset, "owner"),
      type: this.mergeUnitField(asset, "type"),
      unitsCount: asset.units.length
    }));

  render() {
    const assets = this.props.assets || [];
    return (
      <Table
        columns={this.columns}
        dataSource={this.parseAssets(assets)}
        onChange={this.onChange}
        expandedRowRender={asset => <UnitsTable asset={asset} />}
      />
    );
  }
}

class UnitsTable extends React.Component<{ asset: any }> {
  columns = [
    { title: strings.unitName, dataIndex: "name" },
    { title: strings.assetOwner, dataIndex: "owner" },
    { title: strings.assetType, dataIndex: "type" },
    { title: strings.mainSize, dataIndex: "mainSize" },
    { title: strings.gardenSize, dataIndex: "gardenSize" },
    { title: strings.balconySize, dataIndex: "balconySize" },
    { title: strings.storageSize, dataIndex: "storageSize" },
    { title: strings.parkings, dataIndex: "parkings" },
    { title: strings.parkingIndexes, dataIndex: "parkingIndexes" }
  ];

  render() {
    const { asset } = this.props;
    return (
      <Table
        columns={this.columns}
        dataSource={asset.units.map((u, i) => ({ ...u, key: i }))}
        pagination={false}
        bordered={true}
      />
    );
  }
}
