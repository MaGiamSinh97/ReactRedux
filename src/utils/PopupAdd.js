import React, {Component} from 'react';
import 'antd/dist/antd.css';
import { Modal } from 'antd';

class PopupAdd extends Component {  
    constructor(props) {
        super(props);
        this.state = {
            ModalText: 'Content of the modal',
            visible: true,
            confirmLoading: true,
        };
    }
    
    
      handleOk = () => {
        this.setState({
          ModalText: 'The modal will be closed after two seconds',
          confirmLoading: true,
        });
        setTimeout(() => {
          this.setState({
            visible: false,
            confirmLoading: false,
          });
        }, 2000);
      };
    
      handleCancel = async () => {
        console.log('Clicked cancel button');
        await this.setState({
          visible: false,
        });
      };
    
      render() {
        const { visible, confirmLoading, ModalText } = this.state;
        return (
          <div>
            <Modal
              title="Title"
              visible={visible}
              onOk={() => this.handleOk()}
              confirmLoading={confirmLoading}
              onCancel={() => {this.handleCancel()}}
            >
              <p>{ModalText}</p>
            </Modal>
          </div>
        );
      }
}

export default PopupAdd;