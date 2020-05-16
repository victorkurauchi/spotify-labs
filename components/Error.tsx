import React from 'react';
import Link from 'next/link'
import { Row, Col, Typography, Alert } from 'antd'

const { Text } = Typography

type Props = {
  msg: string;
}

const ErrorHint = ({ msg }: Props) => (
  <>
    <Row>
      <Col span={12} offset={6}>
        <Alert
          message="Error"
          description={msg}
          type="error"
          showIcon
        />
      </Col>
    </Row>
    <Row>
      <Col span={12} offset={6}>
        <Link href="/">
          <a>Please return to login again.</a>
        </Link>
      </Col>
    </Row>
  </>
)

export default ErrorHint
