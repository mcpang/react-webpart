import * as React from 'react';
import styles from './ReactWebpart.module.scss';
import { IReactWebpartProps } from './IReactWebpartProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {
  TextField, Dropdown, Toggle, Checkbox, PrimaryButton, DefaultButton, Panel,
  PanelType, Dialog, DialogType, DialogFooter, IDropdownOption, DropdownMenuItemType, IDropdownStyles, Stack, IStackTokens,
} from 'office-ui-fabric-react';
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
      Name: 'Enter first and last name',
      Address: '',
      Department: '',
      formStatus: ''  
    }
    this.handleNameField = this.handleNameField.bind(this);
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
                <TextField value={this.state.Name} onChanged={this.handleNameField} />
              </div>
            </div>
            <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
              <div className="ms-Grid-col ms-u-sm4 block">
                <label className="ms-Label title">Address</label>
              </div>
              <div className="ms-Grid-col ms-u-sm8 block">
                <TextField value='204 Hidden circle NW' multiline />
              </div>
            </div>
            <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
              <div className="ms-Grid-col ms-u-sm4 block">
                <label className="ms-Label title">Department</label>
              </div>
              <div className="ms-Grid-col ms-u-sm8 block">
                <Dropdown placeHolder="Select a department"
                  defaultSelectedKey="Finance"
                  options={[
                    { key: 'IT', text: 'IT' },
                    { key: 'Finances', text: 'Finances' },
                    { key: 'Marketings', text: 'Marketings' }]}
                />
              </div>
            </div>
            <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>

              <Stack horizontal tokens={stackTokens}>
                <DefaultButton text="Cancel" onClick={_alertClicked} allowDisabledFocus disabled={this.state.disabled} checked={this.state.checked} />
                <PrimaryButton text="Submit" onClick={this.submitForm} allowDisabledFocus disabled={this.state.disabled} checked={this.state.checked} />
              </Stack>
            </div>
          </div>
        </div>
      </form>
    );
    function _alertClicked(): void {
      alert('Clicked');
    }

    
  }

  private handleNameField(fieldValue: string): void {
    return this.setState({      
        Name: fieldValue   
    });
  }
  private submitForm(): void {
    this.setState({
      formStatus: 'Processing form'
    });

    alert('the value of the name field:' + this.state.Name);


  };


}
