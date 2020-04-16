import * as React from 'react';
import styles from './ReactWebpart.module.scss';
import { IReactWebpartProps } from './IReactWebpartProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { TextField, Dropdown, Toggle, Checkbox, PrimaryButton, DefaultButton, Panel, PanelType, Dialog, DialogType, DialogFooter, IDropdownOption } from 'office-ui-fabric-react';

export default class ReactWebpart extends React.Component<IReactWebpartProps, {}> {
  public render(): React.ReactElement<IReactWebpartProps> {
    return (
      <form>
        <div className={styles.reactWebpart}>
          <div className={styles.container}>
            <div className="ms-Grid-col ms-u-sm4 block">
              <label className="ms-Label title">Employee Name</label>
            </div>
            <div className="ms-Grid-col ms-u-sm8 block">
              <TextField value='Test' />
            </div>
            <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>

              <TextField value='Testing' label='Name:' />

            </div>
          </div>
        </div>
      </form>
    );
  }
}
