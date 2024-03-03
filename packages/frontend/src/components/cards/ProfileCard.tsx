import Link from 'next/link';
import FontAwesome from 'react-fontawesome';

function ProfileCard( image:string, bgImage:string, title:string, tag:string ) {
  return (
    <figure className="w-full min-h-[360px] bg-white dark:bg-white/10 text-center rounded-10 shadow-[0px_5px_20px_rgba(160, 160, 160, 0.02)] mb-0">
      <figcaption>
        <img className="static w-full" src={require(`../../${bgImage}`)} alt="banner" />
        <div className="pb-[30px] mt-[-75px]">
          <div className="mb-[10px]">
            <img
              className="p-[5px] rounded-full max-w-[110px] bg-white dark:bg-white/10 inline-block"
              src={require(`../../${image}`)}
              alt="profile"
            />
          </div>
          <h4 className="text-[18px] font-semibold mb-[2px] text-dark dark:text-white/[.87]">{title}</h4>
          <p className="mb-[18px] text-light dark:text-white/60">{tag}</p>
          <ul className="flex items-center justify-center gap-[5px]">
            <li className="text-facebook">
              <Link
                className="flex items-center justify-center w-[32px] h-[32px] rounded-6 leading-[1] bg-facebook"
                href="#"
              >
                <FontAwesome className="text-[16px] text-white" name="facebook" />
              </Link>
            </li>
            <li className="text-twitter">
              <Link
                className="flex items-center justify-center w-[32px] h-[32px] rounded-6 leading-[1] bg-twitter"
                href="#"
              >
                <FontAwesome className="text-[16px] text-white" name="twitter" />
              </Link>
            </li>
            <li className="text-dribbble">
              <Link
                className="flex items-center justify-center w-[32px] h-[32px] rounded-6 leading-[1] bg-dribbble"
                href="#"
              >
                <FontAwesome className="text-[16px] text-white" name="dribbble" />
              </Link>
            </li>
          </ul>
        </div>
      </figcaption>
    </figure>
  );
}

ProfileCard.defaultProps = {
  image: 'static/img/users/1.png',
  bgImage: 'static/img/banner/BG.png',
  title: 'Robert Clinton',
  tag: 'Best Seller of the last month',
};

export default ProfileCard;
