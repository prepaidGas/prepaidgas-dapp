import { DocumentTextIcon } from "@heroicons/react/24/outline"
import { ProgressBar, Card, Flex, Text, Metric, TabList, Tab, TabGroup, TabPanels, TabPanel } from "@tremor/react"
import { ReactNode, useState } from "react"

export default function UserAgreement({ children = null }: { children: ReactNode | null }) {
  const [isTosAccepted, setIsTosAccepted] = useState(false)

  return (
    <div>
      <TabGroup>
        <TabList className="">
          <Tab icon={DocumentTextIcon}>Disclaimer</Tab>
          <Tab icon={DocumentTextIcon}>Terms of service</Tab>
        </TabList>
        <TabPanels>
          <TabPanel className="max-h-[20rem] md:max-w-[28rem] overflow-y-scroll">
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt nisl arcu, et mollis sem lobortis
              non. Vestibulum in urna tellus. Pellentesque sit amet consectetur velit. Maecenas vel diam ultrices,
              eleifend nisl eu, viverra massa. Duis ligula urna, dignissim a est quis, convallis aliquam ipsum. Sed ut
              gravida erat. Donec lacinia massa quis dolor fermentum maximus. Nunc ultrices faucibus magna nec cursus.
              Proin eros sapien, venenatis et facilisis non, finibus quis dolor. Pellentesque molestie sapien sit amet
              erat dignissim, sed fringilla ante volutpat. Pellentesque fringilla augue ut elit sollicitudin, ac
              scelerisque nisi tincidunt. Aenean dignissim quis velit eu fringilla. Ut pulvinar, sem mattis volutpat
              placerat, turpis tellus tristique magna, quis sodales leo felis ac diam. Aliquam interdum ipsum vel
              scelerisque scelerisque. Vivamus at sollicitudin tortor. Maecenas porta sapien et purus fermentum
              fringilla. Donec sodales ut nunc sit amet tincidunt. Ut posuere eget justo eget fermentum. Morbi pulvinar
              mollis tortor, at consequat elit aliquet vel. Mauris euismod egestas sapien, vel hendrerit nibh egestas
              ut. In vulputate ac erat non bibendum. Curabitur a tellus cursus, ultricies nunc non, aliquet velit.
              Suspendisse interdum turpis ac semper pharetra. Ut sodales vehicula porttitor. Nunc accumsan arcu non
              neque ultrices, in consequat tortor tempus. Praesent quis mauris sit amet nibh feugiat facilisis. Sed
              rhoncus sem eget ipsum scelerisque, et ultricies neque sodales. Morbi placerat rhoncus tortor ac
              venenatis. In mattis sem vel nunc eleifend vehicula. Cras pretium nisl a libero tincidunt vestibulum.
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin pretium
              auctor lorem, sed elementum est elementum vel. Etiam condimentum blandit leo, sit amet placerat justo
              vulputate et. Nullam porta suscipit magna, a sagittis turpis sodales vel. Vestibulum interdum lacus vel
              lorem venenatis finibus. Vestibulum urna ligula, blandit non vestibulum quis, pharetra vel arcu. Sed id
              vestibulum tellus. Praesent ut mi ultrices, finibus nisi at, maximus velit. Donec porta mi ac mi
              consectetur, ut elementum ex sodales. Duis nec risus nec risus consectetur mattis. Class aptent taciti
              sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus pellentesque enim nec nisl
              rutrum, eget viverra lorem tincidunt. Donec lobortis nisi non justo tincidunt, quis tincidunt velit porta.
              Praesent et rhoncus nunc. Ut vulputate dignissim turpis ac laoreet.
            </Text>
          </TabPanel>
          <TabPanel className="max-h-[20rem] md:max-w-[28rem] overflow-y-scroll">
            <Text>
              Curabitur a tellus cursus, ultricies nunc non, aliquet velit.Curabitur a tellus cursus, ultricies nunc
              non, aliquet velit.Curabitur a tellus cursus, ultricies nunc non, aliquet velit.Curabitur a tellus cursus,
              ultricies nunc non, aliquet velit.Curabitur a tellus cursus, ultricies nunc non, aliquet velit.Curabitur a
              tellus cursus, ultricies nunc non, aliquet velit.Curabitur a tellus cursus, ultricies nunc non, aliquet
              velit.Curabitur a tellus cursus, ultricies nunc non, aliquet velit.Curabitur a tellus cursus, ultricies
              nunc non, aliquet velit.Curabitur a tellus cursus, ultricies nunc non, aliquet velit.Curabitur a tellus
              cursus, ultricies nunc non, aliquet velit.Curabitur a tellus cursus, ultricies nunc non, aliquet
              velit.Curabitur a tellus cursus, ultricies nunc non, aliquet velit.Curabitur a tellus cursus, ultricies
              nunc non, aliquet velit.Curabitur a tellus cursus, ultricies nunc non, aliquet velit.Curabitur a tellus
              cursus, ultricies nunc non, aliquet velit.Curabitur a tellus cursus, ultricies nunc non, aliquet
              velit.Curabitur a tellus cursus, ultricies nunc non, aliquet velit.Curabitur a tellus cursus, ultricies
              nunc non, aliquet velit.Curabitur a tellus cursus, ultricies nunc non, aliquet velit.Curabitur a tellus
              cursus, ultricies nunc non, aliquet velit.Curabitur a tellus cursus, ultricies nunc non, aliquet
              velit.Curabitur a tellus cursus, ultricies nunc non, aliquet velit.Curabitur a tellus cursus, ultricies
              nunc non, aliquet velit.Curabitur a tellus cursus, ultricies nunc non, aliquet velit.Curabitur a tellus
              cursus, ultricies nunc non, aliquet velit.Curabitur a tellus cursus, ultricies nunc non, aliquet
              velit.Curabitur a tellus cursus, ultricies nunc non, aliquet velit.Curabitur a tellus cursus, ultricies
              nunc non, aliquet velit.Curabitur a tellus cursus, ultricies nunc non, aliquet velit.
            </Text>
          </TabPanel>
        </TabPanels>
      </TabGroup>
      <div className="flex flex-col mt-4">
        <div className="flex flex-row gap-2">
          <label>
            <input
              onClick={() => setIsTosAccepted(!isTosAccepted)}
              checked={isTosAccepted}
              type="checkbox"
              name="tos-checkbox"
            />{" "}
            I have read and accepted the terms and conditions
          </label>
        </div>
        {isTosAccepted ? <div className="flex mt-4 items-center justify-center">{children}</div> : null}
      </div>
    </div>
  )
}
