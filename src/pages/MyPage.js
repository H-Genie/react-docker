import React, { useEffect } from "react"
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
import withAuth from "hoc/withAuth"
import axios from "axios"

const { Title, Paragraph } = Typography
const { useState } = React

function MyPage({ token }) {
  const [form] = Form.useForm()

  const [profile, setProfile] = useState(null)
  const headers = { Authorization: `Bearer ${token}` }
  const passwordChange = (
    <span style={{ color: "red" }}>* 변경시에만 입력해주세요</span>
  )

  useEffect(() => {
    axios
      .get(`/api/affiliate/profile`, { headers })
      .then(res => setProfile(res.data.profile))
      .catch(err => console.log(err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = async () => {
    const {
      affiliate_txt_id,
      bank_account_name,
      bank_account_num,
      password,
      password_confirm
    } = form.getFieldsValue()

    const validator = [affiliate_txt_id, bank_account_num, bank_account_name]
    if (validator.includes(undefined) || validator.includes(""))
      return message.warning("모든 정보를 입력해주세요.")

    if (password !== password_confirm)
      return message.warning("비밀번호가 일치하지 않습니다.")

    const data = {
      password,
      bank_account_num,
      bank_account_name
    }
    await axios
      .put("/api/affiliate/profile", { ...data }, { headers })
      .then(res => {
        if (res.data.result) {
          message.success("수정하였습니다.")
          form.setFieldValue("bank_account_num", bank_account_num)
          form.setFieldValue("bank_account_name", bank_account_name)
          form.setFieldValue("password", undefined)
          form.setFieldValue("password_confirm", undefined)
        } else message.warning("다시 시도해주세요.")
      })
      .catch(err => console.log(err))
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
      <Layout>
        <Layout>
          <Typography style={{ paddingLeft: "20px" }}>
            <Title style={{ fontSize: "22px" }}>My Page</Title>

            <Paragraph>
              내 정보 관리페이지입니다.
              <br />
              입력하신 계좌정보는 다음달 정산부터 적용됩니다.
            </Paragraph>
          </Typography>

          <Divider style={{ marginTop: 0 }} />

          <Layout style={{ paddingLeft: 22, paddingRight: 22 }}>
            {profile && (
              <Form form={form} layout="vertical">
                <Form.Item
                  label="추천인 코드"
                  name="affiliate_txt_id"
                  required
                  initialValue={profile.affiliate_txt_id}
                >
                  <Input
                    placeholder="내 추천인 코드"
                    style={{ width: 160, marginRight: 5 }}
                    disabled
                  />
                </Form.Item>
                <Form.Item
                  label="계좌정보"
                  name="bank_account_num"
                  initialValue={profile.bank_account_num}
                >
                  <Input placeholder="은행, 계좌번호" allowClear />
                </Form.Item>
                <Form.Item
                  label="계좌주"
                  name="bank_account_name"
                  initialValue={profile.bank_account_name}
                >
                  <Input
                    placeholder="계좌주 이름을 입력해 주세요."
                    allowClear
                  />
                </Form.Item>

                {passwordChange}
                <Form.Item label="비밀번호" name="password">
                  <Input.Password
                    placeholder="변경할 비밀번호를 입력해주세요."
                    allowClear
                  />
                </Form.Item>

                <Form.Item label="비밀번호 확인" name="password_confirm">
                  <Input.Password
                    placeholder="변경할 비밀번호를 다시 입력해주세요."
                    allowClear
                  />
                </Form.Item>

                <Button type="primary" danger block onClick={onSubmit}>
                  정보수정
                </Button>
              </Form>
            )}
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}

export default withAuth(MyPage, true)
