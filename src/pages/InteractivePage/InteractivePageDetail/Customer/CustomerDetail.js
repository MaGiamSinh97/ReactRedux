import React, {Component} from 'react';
import 'antd/dist/antd.css';
import { Table, Button, Popconfirm, Icon } from 'antd';
import * as header from '../../../../utils/HeaderTable';
import * as title from './../../../../utils/TitleFieldSearch';
import {connect}  from 'react-redux';
import CustomerForm  from './CustomerForm';
import CustomerSearch from './CustomerSearch';
import { creatCustomer, updateCustomer, deleteCustomer } from '../../../../actions/CustomerAction';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class CustomerDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            customer: {
                id: -1,
                name: '',
                phone: '',
                email: '',
                facebook: '',
                dateOfBirth: '',
                gender: '',
                address: '',
                customerType: '',
                taxCode: '',
                staffInCharge: '',
                note: '',
            },
            visible: false,
            isCreate: false,
            isDelete: false
        };
    }

    //Show customers
    getDataSoure = (customers) => {
        let dataSource = [];
        customers.map((customer,index) => {
            return dataSource.push({
                key: index,
                id: customer.id,
                name: customer.name,
                phone: customer.phone,
                email: customer.email,
                facebook: customer.facebook,
                dateOfBirth: customer.dateOfBirth,
                gender: customer.gender,
                address: customer.address,
                customerType: customer.customerType,
                taxCode: customer.taxCode,
                staffInCharge: customer.staffInCharge,
                note: customer.note,
                action: (
                    <div>
                        <Button type="primary" onClick={() => this.showUpdateModal(customer)}> Sửa </Button>
                        <Popconfirm
                            title="Are you sure?"
                            icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                            onConfirm={() => this.onClickDelete(customer.id)}
                        >
                            <Button type="danger" className="margin-left"> Xóa </Button>
                        </Popconfirm>
                    </div>
                )
            })
        })
        return dataSource;
    }

    // Show modal
    // Create
    showCreateModal = () => {
        let initCustomer = {
            id: -1,
            name: '',
            phone: '',
            email: '',
            facebook: '',
            dateOfBirth: '',
            gender: '',
            address: '',
            customerType: '',
            taxCode: '',
            staffInCharge: '',
            note: '',
        }
           
        this.setState({
            customer: initCustomer,
            visible: true,
            isCreate: true
        });
    };

    //update
    showUpdateModal = (curCustomer) => {
        this.setState({
          customer: curCustomer,
          visible: true,
          isCreate: false
        });
    };

    //delete
    onClickDelete = id => {  
        this.props.onClickDelete(id);
    }
    
    // Submit
    handleSubmit = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            const Customer = {
                id: this.state.Customer.id,
                name: values['name'].trim(),
                phone: values['phone'].trim(),
                email: values['email'].trim(),
                facebook: values['facebook'].trim(),
                dateOfBirth: values['dateOfBirth'].trim(),
                gender: values['gender'].trim(),
                address: values['address'].trim(),
                customerType: values['customerType'].trim(),
                taxCode: values['taxCode'].trim(),
                staffInCharge: values['staffInCharge'].trim(),
                note: values['note'].trim(),
            };
            this.state.isCreate ? 
            (this.props.onAddCustomer(Customer)) : 
            (this.props.onUpdateCustomer(Customer));
            form.resetFields();
            this.setState({
                visible: false
            });
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    //close form
    handleCancel = () => {
        const form = this.formRef.props.form;
        form.resetFields();
        this.setState({
          visible: false,
          isCreate: false
        });
    };

    render(){
        const { customers } = this.props || [];

         return (
            <div className="container">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <CustomerSearch listTitle={title.TitleSearchProductList}/>
                    <div className="border-content">
                        <Button onClick={this.showCreateModal} type="primary" className="margin-buttom-add">
                            Thêm khách hàng
                        </Button>

                        <CustomerForm 
                            visible={this.state.visible}
                            onCancel={this.handleCancel}
                            onSubmit={this.handleSubmit}
                            wrappedComponentRef={this.saveFormRef}
                            customer={this.state.customer}
                            isCreate={this.state.isCreate}
                        />

                        <Table
                            size= "small"
                            bordered = {true}
                            dataSource= {this.getDataSoure(customers)}
                            columns= {header.CustomerDetailTableHeader}
                            rowKey= {record => record.id}
                        />

                        <ToastContainer autoClose={2000} />
                    </div>
                </div>     
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        customers : state.customers
    }
}   

const mapDispatchToProps = dispatch => {
return {
  onClickDelete : id => {
    dispatch(deleteCustomer(id));
  },
  onAddCustomer : customer => {
      dispatch(creatCustomer(customer));
  },
  onUpdateCustomer : customer => {
      dispatch(updateCustomer(customer));
  },
};
};

export default connect(mapStateToProps,mapDispatchToProps) (CustomerDetail);
