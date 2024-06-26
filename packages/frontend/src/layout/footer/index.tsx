import Link from "next/link"
import { Col, Row } from "antd"
import dayjs from "dayjs"

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-[#1B1E2B] pt-5 px-[30px] pb-[18px] w-full shadow-[0_-5px_10px_rgba(146,153,184,0.05)]">
      <Row>
        <Col md={12} xs={24}>
          <span className="inline-block w-full font-medium admin-footer__copyright md:text-center text-theme-gray dark:text-white/60 md:mb-[10px]">
            © {dayjs().get("year")}
            <Link href="https://prepaidgas.io/" target="_blank" className="mx-[4px] text-primary">
              prepaidGas
            </Link>
          </span>
        </Col>
        <Col md={12} xs={24}>
          <div className="justify-end md:justify-center items-center flex gap-[15px]">
            <Link
              href="https://docs.prepaidgas.io/"
              target="_blank"
              className="text-theme-gray dark:text-white/60 text-[14px] hover:text-primary"
            >
              Docs
            </Link>
          </div>
        </Col>
      </Row>
    </footer>
  )
}

export default Footer
