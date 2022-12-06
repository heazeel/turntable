import React, { useEffect } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, message } from 'antd';

import './index.css';

const color1 = '#e9e8fe';
const color2 = '#b8c5f2';

const FormTable = (props) => {
  const { prizes, setPrizes } = props;
  const [form] = Form.useForm();

  const onFinish = (values) => {
    let res = values.foods.map((item, index) => {
      return {
        background: index % 2 ? color2 : color1,
        fonts: [{ text: item.name, top: '50px' }],
        range: item.range ? item.range : 1
      };
    });
    setPrizes(res);
    localStorage.setItem('prizes', JSON.stringify(res));
    message.success('修改成功！');
  };

  useEffect(() => {
    if (prizes) {
      let values = prizes.map((item) => {
        let name = item.fonts[0].text;
        let range = item.range;
        return { name, range };
      });
      form.setFieldValue('foods', values);
    }
  }, [form, prizes]);

  return (
    <div className="turntable_form">
      <Form form={form} name="dynamic_form_complex" onFinish={onFinish} autoComplete="off">
        <Form.List name="foods">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} align="start">
                  <Form.Item
                    {...restField}
                    label="菜名名称"
                    name={[name, 'name']}
                    rules={[{ required: true, message: '请填写名称' }]}
                    wrapperCol={{ span: 24 }}
                  >
                    <Input placeholder="请输入名称" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    label="比例"
                    name={[name, 'range']}
                    rules={[{ required: true, message: '请填写比例' }]}
                    wrapperCol={{ span: 24 }}
                  >
                    <Input placeholder="一位正整数" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}

              <Form.Item wrapperCol={{ span: 24 }}>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  增加菜品
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item wrapperCol={{ span: 24 }}>
          <Button type="primary" block htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormTable;
