import * as React from 'react';
import styles from './ReactWebpart.module.scss';
import { IReactWebpartProps } from './IReactWebpartProps';
import { escape } from '@microsoft/sp-lodash-subset';
//= additional imports --------------------------------------

// == PnP SP ================================
import { sp, IItemAddResult } from "@pnp/sp/presets/all";
import {
  TextField, Dropdown, Toggle, Checkbox, PrimaryButton, DefaultButton, Panel,
  PanelType, Dialog, DialogType, DialogFooter, IDropdownOption, DropdownMenuItemType, IDropdownStyles, Stack, IStackTokens,
} from 'office-ui-fabric-react';

// ==========================================

//= end additional imports -----------------------------------


const options: IDropdownOption[] = [
  { key: 'apple', text: 'Apple' },
  { key: 'banana', text: 'Banana' },
  { key: 'orange', text: 'Orange', disabled: true },
  { key: 'grape', text: 'Grape' },
  { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
  { key: 'vegetablesHeader', text: 'Vegetables', itemType: DropdownMenuItemType.Header },
  { key: 'broccoli', text: 'Broccoli' },
  { key: 'carrot', text: 'Carrot' },
  { key: 'lettuce', text: 'Lettuce' },
];
export interface IActionButtonProps {

}
export interface IEmployeeProps {
  Id?:Number;
  Name: string;
  Address: string;
  Department: string;
  disabled?: boolean;
  checked?: boolean;
  formStatus: string;
}

const stackTokens: IStackTokens = { childrenGap: 20 };
export default class ReactWebpart extends React.Component<IReactWebpartProps, IEmployeeProps, IActionButtonProps> {
   constructor(props: IReactWebpartProps) {
    super(props);
    this.state = {
      Name: 'Tommy Pang',
      Address: '204 Hidden Circle NW',
      Department: 'Information Technology',
      formStatus: 'Ready...'  
    }
    this.handleNameField = this.handleNameField.bind(this);
    this.handleAddressField = this.handleAddressField.bind(this);
    this.handleDepartmentField = this.handleDepartmentField.bind(this);
    this.submitForm = this.submitForm.bind(this);


  }

  public render(): React.ReactElement<IReactWebpartProps> {

    return (
      <form>
        <div className={styles.reactWebpart}>
          <div className={styles.container}>
            <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
              <div className="ms-Grid-col ms-u-sm4 block">
                <label className="ms-Label title">Employee Name</label>
              </div>
              <div className="ms-Grid-col ms-u-sm8 block">
                <TextField value={this.state.Name} onBlur={this.handleNameField} />
              </div>
            </div>
            <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
              <div className="ms-Grid-col ms-u-sm4 block">
                <label className="ms-Label title">Address</label>
              </div>
              <div className="ms-Grid-col ms-u-sm8 block">
                <TextField value={this.state.Address} multiline onChanged={this.handleAddressField} />
              </div>
            </div>
            <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
              <div className="ms-Grid-col ms-u-sm4 block">
                <label className="ms-Label title">Department</label>
              </div>
              <div className="ms-Grid-col ms-u-sm8 block">
                <Dropdown placeHolder="Select a department"
                  defaultSelectedKey={this.state.Department}
                  options={[
                    { key: 'Information Technology', text: 'Information Technology' },
                    { key: 'Finances', text: 'Finances' },
                    { key: 'Human Resources', text: 'Human Resources' }]}
                    onChanged={this.handleDepartmentField}
                />
              </div>
            </div>
            <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>

              <Stack horizontal tokens={stackTokens}>

                <DefaultButton text="Delete" onClick={_alertClicked} allowDisabledFocus disabled={this.state.disabled} checked={this.state.checked} />
                <PrimaryButton text="Submit" onClick={this.submitForm} allowDisabledFocus disabled={this.state.disabled} checked={this.state.checked} />
              </Stack>
              Form Status: {this.state.formStatus}
            </div>
          </div>
        </div>
      </form>
    );
    function _alertClicked(): void {
      alert('Clicked');
    }

    
  }

  private handleNameField(ev: React.FocusEvent<HTMLInputElement>): void {
    return this.setState({      
        Name: ev.target.value   
    });
  }
  private handleAddressField(fieldValue: string): void {
    return this.setState({      
        Address: fieldValue   
    });
  }
  private handleDepartmentField = (item: IDropdownOption): void => {
    console.log('here is the things updating...' + item.key + ' ' + item.text + ' ' + item.selected);
    this.setState({ Department: item.text });
    
  }
  private submitForm(): void {
    this.setState({
      formStatus: 'Processing form'
    });

    sp.web.lists.getByTitle(this.props.description).items.add({
      'Title': `${this.state.Name} === ${new Date()}`,
      'EmployeeName':  `${this.state.Name}`,
      'Description': `${this.state.Address}`,
      'Department': `${this.state.Department}`
    }).then((result: IItemAddResult) => {
      //const item: IEmployeeProps = result.data as IEmployeeProps;
      this.setState({
        formStatus: `The item has been added with this new id: ${result.data.Id}`
      })
    })
  
  };


}
