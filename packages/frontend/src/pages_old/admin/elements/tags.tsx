
import { useState } from 'react';
import { Col, Row } from 'antd'
import { Tags } from '@/components/tags'
import { PageHeaders } from '@/components/page-headers'
import { CloseCircleOutlined } from '@ant-design/icons'

import { Tag } from 'antd'

function TagElement() {
    const PageRoutes = [
        {
            path: '/admin',
            breadcrumbName: 'Dashboard',
        },
        {
            path: '',
            breadcrumbName: 'Tags',
        },
    ]
    const [state, setState] = useState({
        checked: null,
    })

    const log = (e: React.MouseEvent<HTMLElement>) => {
    };

    const checked = (checked: any) => {
        setState({ ...state, checked })
    }

    const preventDefault = (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
    };

    return (
        <>
            <PageHeaders
                className="flex items-center justify-between px-8 xl:px-[15px] pt-[18px] pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
                title="Tags"
                routes={PageRoutes}
            />
            <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
                <Row gutter={25}>
                    <Col md={12} xs={24}>
                        <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                            <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                                    Basic
                                </h1>
                            </div>
                            <div className="taglist-wrap p-[25px] [&>.ant-tag]:inline-flex [&>.ant-tag]:items-center [&>.ant-tag]:dark:text-white/60 [&>.ant-tag]:dark:border-white/10">
                                <Tag className="rony1">Tag 1</Tag>
                                <Tag>
                                    <a href="#">
                                        Link
                                    </a>
                                </Tag>
                                <Tag closeIcon onClose={preventDefault}>
                                    Prevent Default
                                </Tag>
                                <Tag
                                    closeIcon={<CloseCircleOutlined />}
                                    onClose={log}
                                >
                                    Tag 2
                                </Tag>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                            <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                                    Hot tag
                                </h1>
                            </div>
                            <div className="p-[25px] [&>.ant-tag]:inline-flex [&>.ant-tag]:items-center [&>.ant-tag]:bg-regular dark:[&>.ant-tag]:bg-white/30 [&>.ant-tag.ant-tag-checkable-checked]:bg-primary">
                                <Tags
                                    hottags
                                    onChange={checked}
                                    data={[
                                        'Movies',
                                        'Books',
                                        'Music',
                                        'Sports',
                                    ]}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md={12} xs={24}>
                        <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                            <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                                    Colorful tag
                                </h1>
                            </div>
                            <div className=" p-[25px]">
                                <h4 style={{ marginBottom: 16 }}>Presets:</h4>
                                <div className="flex items-center flex-wrap gap-[8px] [&>span]:m-0">
                                    <Tags color="magenta">magenta</Tags>
                                    <Tags color="red">red</Tags>
                                    <Tags color="volcano">volcano</Tags>
                                    <Tags color="orange">orange</Tags>
                                    <Tags color="gold">gold</Tags>
                                    <Tags color="lime">lime</Tags>
                                    <Tags color="green">green</Tags>
                                    <Tags color="cyan">cyan</Tags>
                                    <Tags color="blue">blue</Tags>
                                    <Tags color="geekblue">geekblue</Tags>
                                    <Tags color="purple">purple</Tags>
                                </div>
                                <h4 style={{ margin: '16px 0' }}>Custom:</h4>
                                <div className="taglist-wrap">
                                    <Tags color="#f50">#f50</Tags>
                                    <Tags color="#2db7f5">#2db7f5</Tags>
                                    <Tags color="#87d068">#87d068</Tags>
                                    <Tags color="#108ee9">#108ee9</Tags>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-white/10 m-0 p-0 text-theme-gray dark:text-white/60 text-[15px] mb-[25px] rounded-10 relative">
                            <div className="h-[60px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
                                <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                                    Animated Tags
                                </h1>
                            </div>
                            <div className="taglist-wrap p-[25px] [&>div>div>span>.ant-tag]:inline-flex [&>div>div>span>.ant-tag]:items-center [&>div>div>span>span]:m-0 [&>div>div]:flex [&>div>div]:items-center [&>div>div]:flex-wrap [&>div>div]:gap-[8px]">
                                <Tags
                                    animate
                                    onChange={checked}
                                    data={[
                                        'Movies',
                                        'Books',
                                        'Music',
                                        'Sports',
                                    ]}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
            </main>
        </>
    )
}

export default TagElement
