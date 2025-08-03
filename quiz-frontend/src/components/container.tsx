import { cn } from '@/lib/utils';
import React from 'react'

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

export default function Container({children, className}: ContainerProps) {
  return (
    <div className={cn('w-[90%] mx-auto', className)}>{children}</div>
  )
}
