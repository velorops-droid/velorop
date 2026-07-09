import { ImgHTMLAttributes } from 'react';

export function VelorOpsLogo(props: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img 
      src="/logo.png" 
      alt="VelorOps Logo" 
      {...props}
      className={`drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] dark:drop-shadow-none ${props.className || ''}`}
      style={{ objectFit: 'contain', ...props.style }}
    />
  );
}
