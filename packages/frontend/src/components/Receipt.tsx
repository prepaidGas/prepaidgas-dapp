import { DocumentTextIcon } from "@heroicons/react/24/outline"
import { Callout, Icon, List, ListItem, Text, Title } from "@tremor/react"
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
  // return (
  //   <Callout className="flex flex-col" title="Receipt" icon={DocumentTextIcon} color="teal">
  //     <div className="flex flex-row justify-start items-center gap-2">
  //       <div className="flex flex-col">
  //         {gasCostTokenName === rewardTokenName ? (
  //           <Text>
  //             {rewardValue + gasCostValue * gasAmount} {gasCostTokenName}
  //           </Text>
  //         ) : (
  //           <>
  //             <Text>
  //               {gasCostValue * gasAmount} {gasCostTokenName}
  //             </Text>
  //             <Text>
  //               {rewardValue} {rewardTokenName}
  //             </Text>
  //           </>
  //         )}
  //       </div>
  //       <Tooltip tooltipText="This is just a placeholder" iconSize="lg" />
  //     </div>
  //   </Callout>
  // )

  return (
    <div className="relative">
      {/* <div className="absolute right-[-2rem] top-0">
        <Tooltip tooltipText="This is just a placeholder" iconSize="md" />
      </div> */}
      <div className="flex flex-row gap-1 items-center">
        {/* <Icon icon={DocumentTextIcon} /> */}
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
    </div>
  )
}
