import { Button, Divider, Input, InputNumber } from "antd";
import React from "react";
import { BaseAsset, Unit } from "../types";
import { CitySelect } from "./CitySelect";
import { FormItem } from "./FormItem";
import { COMBINED, UnitOwnerSelect, UnitTypeSelect } from "./UnitTypeSelect";

export const strings = {
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
  unitName: "שם היחידה",
  mainSize: 'מ"ר עיקרי',
  gardenSize: 'מ"ר גינה',
  balconySize: 'מ"ר מרפסת',
  storageSize: 'מ"ר מחסן',
  parkings: "כמות חניות",
  parkingIndexes: "מספרי חניות"
};

const emptyUnit: Unit = {
  name: "",
  type: "",
  owner: "",
  mainSize: "",
  gardenSize: "",
  balconySize: "",
  storageSize: "",
  parkings: "",
  parkingIndexes: ""
};

interface AssetFormState extends BaseAsset {
  owner?: string
  showTypeInUnits: boolean;
  showOwnerInUnits: boolean;
}

const initialState: AssetFormState = {
  name: "",
  city: "",
  address: "",
  year: 1990,
  floors: 1,
  type: "",
  storageSize: "",
  parkings: "",
  parkingIndexes: "",
  units: [{ ...emptyUnit }],

  showTypeInUnits: false,
  showOwnerInUnits: false
};

export class AssetForm extends React.Component<any, AssetFormState> {
  state = { ...initialState };

  addUnit = () =>
    this.setState({ units: [...this.state.units, { ...emptyUnit }] });

  onUnitChange = (unitKey, field, value) => {
    const updatedUnit = { ...this.state.units[unitKey], [field]: value };
    const newUnits = [...this.state.units];
    newUnits[unitKey] = updatedUnit;
    this.setState({ units: newUnits });
  };

  onUnitRemove = unitKey => {
    const units = this.state.units.filter((_unit, i) => i !== unitKey);
    this.setState({ units });
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
            onChange={({ target }) => this.setState({ address: target.value })}
          />
        </FormItem>
        <FormItem label={strings.assetYear}>
          <InputNumber
            value={this.state.year}
            onChange={(year: number) => this.setState({ year })}
          />
        </FormItem>
        <FormItem label={strings.assetFloors}>
          <InputNumber
            value={this.state.floors}
            onChange={(floors: number) => this.setState({ floors })}
          />
        </FormItem>
        <FormItem label={strings.storageSize}>
          <InputNumber
            value={this.state.storageSize as any}
            onChange={(storageSize: string) => this.setState({ storageSize })}
          />
        </FormItem>
        <FormItem label={strings.parkings}>
          <InputNumber
            value={this.state.parkings as any}
            onChange={(parkings: string) => this.setState({ parkings })}
          />
        </FormItem>
        {this.state.parkings && (
          <FormItem label={strings.parkingIndexes}>
            <Input
              value={this.state.parkingIndexes}
              onChange={({ target }) =>
                this.setState({ parkingIndexes: target.value })
              }
            />
          </FormItem>
        )}

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
        <Button onClick={() => console.log(this.state)}>log</Button>
      </div>
    );
  }
}

export class UnitForm extends React.Component<any> {
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
        <FormItem label={strings.mainSize}>
          <InputNumber
            value={unit.mainSize}
            onChange={size => onFieldChange("mainSize", size)}
          />
        </FormItem>
        <FormItem label={strings.gardenSize}>
          <InputNumber
            value={unit.gardenSize}
            onChange={size => onFieldChange("gardenSize", size)}
          />
        </FormItem>
        <FormItem label={strings.balconySize}>
          <InputNumber
            value={unit.balconySize}
            onChange={size => onFieldChange("balconySize", size)}
          />
        </FormItem>
        <FormItem label={strings.storageSize}>
          <InputNumber
            value={unit.storageSize}
            onChange={size => onFieldChange("storageSize", size)}
          />
        </FormItem>
        <FormItem label={strings.parkings}>
          <InputNumber
            value={unit.parkings}
            onChange={size => onFieldChange("parkings", size)}
          />
        </FormItem>
        {unit.parkings && (
          <FormItem label={strings.parkingIndexes}>
            <Input
              value={unit.parkingIndexes}
              onChange={({ target }) =>
                onFieldChange("parkingIndexes", target.value)
              }
            />
          </FormItem>
        )}
        <Button onClick={onRemove}>X</Button>
      </div>
    );
  }
}