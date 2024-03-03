import Link from 'next/link'
import { CloseCircleOutlined } from '@ant-design/icons'
import { Row, Col, Result, Button, Typography } from 'antd'
import { PageHeaders } from '@/components/page-headers'

const { Paragraph, Text } = Typography
function Results() {
    const PageRoutes = [
        {
            path: '/admin',
            breadcrumbName: 'Dashboard',
        },
        {
            path: '',
            breadcrumbName: 'Results',
        },
    ]
    return (
        <>
            <PageHeaders
                className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
                title="Results"
                routes={PageRoutes}
            />
            <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
                <Row gutter={25}>
                    <Col md={12} xs={24}>
                        <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                            <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                                    Success
                                </h1>
                            </div>
                            <div className="p-[25px]">
                                <Result
                                    className="p-0"
                                    status="success"
                                    title="Successfully Purchased Cloud Server ECS!"
                                    subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
                                    extra={[
                                        <Button type="primary" key="console">
                                            Go Console
                                        </Button>,
                                        <Button
                                            key="buy"
                                            className="dark:text-white/[.87] dark:hover:text-info"
                                        >
                                            Buy Again
                                        </Button>,
                                    ]}
                                />
                            </div>
                        </div>
                        <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                            <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                                    Warning
                                </h1>
                            </div>
                            <div className="p-[25px]">
                                <Result
                                    status="warning"
                                    title="There are some problems with your operation."
                                    className="p-0"
                                    extra={
                                        <Button type="primary" key="console">
                                            Go Console
                                        </Button>
                                    }
                                />
                            </div>
                        </div>
                        <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                            <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                                    404
                                </h1>
                            </div>
                            <div className="p-[25px]">
                                <Result
                                    status="404"
                                    title="404"
                                    subTitle="Sorry, the page you visited does not exist."
                                    className="p-0"
                                    extra={
                                        <Button type="primary">
                                            Back Home
                                        </Button>
                                    }
                                />
                            </div>
                        </div>
                        <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                            <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                                    Error
                                </h1>
                            </div>
                            <div className="p-[25px]">
                                <Result
                                    status="error"
                                    title="Submission Failed"
                                    subTitle="Please check and modify the following information before resubmitting."
                                    className="p-0"
                                    extra={[
                                        <Button type="primary" key="console">
                                            Go Console
                                        </Button>,
                                        <Button
                                            className="dark:text-white/[.87] dark:hover:text-info"
                                            key="buy"
                                        >
                                            Buy Again
                                        </Button>,
                                    ]}
                                >
                                    <div className="desc">
                                        <Paragraph>
                                            <Text
                                                strong
                                                style={{
                                                    fontSize: 16,
                                                }}
                                            >
                                                The content you submitted has
                                                the following error:
                                            </Text>
                                        </Paragraph>
                                        <Paragraph className="flex items-center gap-1">
                                            <CloseCircleOutlined
                                                style={{ color: 'red' }}
                                            />{' '}
                                            Your account has been frozen
                                            <Link href="#">
                                                Thaw immediately &gt;
                                            </Link>
                                        </Paragraph>
                                        <Paragraph className="flex items-center gap-1">
                                            <CloseCircleOutlined
                                                style={{ color: 'red' }}
                                            />{' '}
                                            Your account is not yet eligible
                                            href apply{' '}
                                            <Link href="#">
                                                Apply Unlock &gt;
                                            </Link>
                                        </Paragraph>
                                    </div>
                                </Result>
                            </div>
                        </div>
                    </Col>
                    <Col md={12} xs={24}>
                        <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                            <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                                    Info
                                </h1>
                            </div>
                            <div className="p-[25px]">
                                <Result
                                    title="Your operation has been executed"
                                    className="p-0"
                                    extra={
                                        <Button type="primary" key="console">
                                            Go Console
                                        </Button>
                                    }
                                />
                            </div>
                        </div>
                        <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                            <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                                    403
                                </h1>
                            </div>
                            <div className="p-[25px]">
                                <Result
                                    status="403"
                                    title="403"
                                    subTitle="Sorry, you are not authorized to access this page."
                                    className="p-0"
                                    extra={
                                        <Button type="primary">
                                            Back Home
                                        </Button>
                                    }
                                />
                            </div>
                        </div>
                        <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                            <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                                    500
                                </h1>
                            </div>
                            <div className="p-[25px]">
                                <Result
                                    status="500"
                                    title="500"
                                    subTitle="Sorry, the server is wrong."
                                    className="p-0"
                                    extra={
                                        <Button type="primary">
                                            Back Home
                                        </Button>
                                    }
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
            </main>
        </>
    )
}

export default Results
