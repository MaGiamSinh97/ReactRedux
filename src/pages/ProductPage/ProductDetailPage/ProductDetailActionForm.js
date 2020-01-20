import React, { Component } from 'react';
import { Modal, Form, Input, InputNumber, Radio, Menu, Select } from 'antd';
import { getListCategory } from '../../../actions/ProductActions';
import { connect } from 'react-redux';
import axios from 'axios';

const FormItem = Form.Item;
const { Option } = Select;
var menuItems = [];
axios.get('http://192.168.33.202:8080/productType').then((response) => {
    menuItems = response.data
});
var unitItems = [];
axios.get('http://192.168.33.202:8080/unit').then((response) => {
    unitItems = response.data
});

class ProductDetaiActionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            category: {
                productTypeId: -1,
                productTypeName: '',
            },
        };

    }
    validatorName = (rule, value, callback) => {
        if (value.trim().length > 50) {
            callback('Please enter no more than 50 characters');
            return;
        }
        callback();
    };

    // onDelete = () => {
    //     this.props.onDelete(this.props.product.id);
    // };

    render() {
        const {
            visible,
            onCancel,
            onSubmit,
            form,
            product,
            isCreate
        } = this.props;     
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 5 },
                sm: { span: 5 }
            },
            wrapperCol: {
                xs: { span: 19 },
                sm: { span: 19 }
            }
        };
        return (
            <div className="custom-modal">
                <Modal
                    visible={visible}
                    title="Nhập sản phẩm"
                    okText={isCreate ? 'Add' : 'Save'}
                    style={{ top: 40 }}
                    onCancel={onCancel}
                    onOk={onSubmit}
                    maskClosable={false}
                // footer={[
                //     <Button key="cancel" onClick={onCancel}>
                //     Cancel
                //     </Button>,
                //     <Button key="submit" type="primary" onClick={onSubmit}>
                //     {isCreate ? 'Add' : 'Save'}
                //     </Button>,
                //     isCreate ? (
                //     <br key="br" />
                //     ) : (
                //     <Popconfirm
                //         key="confirm"
                //         title="Are you sure delete this product?"
                //         onConfirm={this.onDelete}
                //         okText="Yes"
                //         cancelText="No"
                //     >
                //         <Button style={{ float: 'left' }}>
                //         <Icon type="delete" />
                //         </Button>
                //     </Popconfirm>
                //     )
                // ]}
                >
                    <div className="custom-form">
                        <Form layout="vertical">
                            
                            <FormItem {...formItemLayout} label="ProductName">
                                {getFieldDecorator('productName', {
                                    rules: [
                                        { required: true, message: 'Please input the name!' },
                                        { validator: this.validatorName }
                                    ],
                                    initialValue: product.productName
                                })(<Input placeholder="Input ProductName" />)}
                            </FormItem>

                            <FormItem {...formItemLayout} label="PriceCost">
                                {getFieldDecorator('priceCost', {
                                    rules: [
                                        {
                                            type: 'number',
                                            required: true,
                                            message: 'Please input a number from 0 to 10000000!'
                                        }
                                    ],
                                    initialValue: product.priceCost
                                })(<InputNumber min={0} max={10000000} />)}
                            </FormItem>
                            <FormItem {...formItemLayout} label="Price">
                                {getFieldDecorator('price', {
                                    rules: [
                                        {
                                            type: 'number',
                                            required: true,
                                            message: 'Please input a number from 0 to 10000000!'
                                        }
                                    ],
                                    initialValue: product.price
                                })(<InputNumber min={0} max={10000000} />)}
                            </FormItem>

                            <Form.Item {...formItemLayout} label="Status">
                                {getFieldDecorator('status', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please choose status!'
                                        }
                                    ],
                                    initialValue: product.status,
                                })(
                                    <Radio.Group>
                                        <Radio value={true}>True</Radio>
                                        <Radio value={false}>False</Radio>
                                    </Radio.Group>,
                                    
                                )}
                            </Form.Item>
                            <Form.Item {...formItemLayout} label="Category">
                                {getFieldDecorator('productTypeId', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please choose category!'
                                        }
                                    ],
                                    initialValue: product.productTypeId,
                                })(
                                    <Select>
                                        {menuItems.map((item) =>
                                            <Option key={item} value={item.productTypeId}>{item.productTypeName}</Option>
                                        )}
                                    </Select>
                                )}
                            </Form.Item>
                            <Form.Item {...formItemLayout} label="Unit">
                                {getFieldDecorator('unitId', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please choose unit!'
                                        }
                                    ],
                                    initialValue: product.unitId,
                                })(
                                    <Select>
                                        {unitItems.map((item) =>
                                            <Option key={item} value={item.unitId}>{item.unitName}</Option>
                                        )}
                                    </Select>
                                )}
                            </Form.Item>

                        </Form>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default Form.create()(ProductDetaiActionForm);
