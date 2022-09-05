import React from 'react'
import {PageHeader,Steps} from 'antd'
const { Step } = Steps;
export default function NewsAdd() {
  return (
    <div>
      <PageHeader
        className="site-page-header"
        subTitle="This is a subtitle"
        title="撰写新闻"
      />
      <Steps current={1}>
        <Step description="This is a description." title="Finished" />
        <Step description="This is a description." subTitle="Left 00:00:08" title="In Progress" />
        <Step description="This is a description." title="Waiting" />
      </Steps>
    </div>
  )
}
