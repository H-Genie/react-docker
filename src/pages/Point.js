import React, { useEffect } from "react"
import { Layout, Table, ConfigProvider, Typography } from "antd"
import withAuth from "hoc/withAuth"
import axios from "axios"

const { cellPaddingInlineSM } = Table
const { Title, Paragraph } = Typography
const { useState } = React

const columns = [
  // {
  //   title: "User ID",
  //   dataIndex: "userId",
  //   key: "userId",
  // },
  {
    title: "항목",
    dataIndex: "desc",
    key: "desc",
    align: "center"
  },
  {
    title: "금액",
    dataIndex: "amount",
    key: "amount",
    align: "center",
    render: text => {
      return (
        <b
          style={{
            textAlign: "right",
            color: text[0] === "-" ? "red" : "blue",
            display: "block"
          }}
        >
          {text}
        </b>
      )
    }
  },
  {
    title: "일시",
    dataIndex: "eventDate",
    key: "eventDate"
  }
]

function Point({ token }) {
  const [data, setData] = useState([])
  const [totalPoint, setTotalPoint] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` }

    setIsLoading(true)

    axios
      .get(`/api/affiliate/point`, { headers })
      .then(res => {
        const { point_list, total_point } = res.data

        setTotalPoint(total_point)

        let arr = []
        point_list.map((item, index) =>
          arr.push({
            id: index + 1,
            desc: item.desc,
            amount:
              item.type === "D"
                ? parseInt(item.point_amt).toLocaleString("ko-kr")
                : `-${parseInt(item.point_amt).toLocaleString("ko-kr")}`,
            eventDate: item.created_at
          })
        )

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
            <Title style={{ fontSize: "22px" }}>적립내역</Title>
            <Paragraph>사용자 구매에 따른 리워드 지급 내역입니다.</Paragraph>
            <Paragraph>합계 : {totalPoint}</Paragraph>
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

export default withAuth(Point, true)
