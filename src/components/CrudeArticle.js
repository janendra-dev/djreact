import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

const CrudeArticle = (props) => {
 let history=useHistory();
  const [form] = Form.useForm();
  // styling form.....................................
  const [formLayout, setFormLayout] = useState('horizontal');
  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };

  const formItemLayout =
    formLayout === 'horizontal'
      ? {
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 10,
        },
      }
      : null;
  const buttonItemLayout =
    formLayout === 'horizontal'
      ? {
        wrapperCol: {
          span: 14,
          offset: 4,
        },
      }
      : null;
  // for data entry and update............................
  
  const EntryData = (event, requestType, articleID) => {
    // event.preventDefault();
   
    const data = { title: event.title, content: event.content };
    switch (requestType) {
      case 'post':
        console.log(event);
        return axios.post('http://127.0.0.1:8000/api/', data)
          .then((response) => console.log(response),history.go(0))
          .catch((error) => console.log(error));
      case 'put':
        console.log(event);
        const url = 'http://127.0.0.1:8000/api/' + articleID + "/";
        return axios.put(url, data)
          .then(response => console.log(response),history.go(0))
          .catch(error => console.log(error));
          
      default:
        return 'fail';
    }
     
  }

  return (
    <>
      <Form
        {...formItemLayout}
        layout={formLayout}
        form={form}
        initialValues={{
          layout: formLayout,
        }}
        onValuesChange={onFormLayoutChange}
        onFinish={(event) => EntryData(
          event,
          props.requestType,
          props.articleID
        )}

      >
        <Form.Item label="Title" name='title' >
          <Input placeholder="Enter title" />
        </Form.Item>
        <Form.Item label="Content" name='content'>
          <Input placeholder="Enter content" />
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button type="primary" htmlType='submit'>{props.btx}</Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default CrudeArticle;
