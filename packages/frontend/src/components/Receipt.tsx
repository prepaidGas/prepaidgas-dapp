import { List } from "antd"
import { UilQuestionCircle } from "@iconscout/react-unicons"
import { Tooltip } from "antd"

export default function Receipt({
  gasAmount,
  gasCostTokenName = "NULL",
  gasCostValue,
  rewardTokenName = "NULL",
  rewardValue,
  className = "",
}: {
  gasAmount: number
  gasCostTokenName?: string
  gasCostValue: number
  rewardTokenName?: string
  rewardValue: number
  className?: string
}) {
  return (
    <div className={className}>
      <List
        className="&>.ant-list-header]:border-regular dark:[&>.ant-list-header]:border-white/10  relative"
        header={
          <div className="flex flex-row justify-between items-center">
            <div className="dark:text-white/[.87]">Receipt</div>
            <span className="absolute [&>*]:fill-secondary right-1 top-1">
              <Tooltip className="" title="This is just a placeholder">
                <UilQuestionCircle />
              </Tooltip>
            </span>
          </div>
        }
        dataSource={
          gasCostTokenName === rewardTokenName
            ? [`${rewardValue + gasCostValue * gasAmount} ${gasCostTokenName}`]
            : [`${gasCostValue * gasAmount} ${gasCostTokenName}`, `${gasCostValue * gasAmount} ${rewardTokenName}`]
        }
        bordered={true}
        renderItem={(item) => <List.Item.Meta className="dark:[&>div>div]:text-white/60" description={item} />}
      />
    </div>
  )
}
