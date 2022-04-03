import React from 'react';
import classNames from 'classnames';
import { HasAlign, HasComponent } from '../../types';
import { ANDROID, IOS, PlatformType } from '../../lib/platform';
import { AdaptivityProps, SizeType } from '../AdaptivityProvider/AdaptivityContext';
import Tappable, { TappableProps } from '../Tappable/Tappable';
import Text from '../Typography/Text/Text';
import Headline from '../Typography/Headline/Headline';
import Title from '../Typography/Title/Title';
import Subhead from '../Typography/Subhead/Subhead';
import Caption from '../Typography/Caption/Caption';
import Spinner from '../Spinner/Spinner';
import { usePlatform } from '../../hooks/usePlatform';
import { withAdaptivity } from '../../hoc/withAdaptivity';
import { ConfigProviderContext } from '../ConfigProvider/ConfigProviderContext';
import './Button.css';

export interface TXUIButtonProps extends HasAlign {
  mode?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "outline"
    | "commerce"
    | "destructive"
    | "overlay_primary"
    | "overlay_secondary"
    | "overlay_outline"
  appearance?: "accent" | "positive" | "negative" | "neutral" | "overlay",
  size?: "s" | "m" | "l",
  stretched?: boolean,
  before?: React.ReactNode,
  after?: React.ReactNode,
  loading?: boolean
}

export interface ButtonProps
  extends Omit<TappableProps, 'size'>,
    TXUIButtonProps {}

interface ButtonTypographyProps extends HasComponent {
  size: ButtonProps['size'];
  platform?: PlatformType;
  sizeY: AdaptivityProps['sizeY'];
  children?: ButtonProps['children'];
  className?: React.HTMLAttributes<HTMLElement>['className']
}

const ButtonTypography: React.FC<ButtonTypographyProps> = (
  props: ButtonTypographyProps
) => {
  const { size, sizeY, platform, ...restProps } = props;
  const isCompact = sizeY === SizeType.COMPACT;

  switch (size) {
    case 'l':
      if (isCompact) {
        return <Text weight='medium' {...restProps} />;
      }

      if (platform === ANDROID) {
        return <Headline weight='medium' {...restProps} />;
      }

      return <Title level='3' weight='2' {...restProps} />;
    case 'm':
      if (isCompact) {
        return <Subhead weight='2' {...restProps} />;
      }

      return <Text weight='medium' {...restProps} />;
    case 's':
    default:
      if (platform === IOS) {
        return <Subhead weight='2' {...restProps} />;
      }

      if (isCompact) {
        return <Caption weight='medium' level='1' {...restProps} />;
      }

      return <Subhead weight='2' {...restProps} />;
  }
};

interface ResolvedButtonAppearance {
  resolvedAppearance: ButtonProps['appearance'];
  resolvedMode: ButtonProps['mode'];
}

function resolveButtonAppearance(
  appearance: ButtonProps['appearance'],
  mode: ButtonProps['mode']
): ResolvedButtonAppearance {
  let resolvedAppearance: ButtonProps['appearance'] = appearance;
  let resolvedMode: ButtonProps['mode'] = mode;

  if (appearance === undefined) {
    switch (mode) {
      case 'tertiary':
      case 'secondary':
      case 'primary':
      case 'outline':
        resolvedAppearance = 'accent';
        break;
      case 'commerce':
        resolvedAppearance = 'positive';
        resolvedMode = 'primary';
        break;
      case 'destructive':
        resolvedAppearance = 'negative';
        resolvedMode = 'primary';
        break;
      case 'overlay_primary':
        resolvedAppearance = 'overlay';
        resolvedMode = 'primary';
        break;
      case 'overlay_secondary':
        resolvedAppearance = 'overlay';
        resolvedMode = 'secondary';
        break;
      case 'overlay_outline':
        resolvedAppearance = 'overlay';
        resolvedMode = 'outline';
        break;
    }
  }

  return {
    resolvedAppearance,
    resolvedMode
  }
}


const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const {
    size,
    mode,
    appearance,
    stretched,
    align,
    children,
    before,
    after,
    getRootRef,
    sizeY,
    Component = 'button',
    loading,
    onClick,
    ...restProps
  } = props;

  const platform = usePlatform();
  const hasIcons = Boolean(before || after);
  const { resolvedAppearance, resolvedMode } = resolveButtonAppearance(
    appearance,
    mode
  );
  const hasNewTokens = React.useContext(ConfigProviderContext).hasNewTokens;

  return (
    <Tappable
      {...restProps}
      Component={restProps.href ? 'a' : Component}
      onClick={loading ? undefined : onClick}
      focusVisibleMode='outside'
      className={classNames(
        'Button',
        `Button--sz-${size}`,
        `Button--lvl-${resolvedMode}`,
        `Button--clr-${resolvedAppearance}`,
        `Button--align-${align}`,
        `Button-sizeY-${sizeY}`,
        {
          ['Button-stretched']: stretched,
          ['Button-with-icon']: hasIcons,
          ['Button-singleIcon']: Boolean(
            (!children && !after && before) || (!children && after && !before)
          )
        }
      )}
      getRootRef={getRootRef}
      hoverMode={hasNewTokens ? 'Button--hover' : 'background'}
      activeMode={hasNewTokens ? 'Button--active' : 'opacity'}
    >
      {loading && <Spinner size='small' className='Button__spinner' />}
      <span className='Button__in'>
        {before && <span className='Button__before'>{before}</span>}
        {children && (
          <ButtonTypography
            size={size}
            sizeY={sizeY}
            platform={platform}
            className='Button__content'
            Component='span'
          >
            {children}
          </ButtonTypography>
        )}
        {after && <span className='Button__after'>{after}</span>}
      </span>
    </Tappable>
  )
};

Button.defaultProps = {
  mode: 'primary',
  align: 'center',
  size: 's',
  stretched: false,
  stopPropagation: true
}

export default withAdaptivity(Button, {
  sizeY: true
});
