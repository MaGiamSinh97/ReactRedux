import React, {Component} from 'react';
import 'antd/dist/antd.css';
import { Table, Button, Popconfirm, Icon } from 'antd';
import AdvancedSearchForm from './AdvancedSearchForm';
import * as title from './../../../utils/TitleFieldSearch';
import * as header from './../../../utils/HeaderTable';
import {connect}  from 'react-redux';
import ProducDetailActionForm  from './ProductDetailActionForm';
import { deleteProduct, creatProduct, updateProduct } from './../../../actions/ProductActions';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


class ProductDetail extends Component {    

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            product: {
                id: -1,
                productName: '',
                priceCost: 0,
                price: 0,
                status: true,
            },
            visible: false,
            isCreate: false,
            isDelete: false
        };
    }

    //Show products
    getDataSoure = (products) => {
        let dataSource = [];
        if(products.length>0){
            products.map((product,index) => {
                return dataSource.push({
                    key: index,
                    id: index+1,
                    productName: product.productName,
                    priceCost: product.priceCost,
                    price: product.price,               
                    status: product.status==true?'true':'false',                
                    action: (
                        <div>
                            <Button type="primary" onClick={() => this.showUpdateModal(product)}> Sửa </Button>
                            <Popconfirm
                                title="Are you sure?"
                                icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                                onConfirm={() => this.onClickDelete(product.productId)}
                            >
                                <Button type="danger" className="margin-left"> Xóa </Button>
                            </Popconfirm>
                        </div>
                    )
                })
            })
        }
        
        return dataSource;
    }

    // Show modal
    // Create
    showCreateModal = () => {
        let initProduct = {
            id: -1,
            productName: '',
            priceCost: 0,
            price: 0,
        }
           
        this.setState({
            product: initProduct,
            visible: true,
            isCreate: true
        });
    };

    //update
    showUpdateModal = (curProduct) => {
        console.log(curProduct)
        this.setState({
          product: curProduct,
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
            const product = {   
                productId: this.state.product.productId,             
                productName: values['productName'].trim(),
                priceCost: values['priceCost'],
                price: values['price'],
                status: values['status']==true?1:0,
                productTypeId: values['productTypeId'],
                unitId:values['unitId'],
            };
            this.state.isCreate ? 
            (this.props.onAddProduct(product)) : 
            (this.props.onUpdateProduct(product));
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

    render() {  
        const { products } = this.props || [];      
        return (
            <div className="container">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <AdvancedSearchForm listTitle={title.TitleSearchProductList}/>
                    <div className="border-content">
                        <Button onClick={this.showCreateModal} type="primary" className="margin-buttom-add">
                            Thêm sản phẩm
                        </Button>

                        <ProducDetailActionForm 
                            visible={this.state.visible}
                            onCancel={this.handleCancel}
                            onSubmit={this.handleSubmit}
                            wrappedComponentRef={this.saveFormRef}
                            product={this.state.product}
                            isCreate={this.state.isCreate}
                        />

                        <Table
                            size= "small"
                            bordered = {true}
                            dataSource= {this.getDataSoure(products).reverse()}
                            columns= {header.ProductDetailTableHeader}
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
            products : state.products
        }
}   

const mapDispatchToProps = dispatch => {
    return {
      onClickDelete : id => {
        dispatch(deleteProduct(id));
      },
      onAddProduct : product => {
          dispatch(creatProduct(product));
      },
      onUpdateProduct : product => {
          dispatch(updateProduct(product));
      },
    };
  };
export default connect(mapStateToProps,mapDispatchToProps) (ProductDetail);
