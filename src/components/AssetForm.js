import React from "react";
import PropTypes from "prop-types";
import { Input, Button, Divider, InputNumber } from "antd";
import { FormItem } from "./FormItem";
import { CitySelect } from "./CitySelect";
import { UnitTypeSelect, UnitOwnerSelect, COMBINED } from "./UnitTypeSelect";

const strings = {
  assetName: "שם הנכס",
  assetCity: "עיר",
  assetAddress: "כתובת",
  assetYear: "שנת הקמה",
  assetFloors: "קומות",
  units: "יחידות",
  assetType: "סוג",
  assetOwner: "בעלים",
  addUnit: "הוסף יחידה",
  save: "שמור",
  unitName: "שם היחידה"
};

const emptyUnit = {
  name: "",
  type: "",
  owner: ""
};

const initialState = {
  name: "",
  city: "",
  address: "",
  year: 1990,
  floors: 1,
  type: "",
  units: [{ ...emptyUnit }],

  showTypeInUnits: false,
  showOwnerInUnits: false
};

export class AssetForm extends React.Component {
  state = initialState;

  addUnit = () =>
    this.setState({ units: [...this.state.units, { ...emptyUnit }] });

  onUnitChange = (unitKey, field, value) => {
    const updatedUnit = { ...this.state.units[unitKey], [field]: value };
    const newUnits = [...this.state.units];
    newUnits[unitKey] = updatedUnit;
    this.setState({ units: newUnits });
  };

  onUnitRemove = unitKey => {
    const newUnits = this.state.units.filter((_u, i) => i !== unitKey);
    this.setState({
      units: newUnits
    });
  };

  onAssetTypeChange = type => {
    const [unitsType, showTypeInUnits] =
      type === COMBINED ? ["", true] : [type, false];
    const newUnits = this.state.units.map(unit => ({
      ...unit,
      type: unitsType
    }));
    this.setState({ units: newUnits, showTypeInUnits, type });
  };

  onAssetOwnerChange = owner => {
    const [unitsOwner, showOwnerInUnits] =
      owner === COMBINED ? ["", true] : [owner, false];
    const newUnits = this.state.units.map(unit => ({
      ...unit,
      owner: unitsOwner
    }));
    this.setState({ units: newUnits, showOwnerInUnits, owner });
  };

  onSubmit = () => {
    const asset = {
      name: this.state.name,
      city: this.state.city,
      address: this.state.address,
      year: this.state.year,
      floors: this.state.floors,
      units: this.state.units
    };
    this.props.actions.onSubmit(asset);
  };

  render() {
    return (
      <div style={{ direction: "rtl" }}>
        <FormItem label={strings.assetName}>
          <Input
            value={this.state.name}
            onChange={({ target }) => this.setState({ name: target.value })}
          />
        </FormItem>
        <FormItem label={strings.assetType}>
          <UnitTypeSelect
            value={this.state.type}
            onChange={this.onAssetTypeChange}
            ofAsset
          />
        </FormItem>
        <FormItem label={strings.assetOwner}>
          <UnitOwnerSelect
            value={this.state.owner}
            onChange={this.onAssetOwnerChange}
            ofAsset
          />
        </FormItem>
        <FormItem label={strings.assetCity}>
          <CitySelect
            style={{ width: "100%" }}
            onChange={city => this.setState({ city })}
          />
        </FormItem>
        <FormItem label={strings.assetAddress}>
          <Input
            value={this.state.address}
            onChange={e => this.setState({ address: e.target.value })}
          />
        </FormItem>
        <FormItem label={strings.assetYear}>
          <InputNumber
            value={this.state.year}
            onChange={year => this.setState({ year })}
          />
        </FormItem>
        <FormItem label={strings.assetFloors}>
          <InputNumber
            value={this.state.floors}
            onChange={floors => this.setState({ floors })}
          />
        </FormItem>

        <Divider>{strings.units}</Divider>

        {this.state.units.map((unit, key) => (
          <UnitForm
            key={key}
            unit={unit}
            onFieldChange={(field, value) =>
              this.onUnitChange(key, field, value)
            }
            onRemove={() => this.onUnitRemove(key)}
            showType={this.state.showTypeInUnits}
            showOwner={this.state.showOwnerInUnits}
          />
        ))}

        <Button onClick={this.addUnit}>{strings.addUnit}</Button>
        <Button type="primary" onClick={this.onSubmit}>
          {strings.save}
        </Button>
      </div>
    );
  }
}

export class UnitForm extends React.Component {
  render() {
    const { unit, onFieldChange, onRemove, showType, showOwner } = this.props;
    return (
      <div
        style={{ border: "1px dashed", width: "80%", padding: 9, margin: 4 }}
      >
        <FormItem label={strings.unitName}>
          <Input
            value={unit.name}
            onChange={({ target }) => onFieldChange("name", target.value)}
          />
        </FormItem>
        {showType && (
          <FormItem label={strings.assetType}>
            <UnitTypeSelect
              value={unit.type}
              onChange={type => onFieldChange("type", type)}
            />
          </FormItem>
        )}
        {showOwner && (
          <FormItem label={strings.assetOwner}>
            <UnitOwnerSelect
              value={unit.owner}
              onChange={owner => onFieldChange("owner", owner)}
            />
          </FormItem>
        )}
        <Button onClick={onRemove}>X</Button>
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
