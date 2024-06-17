import React, { useEffect } from "react"
import { Layout, Table, ConfigProvider, Typography } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import withAuth from "hoc/withAuth"
import axios from "axios"

const { cellPaddingInlineSM } = Table
const { Title, Paragraph } = Typography
const { useState } = React

const tableStoreNameStyle = {
  color: "black",
  fontWeight: "bold"
}

const tableStoreStyle = {
  fontSize: 13,
  color: "gray"
}

const tableRewardRatioStyle = {
  color: "#E7211B",
  fontSize: 18,
  fontWeight: "bold"
}

const columns = [
  {
    title: "매장",
    dataIndex: "store",
    key: "store",
    render: text => {
      return (
        <div style={tableStoreStyle}>
          <span style={tableStoreNameStyle}>{text[0]}</span>{" "}
          <a
            href={`https://redtable.global/food/${text[2]}`}
            target="_blank"
            rel="noreferrer"
          >
            <SearchOutlined />
          </a>
          <br />
          {text[1]}
          <br />
          <span>{text[3]}</span>
        </div>
      )
    }
  },
  {
    title: "적립율",
    dataIndex: "rewardRatio",
    key: "rewardRatio",
    align: "center",
    render: text => {
      return <span style={tableRewardRatioStyle}>{text}</span>
    }
  }
]

function StoreList({ token }) {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` }

    setIsLoading(true)

    axios
      .get(`/api/affiliate/paybackstore`, { headers })
      .then(res => {
        const { store_list } = res.data

        let arr = []
        // eslint-disable-next-line array-callback-return
        store_list.map((item, index) => {
          item.id !== 10002 &&
            arr.push({
              key: index + 1,
              store: [
                `${item.name} ${item.branch_name ?? ""}`,
                item.address,
                item.id,
                "음식점"
              ],
              rewardRatio: `${item.reward_ratio}%`
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
            <Title style={{ fontSize: "22px" }}>대상매장</Title>

            <Paragraph>리워드 가능한 매장 리스트입니다.</Paragraph>
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

export default withAuth(StoreList, true)
