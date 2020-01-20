import React, { Component } from 'react';
import { Modal, Form, Input, Col, Row, DatePicker, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import {NUMBER, EMAIL} from './../../../../constants/Regex'

const { Option } = Select;

const FormItem = Form.Item;

    class CustomerForm extends Component {

        validatorName = (rule, value, callback) => {
            if (value.trim().length > 50) {
                callback('Nhập nhỏ hơn 50 ký tự!');
                return;
            }
            callback();
        };

        validatorPhone = (rule, value, callback) => {
            if(!value.trim().match(NUMBER)) {
                callback('Vui lòng chỉ nhập số!');
                return;
            }
            callback();
        }

        validatorEmail = (rule, value, callback) => {
            if(!value.trim().toLowerCase().match(EMAIL)) {
                callback('Vui lòng nhập đúng định dạng ...@mail.com!');
                return;
            }
            callback();
        }

        validatorNote = (rule, value, callback) => {
            if (value.trim().length > 500) {
              callback('Please enter no more than 500 characters');
              return;
            }
            callback();
        };

        render() {
            const {
                visible,
                onCancel,
                onSubmit,
                form,
                customer,
                isCreate
            } = this.props;
            
            const { getFieldDecorator } = form;
            const formItemLayout = {
                labelCol: {
                xs: { span: 9 },
                sm: { span: 9 }
                },
                wrapperCol: {
                xs: { span: 15 },
                sm: { span: 15 }
                }
            };
            return (
                <div>
                    <Modal
                    visible={visible}
                    title="Nhập khách hàng"
                    okText={isCreate ? 'Add' : 'Save'}
                    style={{ top: 40 }}
                    onCancel={onCancel}
                    onOk={onSubmit}
                    maskClosable={false}
                    >
                        <div>
                            <Form layout="vertical">
                                <Row gutter={24}>
                                    <Col span={12}>
                                        <FormItem {...formItemLayout} label="Tên khách hàng:">
                                            {getFieldDecorator('name', {
                                            rules: [
                                                { required: true, message: 'Nhập tên khách hàng!' },
                                                { validator: this.validatorName }
                                            ],
                                            initialValue: customer.name
                                            })(<Input placeholder="Nhập tên khách hàng" />)}
                                        </FormItem>
                                    </Col>
                                    <Col span={12}>
                                        <FormItem {...formItemLayout} label="Số điện thoại:">
                                            {getFieldDecorator('phone', {
                                            rules: [
                                                {
                                                validator: this.validatorPhone
                                                }
                                            ],
                                            initialValue: customer.phone
                                            })(<Input placeholder="Nhập số điện thoại" />)}
                                        </FormItem>
                                    </Col>
                                </Row>
                                
                                <Row gutter={24}>
                                    <Col span={12}>
                                        <FormItem {...formItemLayout} label="Email:">
                                            {getFieldDecorator('email', {
                                            rules: [
                                                {
                                                validator: this.validatorEmail
                                                }
                                            ],
                                            initialValue: customer.email
                                            })(<Input placeholder="Nhập Email" />)}
                                        </FormItem>
                                    </Col>
                                    <Col span={12}>
                                        <FormItem {...formItemLayout} label="Ngày sinh:">
                                            {getFieldDecorator('dateofbirth', {
                                            rules: [
                                                {
                                                validator: this.validatorEmail
                                                }
                                            ],
                                            initialValue: customer.dateofbirth
                                            })(<DatePicker placeholder="Nhập ngày sinh" />)}
                                        </FormItem>
                                    </Col>
                                </Row>

                                <Row gutter={24}>
                                    <Col span={12}>
                                        <FormItem {...formItemLayout} label="Giới tính:">
                                            {getFieldDecorator('gender', {
                                            initialValue: customer.gender === '' ? "true" : customer.gender
                                            })(
                                                <Select size="default">
                                                    <Option key="true">Nam</Option>
                                                    <Option key="false">Nữ</Option>
                                                </Select>
                                                )}
                                        </FormItem>
                                    </Col>
                                    <Col span={12}>
                                        <FormItem {...formItemLayout} label="Địa chỉ:">
                                            {getFieldDecorator('address', {
                                            rules: [
                                                { required: true, message: 'Nhập địa chỉ khách hàng!' },
                                                { validator: this.validatorName }
                                            ],
                                            initialValue: customer.address
                                            })(<Input placeholder="Nhập địa chỉ" />)}
                                        </FormItem>
                                    </Col>
                                </Row>

                                <Row gutter={24}>
                                    <Col span={12}>
                                        <FormItem {...formItemLayout} label="Loại khách hàng:">
                                            {getFieldDecorator('customerType', {
                                            initialValue: customer.customerType === '' ? "true" : customer.customerType
                                            })(
                                            <Select size="default">
                                                <Option key="true">Công ty</Option>
                                                <Option key="false">Cá nhân</Option>
                                            </Select>
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col span={12}>
                                        <FormItem {...formItemLayout} label="Mã số thuế:">
                                            {getFieldDecorator('taxCode', {
                                            rules: [
                                                {
                                                validator: this.validatorEmail
                                                }
                                            ],
                                            initialValue: customer.taxCode
                                            })(<Input placeholder="Nhập mã số thuế" />)}
                                        </FormItem>
                                    </Col>
                                </Row>

                                <Row gutter={24}>
                                    <Col span={12}>
                                        <FormItem {...formItemLayout} label="Người nhập:">
                                            {getFieldDecorator('staffInCharge', {
                                            initialValue: customer.staffInCharge
                                            })(<Input placeholder="Nhập người nhập" />)}
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={24}>
                                        <FormItem label="Ghi chú:">
                                            {getFieldDecorator('note', {
                                                rules: [{ validator: this.validatorNote }],
                                                initialValue: customer.note
                                            })(
                                                <TextArea
                                                autosize={{ minRows: 6, maxRows: 6 }}
                                                placeholder="Nhập ghi chú..."
                                                />
                                            )}
                                        </FormItem>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </Modal>
                </div>
            );         
        }
    }

    export default Form.create()(CustomerForm);