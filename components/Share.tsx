import { Colors } from 'config/colors';
import {
  FaFacebook as FacebookIcon,
  FaLinkedinIn as LinkedinIcon,
} from 'react-icons/fa';
import { IoLogoTwitter as TwitterIcon } from 'react-icons/io';
import { SiGmail as EmailIcon, SiReddit as RedditIcon } from 'react-icons/si';
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
} from 'react-share';

interface ShareProps {
  title: string;
  url: string;
}

export default function Share(props: ShareProps): React.ReactElement {
  const { title, url } = props;

  return (
    <div className='flex items-center justify-start pt-2'>
      <div className='flex w-44 items-center justify-between'>
        <TwitterShareButton title={title} url={url}>
          <div className={`opacity-50 hover:opacity-70`}>
            <TwitterIcon size={22} />
          </div>
        </TwitterShareButton>

        <RedditShareButton title={title} url={url}>
          <div className={`opacity-50 hover:opacity-70`}>
            <RedditIcon size={22} />
          </div>
        </RedditShareButton>
        <FacebookShareButton title={title} url={url}>
          <div className={`opacity-50 hover:opacity-70`}>
            <FacebookIcon size={22} />
          </div>
        </FacebookShareButton>
        <LinkedinShareButton title={title} url={url}>
          <div className={`opacity-50 hover:opacity-70`}>
            <LinkedinIcon size={22} />
          </div>
        </LinkedinShareButton>
        <EmailShareButton title={title} url={url}>
          <div className={`opacity-50 hover:opacity-70`}>
            <EmailIcon size={22} />
          </div>
        </EmailShareButton>
      </div>
    </div>
  );
}
