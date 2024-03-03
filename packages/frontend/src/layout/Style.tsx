import Styled from 'styled-components';

const TopMenuStyle = Styled.div`
    .hexadash-top-menus{
        ul{
            margin-bottom: 0;
            li{
                ${({ theme }) => (theme.rtl ? 'padding-left' : 'padding-right')}: 14px;
                @media only screen and (max-width: 1024px){
                    ${({ theme }) => (theme.rtl ? 'padding-left' : 'padding-right')}: 10px;
                }
                &:not(:last-child){
                    ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 34px;
                    @media only screen and (max-width: 1399px){
                        ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 30px;
                    }
                    @media only screen and (max-width: 1199px){
                        ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 20px;
                    }
                    @media only screen and (max-width: 1024px){
                        ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 13px;
                    }
                }
                &.has-subMenu{
                    >a{
                        position: relative;
                        &:before{
                            position: absolute;
                            ${({ theme }) => (theme.rtl ? 'left' : 'right')}: -14px;
                            top: 50%;
                            transform: translateY(-50%);
                            font-family: "FontAwesome";
                            content: '\f107';
                            line-height: 1;
                        }
                    }
                }
                &.has-subMenu-left{
                    >a{
                        position: relative;
                        &:before{
                            position: absolute;
                            ${({ theme }) => (theme.rtl ? 'left' : 'right')}: 30px;
                            top: 50%;
                            transform: translateY(-50%);
                            font-family: "FontAwesome";
                            content: '\f105';
                            line-height: 1;
                        }
                    }
                }
                &:hover{
                    >.subMenu{
                        @media only screen and (max-width: 1399px){
                            top: 40px;
                        }
                    }
                }
                >a{
                    @media only screen and (max-width: 1399px){
                        padding: 6px 0;
                    }
                }
                a{
                    svg,
                    img,
                    i{
                        ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 14px;
                        width: 16px;
                    }
                }
                >ul{
                    li{
                        ${({ theme }) => (theme.rtl ? 'padding-left' : 'padding-right')}: 0;
                        ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 0 !important;
                        a{
                            &:hover,
                            &[aria-current="page"]{
                                ${({ theme }) => (theme.rtl ? 'padding-right' : 'padding-left')}: 40px;
                            }
                        }
                        &:hover{
                            .subMenu{
                                ${({ theme }) => (theme.rtl ? 'right' : 'left')}: 250px;
                                @media only screen and (max-width: 1300px){
                                    ${({ theme }) => (theme.rtl ? 'right' : 'left')}: 180px;
                                }
                            }
                        }
                    }
                }
            }
        }
        .subMenu{
            @media only screen and (max-width: 1300px){
                width: 180px;
            }
            .subMenu{
                @media only screen and (max-width: 1300px){
                    width: 200px;
                    ${({ theme }) => (theme.rtl ? 'right' : 'left')}: 180px;
                }
            }
        }
    }
    // Mega Menu
    .hexadash-top-menu{
        >ul{
            >li{
                &.mega-item{
                    position: static;
                }
                .sDash_menu-item-icon{
                    line-height: .6;
                }
                .megaMenu-wrapper{
                    transition: .4s;
                    &.megaMenu-small{
                        width: 590px;
                        >li{
                            flex: 0 0 33.3333%;
                        }
                        ul{
                            li{
                                >a{
                                    position: relative
                                    &:after{
                                        width: 5px;
                                        height: 5px;
                                        border-radius: 50%;
                                        position: absolute;
                                        ${({ theme }) => (theme.rtl ? 'right' : 'left')}: 30px;
                                        top: 50%;
                                        transform: translateY(-50%);
                                        background-color: #C6D0DC;
                                        content: '';
                                        transition: .3s;
                                    }
                                }
                            }
                        }
                    }
                    &.megaMenu-wide{
                        @media only screen and (max-width: 1599px){
                            width: 800px;
                        }
                        @media only screen and (max-width: 1399px){
                            width: 700px;
                        }
                        >li{
                            .mega-title{
                                position: relative;
                                &:after{
                                    position: absolute;
                                    height: 5px;
                                    width: 5px;
                                    border-radius: 50%;
                                    ${({ theme }) => (theme.rtl ? 'right' : 'left')}: 30px;
                                    top: 50%;
                                    transform: translateY(-50%);
                                    background-color: #C6D0DC;
                                    content: '';
                                }
                            }
                        }
                    }
                    ul{
                        li{
                            position: relative;
                            &:hover{
                                >a{
                                    padding-left: 35px;
                                }
                                &:after{
                                    opacity: 1;
                                    visibility: visible;
                                }
                            }
                            >a{
                                line-height: 3;
                                font-weight: 400;
                                transition: .3s;
                            }
                            
                            &:after{
                                width: 6px;
                                height: 1px;
                                border-radius: 50%;
                                position: absolute;
                                ${({ theme }) => (theme.rtl ? 'right' : 'left')}: 20px;
                                top: 50%;
                                transform: translateY(-50%);
                                content: '';
                                transition: .3s;
                                opacity: 0;
                                visibility: hidden;
                            }
                        }
                    }
                }
            }
        }
    }
`;

export {
  TopMenuStyle,
};
