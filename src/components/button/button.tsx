import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, FC } from 'react';
import classNames from 'classnames';

export type ButtonSize = 'large' | 'medium' | 'small' | 'mini';
export type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'link';

// 接受参数
interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  type?: ButtonType;
  children: React.ReactNode; // 插槽内容
  href?: string;
}

// 按钮和链接事件参数接口和 ButtonProps 合并
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

export const Button: FC<ButtonProps> = (props) => {
  const { type, className, disabled, size, children, href, ...restProps } = props;

  // classNames useage is on https://github.com/JedWatson/classnames
  // 根据传入 props 组织样式
  const classes = classNames('btn', className, {
    // 传入的 key 值是动态的则用[]包起来
    [`btn-${type}`]: type,
    [`btn-${size}`]: size,
    disabled: disabled,
  });

  if (type === 'link' && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  } else {
    return (
      <Button className={classes} disabled={disabled} {...restProps}>
        {children}
      </Button>
    );
  }
};

// TODO: 重新看一遍视频，展示按钮组件
Button.defaultProps = {
  disabled: false,
  type: 'default',
};

export default Button;
