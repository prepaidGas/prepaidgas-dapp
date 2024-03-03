import { useState } from 'react'
import Link from 'next/link'
import FontAwesome from 'react-fontawesome'
import { Collapse, Row, Col, Form, Input } from 'antd'
import { UilSmile, UilFrown } from '@iconscout/react-unicons'
import { Buttons } from '@/components/buttons'

const { Panel } = Collapse
const { TextArea } = Input
function SingleKnowledgeDetails() {
    const [state, setState] = useState({
        key: 0,
    })
    const callback = (key: any) => {
        setState({ ...state, key })
    }
    return (
        <div className="flex flex-col">
            <div className="px-[30px] md:px-[15px] sm:px-0">
                <h2 className="mb-7 text-dark dark:text-white/[.87] text-3xl lg:text-[26px] sm:text-2xl ssm:text-[22px] font-semibold">
                    Switch between accounts
                </h2>
                <div className="mb-10">
                    <h4 className="mb-4 font-semibold text-22 sm:text-xl ssm:text-lg">
                        <Link
                            href="#"
                            className="text-dark dark:text-white/[.87]"
                        >
                            Configuration
                        </Link>
                    </h4>
                    <p className="mb-10 font-normal text-dark dark:text-white/[.87] text-15">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam voluptua. At vero
                        eos et accusam et justo duo dolores et ea rebum. Stet
                        clita kasd gubergren, no sea takimata sanctus est Lorem
                        ipsum dolor sit amet….
                    </p>
                    <Link
                        href="#"
                        className="btn-more text-link hover:text-primary"
                    >
                        Read More
                    </Link>
                </div>
                <div className="mb-10">
                    <h4 className="mb-4 font-semibold text-22 sm:text-xl ssm:text-lg">
                        <Link
                            href="#"
                            className="text-dark dark:text-white/[.87]"
                        >
                            Research and experiments
                        </Link>
                    </h4>
                    <p className="mb-0 font-normal text-dark dark:text-white/[.87] text-15">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam voluptua. At vero
                        eos et accusam et justo duo dolores et ea rebum. Stet
                        clita kasd gubergren, no sea takimata sanctus.
                    </p>
                    <div className="mt-8">
                        <img
                            src="/hexadash-nextjs/img/knowledgebase/wp-research.png"
                            alt="StrikingDash"
                        />
                    </div>
                </div>
                <div className="mb-10">
                    <Collapse
                        defaultActiveKey={['1']}
                        onChange={callback}
                        className="bg-transparent border-none [&>.ant-collapse-item]:border-none [&>div>.ant-collapse-header]:bg-transparent [&>div>.ant-collapse-header]:p-0 [&>div>.ant-collapse-header]:relative [&>div>.ant-collapse-content ]:bg-transparent [&>.ant-collapse-item>.ant-collapse-content]:border-none [&>.ant-collapse-item>.ant-collapse-header>.ant-collapse-expand-icon>span]:inline-flex [&>.ant-collapse-item>.ant-collapse-header>.ant-collapse-expand-icon>span]:items-center [&>.ant-collapse-item>.ant-collapse-header>.ant-collapse-expand-icon>span]:justify-center [&>.ant-collapse-item>.ant-collapse-header>.ant-collapse-expand-icon]:h-[28px] [&>.ant-collapse-item>.ant-collapse-header>.ant-collapse-expand-icon>span]:w-[28px] [&>.ant-collapse-item>.ant-collapse-header>.ant-collapse-expand-icon>span]:h-[28px] [&>.ant-collapse-item>.ant-collapse-header>.ant-collapse-expand-icon>span]:bg-white [&>.ant-collapse-item>.ant-collapse-header>.ant-collapse-expand-icon>span]:rounded-full [&>.ant-collapse-item>.ant-collapse-header>.ant-collapse-expand-icon>span]:text-primary [&>.ant-collapse-item.ant-collapse-header>.ant-collapse-expand-icon>span]:text-[14px] [&>.ant-collapse-item>.ant-collapse-header>.ant-collapse-expand-icon>span]:font-semibold [&>.ant-collapse-item>.ant-collapse-header>.ant-collapse-expand-icon>span]:ltr:mr-2 rtl:ml-2 [&>.ant-collapse-item>.ant-collapse-header>.ant-collapse-expand-icon>span]:shadow-[0_2px_2px_rgba(146,148,159,0.19)]"
                        items={[
                            {
                                key: '1',
                                label: (
                                    <div className="block mb-4 font-semibold text-dark dark:text-white/[.87] text-22 sm:text-xl ssm:text-lg">
                                        Measuring elevation
                                    </div>
                                ),
                                children: (
                                    <div>
                                        <p className="mb-0 font-normal text-dark dark:text-white/[.87] text-15">
                                            Lorem ipsum dolor sit amet,
                                            consetetur sadipscing elitr, sed
                                            diam nonumy eirmod tempor invidunt
                                            ut labore et dolore magna aliquyam
                                            erat, sed diam voluptua. At vero eos
                                            et accusam et justo duo dolores et
                                            ea rebum. Stet clita kasd gubergren,
                                            no sea takimata sanctus est Lorem
                                            ipsum dolor sit amet….
                                        </p>
                                        <Link
                                            href="#"
                                            className="inline-block mt-6 text-xs font-medium uppercase text-dark dark:text-white/[.87] hover:underline"
                                        >
                                            Read More
                                        </Link>
                                    </div>
                                ),
                            },
                        ]}
                    ></Collapse>
                </div>
                <div className="mb-10">
                    <Collapse
                        defaultActiveKey={['1']}
                        onChange={callback}
                        className="bg-transparent border-none [&>.ant-collapse-item]:border-none [&>div>.ant-collapse-header]:bg-transparent [&>div>.ant-collapse-header]:p-0 [&>div>.ant-collapse-header]:relative [&>div>.ant-collapse-content ]:bg-transparent [&>.ant-collapse-item>.ant-collapse-content]:border-none [&>.ant-collapse-item>.ant-collapse-header>.ant-collapse-expand-icon>span]:inline-flex [&>.ant-collapse-item>.ant-collapse-header>.ant-collapse-expand-icon>span]:items-center [&>.ant-collapse-item>.ant-collapse-header>.ant-collapse-expand-icon>span]:justify-center [&>.ant-collapse-item>.ant-collapse-header>.ant-collapse-expand-icon]:h-[28px] [&>.ant-collapse-item>.ant-collapse-header>.ant-collapse-expand-icon>span]:w-[28px] [&>.ant-collapse-item>.ant-collapse-header>.ant-collapse-expand-icon>span]:h-[28px] [&>.ant-collapse-item>.ant-collapse-header>.ant-collapse-expand-icon>span]:bg-white [&>.ant-collapse-item>.ant-collapse-header>.ant-collapse-expand-icon>span]:rounded-full [&>.ant-collapse-item>.ant-collapse-header>.ant-collapse-expand-icon>span]:text-primary [&>.ant-collapse-item.ant-collapse-header>.ant-collapse-expand-icon>span]:text-[14px] [&>.ant-collapse-item>.ant-collapse-header>.ant-collapse-expand-icon>span]:font-semibold [&>.ant-collapse-item>.ant-collapse-header>.ant-collapse-expand-icon>span]:ltr:mr-2 rtl:ml-2 [&>.ant-collapse-item>.ant-collapse-header>.ant-collapse-expand-icon>span]:shadow-[0_2px_2px_rgba(146,148,159,0.19)]"
                        items={[
                            {
                                key: '1',
                                label: (
                                    <div className="block mb-4 font-semibold text-dark dark:text-white/[.87] text-22 sm:text-xl ssm:text-lg">
                                        Measuring elevation
                                    </div>
                                ),
                                children: (
                                    <div>
                                        <p className="mb-0 font-normal text-dark dark:text-white/[.87] text-15">
                                            Lorem ipsum dolor sit amet,
                                            consetetur sadipscing elitr, sed
                                            diam nonumy eirmod tempor invidunt
                                            ut labore et dolore magna aliquyam
                                            erat, sed diam voluptua. At vero eos
                                            et accusam et justo duo dolores et
                                            ea rebum. Stet clita kasd gubergren,
                                            no sea takimata sanctus est Lorem
                                            ipsum dolor sit amet….
                                        </p>
                                        <Link
                                            href="#"
                                            className="inline-block mt-6 text-xs font-medium uppercase text-dark dark:text-white/[.87] hover:underline"
                                        >
                                            Read More
                                        </Link>
                                    </div>
                                ),
                            },
                        ]}
                    ></Collapse>
                </div>
                <span className="text-sm text-body dark:text-white/60">
                    <span>Last updated:</span>
                    <span>June 7, 2019</span>
                </span>
                <div className="flex items-center justify-center flex-wrap gap-x-10 gap-y-[15px] min-h-[106px] p-[15px] my-[25px] border border-normal dark:border-white/10 shadow-[0_5px_10px_rgba(10,10,10,0.06)] rounded-[5px]">
                    <h4 className="mb-0 text-dark dark:text-white/60">
                        Was this article helpful?
                    </h4>
                    <div className="flex items-center gap-2.5">
                        <Buttons
                            outlined
                            type="success"
                            className="inline-flex items-center justify-center px-4 bg-transparent border h-9 text-success border-success"
                        >
                            <UilSmile className="w-[14px] h-[14px] ltr:mr-1.5 rtl:ml-1.5" />
                            Yes
                        </Buttons>
                        <Buttons
                            outlined
                            type="warning"
                            className="inline-flex items-center justify-center px-4 bg-transparent border h-9 text-warning border-warning"
                        >
                            <UilFrown className="w-[14px] h-[14px] ltr:mr-1.5 rtl:ml-1.5" />
                            No
                        </Buttons>
                    </div>
                </div>
                <div className="flex items-center justify-between flex-wrap gap-[15px] pb-[42px] mb-[25px] border-b border-normal dark:border-white/10">
                    <div className="text-base font-medium">
                        <span className="text-body dark:text-white/60">
                            Still need help?
                        </span>
                        <Link
                            href="#"
                            className="ml-[14px] text-link hover:text-primary"
                        >
                            Submit a Request
                        </Link>
                    </div>
                    <ul className="flex items-center mb-0">
                        <li className="ltr:mr-[10px] rtl:ml-[10px]">
                            <span className="text-sm font-normal text-body dark:text-white/60">
                                Share this article:
                            </span>
                        </li>
                        <li className="ltr:mr-[10px] rtl:ml-[10px]">
                            <Link href="#">
                                <FontAwesome
                                    className="text-base text-light-extra dark:text-white/60 hover:text-primary"
                                    name="facebook"
                                    size="2x"
                                />
                            </Link>
                        </li>
                        <li className="ltr:mr-[10px] rtl:ml-[10px]">
                            <Link href="#">
                                <FontAwesome
                                    className="text-base text-light-extra dark:text-white/60 hover:text-primary"
                                    name="twitter"
                                    size="2x"
                                />
                            </Link>
                        </li>
                        <li className="ltr:mr-[10px] rtl:ml-[10px]">
                            <Link href="#">
                                <FontAwesome
                                    className="text-base text-light-extra dark:text-white/60 hover:text-primary"
                                    name="pinterest"
                                    size="2x"
                                />
                            </Link>
                        </li>
                        <li className="ltr:mr-[10px] rtl:ml-[10px]">
                            <Link href="#">
                                <FontAwesome
                                    className="text-base text-light-extra dark:text-white/60 hover:text-primary"
                                    name="link"
                                    size="2x"
                                />
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="mb-11">
                    <ul className="flex items-center justify-between gap-[10px] sm:flex-wrap">
                        <li>
                            <Link href="#">
                                <span className="mb-1.5 text-light dark:text-white/60 text-[13px]">
                                    <FontAwesome
                                        className="inline-block text-sm ltr:mr-2 rtl:ml-2"
                                        name="angle-left"
                                        size="2x"
                                    />
                                    <span>Previous article</span>
                                </span>
                                <h5 className="text-sm text-dark dark:text-white/[.87]">
                                    Stop getting emails from lorem
                                </h5>
                            </Link>
                        </li>
                        <li>
                            <Link href="#">
                                <span className="block mb-1.5 text-light dark:text-white/60 text-[13px] text-end sm:text-start">
                                    <span>Next article</span>
                                    <FontAwesome
                                        className="inline-block text-sm ltr:ml-2 rtl:mr-2"
                                        name="angle-right"
                                        size="2x"
                                    />
                                </span>
                                <h5 className="text-sm text-dark dark:text-white/[.87]">
                                    Use threads to organize discussions
                                </h5>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="mb-[30px] pt-6 px-[30px] pb-[26px] border border-normal dark:border-white/10">
                <h4 className="mb-[18px] text-dark dark:text-white/[.87] text-xl font-medium">
                    Related articles
                </h4>
                <ul className="mb-0">
                    <li className="mb-[10px]">
                        <Link href="#" className="flex">
                            <span className="me-4">
                                <FontAwesome
                                    className="text-[#ccd4de] text-base"
                                    name="file"
                                    size="2x"
                                />
                            </span>
                            <h5 className="mb-0 text-body dark:text-white/60 text-15">
                                Installing loremm ulti vendor marketplace
                            </h5>
                        </Link>
                    </li>
                    <li className="mb-[10px]">
                        <Link href="#" className="flex">
                            <span className="me-4">
                                <FontAwesome
                                    className="text-[#ccd4de] text-base"
                                    name="file"
                                    size="2x"
                                />
                            </span>
                            <h5 className="mb-0 text-body dark:text-white/60 text-15">
                                Copyright and trademarks
                            </h5>
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className="flex">
                            <span className="me-4">
                                <FontAwesome
                                    className="text-[#ccd4de] text-base"
                                    name="file"
                                    size="2x"
                                />
                            </span>
                            <h5 className="mb-0 text-body dark:text-white/60 text-15">
                                Stop getting emails from lorem
                            </h5>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="mb-[30px] pt-6 px-[30px] pb-[26px] border border-normal dark:border-white/10">
                <h4 className="mb-[18px] text-dark dark:text-white/[.87] text-xl font-medium">
                    Leave comment
                </h4>
                <Form name="comment" layout="vertical">
                    <Row gutter={20}>
                        <Col sm={12} xs={24}>
                            <Form.Item
                                label="Name"
                                name="name"
                                className="dark:[&>div>div>label]:text-white/60"
                            >
                                <Input className="h-11 border-normal dark:border-white/10 hover:border-primary" />
                            </Form.Item>
                        </Col>
                        <Col sm={12} xs={24}>
                            <Form.Item
                                label="Email Address"
                                name="email"
                                className="dark:[&>div>div>label]:text-white/60"
                                rules={[
                                    {
                                        message: 'Please input your email!',
                                        type: 'email',
                                    },
                                ]}
                            >
                                <Input className="h-11 border-normal dark:border-white/10 hover:border-primary" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24}>
                            <Form.Item
                                label="Comment"
                                name="comment"
                                className="dark:[&>div>div>label]:text-white/60"
                            >
                                <TextArea
                                    rows={4}
                                    className="border-normal dark:border-white/10 hover:border-primary"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24}>
                            <Buttons
                                htmlType="submit"
                                size="large"
                                type="primary"
                                raised
                                key="submit"
                                className="bg-primary text-white h-[46px] px-[30px] text-sm font-medium"
                            >
                                Submit Comment
                            </Buttons>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    )
}

export default SingleKnowledgeDetails
