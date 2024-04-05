import React from 'react'
import Link from 'next/link'
import {
    UilEllipsisH,
    UilEye,
    UilEdit,
    UilTrashAlt,
} from '@iconscout/react-unicons'
import FontAwesome from 'react-fontawesome'
import DropDown from '@/components/dropdown'
import socialMediaLinks from '@/demoData/socialMediaLinks.json'

interface User {
    user: {
        name: string
        designation: string
        img: string
    };
    actions?: React.ReactNode; 
}

function TeamCard({ user }: User) {
    const { name, designation, img } = user

    const moreContent = [
      {
          key: '1',
          label: (
              <Link
                  className="group flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary px-3 py-1.5 text-sm gap-[10px] [&>svg]:w-[14px] [&>svg]:h-[14px] [&>svg]:text-light-extra dark:[&>svg]:text-white/60"
                  href="#"
              >
                  <UilEye className="group-hover:text-primary" />
                  View
              </Link>
          ),
      },
      {
          key: '2',
          label: (
              <Link
                  className="group flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary px-3 py-1.5 text-sm gap-[10px] [&>svg]:w-[14px] [&>svg]:h-[14px] [&>svg]:text-light-extra dark:[&>svg]:text-white/60"
                  href="#"
              >
                  <UilEdit className="group-hover:text-primary" />
                  Edit
              </Link>
          ),
      },
      {
          key: '3',
          label: (
              <Link
                  className="group flex items-center text-theme-gray dark:text-white/60 hover:bg-primary-transparent hover:text-primary px-3 py-1.5 text-sm gap-[10px] [&>svg]:w-[14px] [&>svg]:h-[14px] [&>svg]:text-light-extra dark:[&>svg]:text-white/60"
                  href="#"
              >
                  <UilTrashAlt className="group-hover:text-primary" />
                  Delete
              </Link>
          ),
      },
    ]

    return (
        <>
            <div className="relative bg-white dark:bg-white/10 p-[25px] rounded-[10px] shadow-[0_5px_20px_rgba(173,181,217,0.01)] text-center">
                <figure className="mb-0">
                    <img
                        className="mb-[20px] w-full rounded-full max-w-[150px] inline-block"
                        src={`/hexadash-nextjs/${img}`}
                        alt=""
                    />
                    <figcaption>
                        <div className="absolute py-1 dark:bg-transparent ltr:right-[24px] rtl:left-[24px] top-[20px] leading-[0.5] rounded-10 text-light-extra dark:text-white/60">
                            <DropDown customContent={moreContent}>
                                <Link
                                    className="text-light-extra dark:text-white/60"
                                    href="#"
                                    onClick={(e: React.MouseEvent) => e.preventDefault()}
                                >
                                    <UilEllipsisH className="w-[20px] h-[20px] " />
                                </Link>
                            </DropDown>
                        </div>
                        <h6 className="text-[16px] mb-6px font-medium text-dark dark:text-white/60">
                            <Link className="text-current" href="#">
                                {name}
                            </Link>
                        </h6>
                        <span className="text-[13px] mb-[25px] text-light dark:text-white/60">
                            {designation}
                        </span>
                        <div className="flex flex-wrap items-center justify-center mt-[16px] gap-[10px]">
                            {socialMediaLinks.map((link) => (
                                <a
                                    key={link.id}
                                    className={`w-[38px] h-[38px] rounded-full inline-flex items-center justify-center bg-white dark:bg-white/10 shadow-[0_10px_20px_rgba(116,116,116,0.08)] btn-icon text-${link.icon}`}
                                    href={`https://${link.name.toLowerCase()}.com`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FontAwesome
                                        className="text-current"
                                        name={link.icon}
                                    />
                                </a>
                            ))}
                        </div>
                    </figcaption>
                </figure>
            </div>
        </>
    )
}

export default TeamCard
