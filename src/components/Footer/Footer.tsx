import { SocialLinks } from './styles';
import { FlexBlock } from '../../styles';

export const Footer = () => {

  return (
    <FlexBlock $justifyContent='center'>
        <SocialLinks>
          <a
            href="https://twitter.com/Aldrin_Labs"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src='/socials/twitter.svg' />
          </a>
          <a
              href="https://t.me/rincels"
              target="_blank"
              rel="noopener noreferrer"
          >
            <img src='/socials/telegram.svg' />
          </a>
          <a
            href="https://discord.gg/4VZyNxT2WU"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src='/socials/discord.svg' />
          </a>
        </SocialLinks>
    </FlexBlock>
  );
};
