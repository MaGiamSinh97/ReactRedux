import React, {Component} from 'react';
import { Form, Row, Col, Input, Button } from 'antd';

class CustomerSearch extends Component {    

    getFields = (title) => {
		const { getFieldDecorator } = this.props.form;
		const children = [];
        for (let i = 0; i < title.length; i++) {
          children.push(
            <Col span={8} key={i}>
              <Form.Item label={`${title[i]}`}>
                {getFieldDecorator(`field${i}`, {
                  rules: [
                    {
                      required: false,
                      message: 'Input something!',
                    },
                  ],
                })(<Input placeholder="placeholder" />)}
              </Form.Item>
            </Col>,
          );
        }
        return children;
    }
    
    handleSearch = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
		  console.log('Received values of form: ', values);
        });
    };
    
    handleReset = () => {
        this.props.form.resetFields();
	};
	  
    render() {
        return (
          <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
            <Row gutter={24}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                {this.getFields(this.props.listTitle)}
              </Col>	
            </Row>
            <Row>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Button type="primary" htmlType="submit">
                  Search
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                  Clear
                </Button>
              </Col>
            </Row>
          </Form>
        );
    } 
}

export default Form.create()(CustomerSearch);

