import { List } from "antd"
import { UilQuestionCircle } from "@iconscout/react-unicons"
import Tooltip from "./Tooltip"

export default function Receipt({
  gasAmount,
  gasCostTokenName = "NULL",
  gasCostValue,
  rewardTokenName = "NULL",
  rewardValue,
}: {
  gasAmount: number
  gasCostTokenName?: string
  gasCostValue: number
  rewardTokenName?: string
  rewardValue: number
}) {
  return (
    <>
      <List
        className="&>.ant-list-header]:border-regular dark:[&>.ant-list-header]:border-white/10  relative"
        header={
          <div className="flex flex-row justify-between items-center">
            <div className="dark:text-white/[.87]">Receipt</div>
            <span className="absolute [&>*]:fill-secondary right-1 top-1">
              <UilQuestionCircle />
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
      {/* <div className="relative">
        <div className="flex flex-row gap-1 items-center">
          <Title>Receipt</Title>
          <Tooltip tooltipText="This is just a placeholder" iconSize="md" />
        </div>
        <List className="flex flex-col" title="Receipt">
          {gasCostTokenName === rewardTokenName ? (
            <ListItem>
              {rewardValue + gasCostValue * gasAmount} {gasCostTokenName}
            </ListItem>
          ) : (
            <>
              <ListItem>
                {gasCostValue * gasAmount} {gasCostTokenName}
              </ListItem>
              <ListItem>
                {rewardValue} {rewardTokenName}
              </ListItem>
            </>
          )}
        </List>
      </div> */}
    </>
  )
}
