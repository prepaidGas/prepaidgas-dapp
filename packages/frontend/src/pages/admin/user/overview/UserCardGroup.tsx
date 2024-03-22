import Link from 'next/link';
import { Progress } from 'antd';
import { UilEllipsisH } from '@iconscout/react-unicons';
import Heading from '@/components/heading';
import DropDown from '@/components/dropdown';

interface UserCardGroupProps {
  user: {
    title: string;
    company: string;
    img: string[];
    icon: string;
    content: string;
  }
}

function UserCardGroup({ user }:UserCardGroupProps) {
  const { title, company, img, icon, content } = user;
  return (
    <>
      <div className="card user-card theme-grid-3">
        <div className="bg-white dark:bg-white/10 p-[25px] rounded-[10px]">
          <div className="card__top">
            <div className="user-card__img">
              <img src={`/hexadash-nextjs/${icon}`} alt="" />
            </div>
            <div className="user-card__info">
              <Heading className="card__name" as="h6">
                <Link className="name-text" href="#">
                  {title}
                </Link>
                <p className="card__designation">{company}</p>
              </Heading>
              <DropDown
                content={
                  <>
                    <Link href="#">View</Link>
                    <Link href="#">Edit</Link>
                    <Link href="#">Leave</Link>
                    <Link href="#">Delete</Link>
                  </>
                }
              >
                <Link className="action-more" href="#">
                  <UilEllipsisH />
                </Link>
              </DropDown>
            </div>
          </div>
          <div className="card__content">
            <p>{content}</p>
            <div className="image-group">
              {img.map((item:string, key:number) => {
                return <img key={key + 1} src={`/hexadash-nextjs/${item}`} alt="" />;
              })}
            </div>
          </div>
          <div className="card__info">
            <p className="info-line">
              <span>Current project</span>
              <span>Project Completed</span>
            </p>
            <h2 className="info-line">
              <span>Plugin Development</span>
              <span className="success" style={{ background: 'none !important' }}>
                45
              </span>
            </h2>
            <div className="project-progress">
              <Progress
                percent={70}
                strokeWidth={5}
                status="active"
                showInfo={false}
                className="progress-dt progress-primary"
              />
              <div className="progress-percentage">
                <span>70%</span>
              </div>
            </div>
            <p className="completed-count">12 / 15 tasks completed</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserCardGroup;
