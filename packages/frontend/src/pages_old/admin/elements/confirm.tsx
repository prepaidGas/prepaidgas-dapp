import { Row, Col, message, Popconfirm, Button } from 'antd'
import { PageHeaders } from '@/components/page-headers'

function Confirme() {
    const PageRoutes = [
        {
            path: '/admin',
            breadcrumbName: 'Dashboard',
        },
        {
            path: '',
            breadcrumbName: 'Popconfirm',
        },
    ]
    const text = 'Are you sure to delete this task?'
    const description = 'Delete the task'
    const confirm = () => {
        message.success('Click on Yes')
    }

    const cancel = () => {
        message.error('Click on No')
    }

    return (
        <>
            <PageHeaders
                className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
                title="Popconfirm"
                routes={PageRoutes}
            />
            <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
                <Row gutter={25}>
                    <Col xl={12} lg={8} xs={24}>
                        <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                            <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                                    Basic
                                </h1>
                            </div>
                            <div className="p-[25px]">
                                <Popconfirm
                                    title="Delete the task"
                                    description="Are you sure to delete this task?"
                                    onCancel={cancel}
                                    onConfirm={confirm}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button danger>Delete</Button>
                                </Popconfirm>
                            </div>
                        </div>
                    </Col>
                    <Col xl={12} lg={16} xs={24}>
                        <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                            <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                                    Placement
                                </h1>
                            </div>
                            <div className="demo placement-confirm p-[25px]">
                                <div className="pop-confirm pop-confirm-top gap-[10px] flex flex-wrap whitespace-nowrap min-3xl:ltr:ml-[100px] min-3xl:rtl:mr-[100px] 3xl:mb-[15px]">
                                    <Popconfirm
                                        placement="topLeft"
                                        title={text}
                                        onConfirm={confirm}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button
                                            className="border-solid border-1 border-normal dark:border-white/10 hover:text-primary hover:border-primary text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-4 px-[20px] h-[44px] min-w-[80px] xs:min-w-[70px] dark:bg-white/10"
                                        >
                                            TL
                                        </Button>
                                    </Popconfirm>
                                    <Popconfirm
                                        placement="top"
                                        title={text}
                                        onConfirm={confirm}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button
                                            className="border-solid border-1 border-normal dark:border-white/10 hover:text-primary hover:border-primary text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-4 px-[20px] h-[44px] min-w-[80px] xs:min-w-[70px] dark:bg-white/10"
                                        >
                                            Top
                                        </Button>
                                    </Popconfirm>
                                    <Popconfirm
                                        placement="topRight"
                                        title={text}
                                        onConfirm={confirm}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button
                                            className="border-solid border-1 border-normal dark:border-white/10 hover:text-primary hover:border-primary text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-4 px-[20px] h-[44px] min-w-[80px] xs:min-w-[70px] dark:bg-white/10"
                                        >
                                            TR
                                        </Button>
                                    </Popconfirm>
                                </div>
                                <div
                                    className="pop-confirm pop-confirm-left flex flex-col gap-[10px] ltr:float-left rtl:float-right"
                                    style={{ width: 80 }}
                                >
                                    <Popconfirm
                                        placement="leftTop"
                                        title={text}
                                        onConfirm={confirm}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button
                                            className="border-solid border-1 border-normal dark:border-white/10 hover:text-primary hover:border-primary text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-4 px-[20px] h-[44px] min-w-[80px] xs:min-w-[70px] dark:bg-white/10"
                                        >
                                            LT
                                        </Button>
                                    </Popconfirm>
                                    <Popconfirm
                                        placement="left"
                                        title={text}
                                        onConfirm={confirm}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button
                                            className="border-solid border-1 border-normal dark:border-white/10 hover:text-primary hover:border-primary text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-4 px-[20px] h-[44px] min-w-[80px] xs:min-w-[70px] dark:bg-white/10"
                                        >
                                            Left
                                        </Button>
                                    </Popconfirm>
                                    <Popconfirm
                                        placement="leftBottom"
                                        title={text}
                                        onConfirm={confirm}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button
                                            className="border-solid border-1 border-normal dark:border-white/10 hover:text-primary hover:border-primary text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-4 px-[20px] h-[44px] min-w-[80px] xs:min-w-[70px] dark:bg-white/10"
                                        >
                                            LB
                                        </Button>
                                    </Popconfirm>
                                </div>
                                <div className="pop-confirm pop-confirm-right  flex flex-col gap-[10px] w-[80px] min-3xl:ms-[380px] 3xl:ms-[180px] xs::ms-[150px]">
                                    <Popconfirm
                                        placement="rightTop"
                                        title={text}
                                        onConfirm={confirm}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button
                                            className="border-solid border-1 border-normal dark:border-white/10 hover:text-primary hover:border-primary text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-4 px-[20px] h-[44px] min-w-[80px] xs:min-w-[70px] dark:bg-white/10"
                                        >
                                            RT
                                        </Button>
                                    </Popconfirm>
                                    <Popconfirm
                                        placement="right"
                                        title={text}
                                        onConfirm={confirm}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button
                                            className="border-solid border-1 border-normal dark:border-white/10 hover:text-primary hover:border-primary text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-4 px-[20px] h-[44px] min-w-[80px] xs:min-w-[70px] dark:bg-white/10"
                                        >
                                            Right
                                        </Button>
                                    </Popconfirm>
                                    <Popconfirm
                                        placement="rightBottom"
                                        title={text}
                                        onConfirm={confirm}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button
                                            className="border-solid border-1 border-normal dark:border-white/10 hover:text-primary hover:border-primary text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-4 px-[20px] h-[44px] min-w-[80px] xs:min-w-[70px] dark:bg-white/10"
                                        >
                                            RB
                                        </Button>
                                    </Popconfirm>
                                </div>
                                <div className="pop-confirm pop-confirm-bottom  gap-[10px] flex flex-wrap whitespace-nowrap min-3xl:ltr:ml-[100px] min-3xl:rtl:mr-[100px] 3xl:mt-[15px]">
                                    <Popconfirm
                                        placement="bottomLeft"
                                        title={text}
                                        onConfirm={confirm}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button
                                            className="border-solid border-1 border-normal dark:border-white/10 hover:text-primary hover:border-primary text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-4 px-[20px] h-[44px] min-w-[80px] xs:min-w-[70px] dark:bg-white/10"
                                        >
                                            BL
                                        </Button>
                                    </Popconfirm>
                                    <Popconfirm
                                        placement="bottom"
                                        title={text}
                                        onConfirm={confirm}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button
                                            className="border-solid border-1 border-normal dark:border-white/10 hover:text-primary hover:border-primary text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-4 px-[20px] h-[44px] min-w-[80px] xs:min-w-[70px] max-w-[80px] dark:bg-white/10"
                                        >
                                            Bottom
                                        </Button>
                                    </Popconfirm>
                                    <Popconfirm
                                        placement="bottomRight"
                                        title={text}
                                        onConfirm={confirm}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button
                                            className="border-solid border-1 border-normal dark:border-white/10  hover:text-primary hover:border-primary text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-4 px-[20px] h-[44px] min-w-[80px] xs:min-w-[70px] dark:bg-white/10"
                                        >
                                            BR
                                        </Button>
                                    </Popconfirm>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </main>
        </>
    )
}

export default Confirme
