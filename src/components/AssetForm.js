import React from "react";
import PropTypes from "prop-types";
import { Input, Button, Divider, InputNumber } from "antd";
import { FormItem } from "./FormItem";
import { CitySelect } from "./CitySelect";

const strings = {
  assetName: "שם הנכס",
  assetCity: "עיר",
  assetAddress: "כתובת",
  assetYear: "שנת הקמה",
  assetFloors: "קומות"
};

export class AssetForm extends React.Component {
  render() {
    const { asset, actions } = this.props;
    return (
      <div style={{ direction: "rtl" }}>
        <FormItem label={strings.assetName}>
          <Input
            value={asset.name}
            onChange={e => actions.setAssetName(e.target.value)}
          />
        </FormItem>
        <FormItem label={strings.assetCity}>
          <Input
            value={asset.city}
            onChange={e => actions.setAssetCity(e.target.value)}
          />
        </FormItem>
        <FormItem label={strings.assetAddress}>
          <Input
            value={asset.address}
            onChange={e => actions.setAssetAddress(e.target.value)}
          />
        </FormItem>
        <FormItem label={strings.assetYear}>
          <Input
            value={asset.year}
            onChange={e => actions.setAssetYear(e.target.value)}
          />
        </FormItem>
        <FormItem label={strings.assetFloors}>
          <InputNumber value={asset.floors} onChange={actions.setAssetFloors} />
        </FormItem>

        <Divider>{strings.contacts}</Divider>

        <Button type="dashed" onClick={actions.addContact}>
          {strings.addContact}
        </Button>
        <Button onClick={() => actions.onSubmit(asset)}>Save!</Button>
      </div>
    );
  }
}

AssetForm.propTypes = {
  asset: PropTypes.shape({
    name: PropTypes.string,
    city: PropTypes.string,
    address: PropTypes.string,
    year: PropTypes.string,
    floors: PropTypes.number
  }),
  actions: PropTypes.shape({
    setAssetName: PropTypes.func,
    setAssetCity: PropTypes.func,
    setAssetAddress: PropTypes.func,
    setAssetYear: PropTypes.func,
    setAssetFloors: PropTypes.func,
    onSubmit: PropTypes.func
  })
};
