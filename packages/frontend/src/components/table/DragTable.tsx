import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  UilEdit,
  UilExpandArrows,
  UilTrashAlt 
} from '@iconscout/react-unicons';
import { CSS } from '@dnd-kit/utilities';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy, useSortable } from '@dnd-kit/sortable';
import Heading from '@/components/heading';
import { Buttons } from '@/components/buttons';

interface RootState {
  users: User[];
}

interface User {
  name: string;
  designation: string;
  img: string;
}

interface Value { 
  value: Item; 
  index:number;
}

interface Item {
  user: string;
  id: string;
  email: string;
  company: string;
  position: string;
  joinDate: string;
  action: string;
}

function DragAndDropTable() {
  const { users } = useSelector((state:RootState) => {
    return {
      users: state.users,
    };
  });

  const usersTableData:any = [];
  users.map((user:User, index:number) => {
    const { name, designation, img } = user;

    return usersTableData.push({
      key: index + 1,
      index,
      user: (
        <div className="flex items-center gap-x-[10px] gap-y-[10px]">
          <figure className="mb-0">
            <img style={{ width: '40px' }} src={`/hexadash-nextjs/${img}`} alt="" />
          </figure>
          <figcaption>
            <Heading className="user-name text-dark dark:text-white/[.87] text-[14px] font-semibold mb-0" as="h6">
              {name}
            </Heading>
          </figcaption>
        </div>
      ),
      email: <span className="text-sm font-medium text-light dark:text-white/60">john@gmail.com</span>,
      company: <span className="text-sm font-medium text-light dark:text-white/60">Business Development</span>,
      position: <span className="text-sm font-medium text-light dark:text-white/60">{designation}</span>,
      joinDate: <span className="text-sm font-medium text-light dark:text-white/60">January 20, 2020</span>,
      action: (
        <div className="flex items-center justify-end dark:gap-[6px]">
          <Buttons
            className="inline-flex items-center justify-center border-none shadow-none text-light-extra dark:text-white/60 dark:bg-white/10 hover:bg-info-transparent hover:text-info"
            to="#"
            shape="circle"
          >
            <UilEdit className="text-[currentColor] dark:text-white/60 w-[14px] h-[14px]" />
          </Buttons>
          <Buttons
            className="inline-flex items-center justify-center border-none shadow-none text-light-extra dark:text-white/60 dark:bg-white/10 hover:bg-danger-transparent hover:text-danger"
            to="#"
            shape="circle"
          >
            <UilTrashAlt className="text-[currentColor] dark:text-white/60 w-[14px] h-[14px]" />
          </Buttons>
        </div>
      ),
    });
  });

  const [state, setState] = useState({
    dataSource: usersTableData,
  });

  const { dataSource } = state;

  function SortableItem(value: Value) {
    const item = value.value;
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <tr className="ant-table-row" ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <td className="ant-table-cell drag-visible w-8">
          <UilExpandArrows className="inline-block w-4 h-4 text-light dark:text-white/60" />
        </td>
        <td className="ant-table-cell">{item.user}</td>
        <td className="ant-table-cell">{item.email}</td>
        <td className="ant-table-cell">{item.company}</td>
        <td className="ant-table-cell">{item.position}</td>
        <td className="ant-table-cell">{item.joinDate}</td>
        <td className="ant-table-cell">{item.action}</td>
      </tr>
    );
  }

  function handleDragEnd(event:any) {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      const activeIndex = dataSource.findIndex((item:{key:string}) => item.key === active.id.key);
      const overIndex = dataSource.findIndex((item:{key:string}) => item.key === over.id.key);
      const newData = arrayMove(dataSource, activeIndex, overIndex);

      setState({ ...state, dataSource: newData });
    }
  }

  return (
    <>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="bg-white dark:bg-white/10 m-0 p-0 mb-[25px] rounded-10 relative">
          <div className="py-[16px] px-[25px] text-dark dark:text-white/[.87] font-medium text-[17px] border-regular dark:border-white/10 border-b">
            <Heading as="h4" className="mb-0 text-lg font-medium">
              Drag & Drop
            </Heading>
          </div>
          <div className="p-[25px]">
            <div className="table-responsive table-head-none hover-tr-none table-border-b-none table-pl-0 dark:[&>div>div>div>div>div>div>table>tbody>tr>td]:border-white/10">
              <div className="ant-table-wrapper">
                <div className="ant-table">
                  <div className="ant-table-container">
                    <div className="ant-table-content">
                      <table>
                        <tbody className="ant-table-tbody">
                          <SortableContext items={dataSource} strategy={rectSortingStrategy}>
                            {dataSource.map((value:Item, index:number) => (
                              <SortableItem key={index} index={index} value={value} />
                            ))}
                          </SortableContext>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DndContext>
    </>
  );
}

export default DragAndDropTable;
