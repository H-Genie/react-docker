import React, { useEffect } from "react"
import { Layout, Table, ConfigProvider, Typography } from "antd"
import withAuth from "hoc/withAuth"
import axios from "axios"

const { cellPaddingInlineSM } = Table
const { Title, Paragraph } = Typography
const { useState } = React

const tableAccountStyle = {
  fontSize: 13,
  color: "gray"
}

const tableAmountStyle = {
  fontSize: 20,
  fontWeight: 700,
  color: "red"
}

const columns = [
  {
    title: "정산월",
    dataIndex: "yearMonth",
    key: "yearMonth",
    align: "center"
  },
  {
    title: "계좌,금액",
    dataIndex: "amount",
    key: "amount",
    align: "right",
    render: text => {
      return (
        <div style={tableAccountStyle}>
          {text[0]}
          <br />
          <span style={tableAmountStyle}>{text[1]}</span>
        </div>
      )
    }
  },
  {
    title: "정산일",
    dataIndex: "eventDate",
    key: "eventDate",
    align: "center"
  }
]

function WithdrawList({ token }) {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` }

    setIsLoading(true)

    axios
      .get(`/api/affiliate/settle`, { headers })
      .then(res => {
        const { settle_list } = res.data

        let arr = []
        // eslint-disable-next-line array-callback-return
        settle_list.map((item, index) => {
          arr.push({
            key: index + 1,
            yearMonth: item.settle_year_month,
            amount: [
              item.bank_account_num,
              parseInt(item.amount).toLocaleString("ko-kr")
            ],
            eventDate: item.created_at
          })
        })

        setData(arr)
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
            <Title style={{ fontSize: "22px" }}>정산내역</Title>
            <Paragraph>매월 정산된 리워드 포인트 내역입니다.</Paragraph>
          </Typography>

          <Table
            columns={columns}
            dataSource={data}
            size="small"
            pagination={false}
            style={{ cellPaddingInlineSM }}
            loading={isLoading}
          />
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}

export default withAuth(WithdrawList, true)
