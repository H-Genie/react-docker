import React from "react"
import axios from "axios"
import {
  Divider,
  Layout,
  Button,
  ConfigProvider,
  Typography,
  Form,
  Input,
  message
} from "antd"
import { useNavigate } from "react-router-dom"
import withAuth from "hoc/withAuth"

function Login() {
  const { Title, Paragraph } = Typography
  const navigate = useNavigate()

  const onFinish = async values => {
    await axios
      .post(`/api/affiliate/login`, values)
      .then(res => {
        if (res.data.status === "success") {
          window.sessionStorage.setItem("token", res.data.data.api_token)
          navigate("/point")
        } else {
          return message.warning(res.data.message)
        }
      })
      .catch(err => console.log(err))
  }

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo)
  }
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            cellPaddingInlineSM: "20px"
          },
          Typography: {
            paddingInline: "20px;"
          }
        }
      }}
    >
      <Layout style={{ minHeight: "100vh" }}>
        <Layout>
          <Typography style={{ paddingLeft: "20px", textAlign: "center" }}>
            <img
              src="./ktc_logtype_logo.png"
              alt="logo"
              style={{ width: 64, marginTop: 16 }}
            />
            <Title style={{ fontSize: "22px" }}>
              Korea Travel Card Reward Program
            </Title>

            <Paragraph>배정받으신 ID / Password로 로그인해 주세요.</Paragraph>
          </Typography>

          <Divider style={{ marginTop: 0 }} />

          <Layout style={{ paddingLeft: 22, paddingRight: 22 }}>
            <Form
              name="basic"
              labelCol={{
                span: 8
              }}
              wrapperCol={{
                span: 16
              }}
              style={{
                maxWidth: 600,
                margin: "0 auto"
              }}
              initialValues={{
                remember: true
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!"
                  }
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!"
                  }
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16
                }}
              >
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}

export default withAuth(Login, false)
