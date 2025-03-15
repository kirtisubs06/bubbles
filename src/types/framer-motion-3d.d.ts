
declare module 'framer-motion-3d' {
  import { ForwardRefComponent } from 'framer-motion';
  import { Group, Mesh, Object3D } from 'three';

  export interface MotionGroupProps {
    animate?: any;
    initial?: any;
    exit?: any;
    transition?: any;
    variants?: any;
    whileHover?: any;
    whileTap?: any;
    whileDrag?: any;
    whileFocus?: any;
    onHoverStart?: () => void;
    onHoverEnd?: () => void;
    onTap?: () => void;
    onTapStart?: () => void;
    onTapCancel?: () => void;
    onDrag?: () => void;
    onDragStart?: () => void;
    onDragEnd?: () => void;
    onClick?: () => void;
    onPointerDown?: () => void;
    onPointerUp?: () => void;
    children?: React.ReactNode;
    [key: string]: any;
  }

  export const motion: {
    group: ForwardRefComponent<Group, MotionGroupProps>;
    mesh: ForwardRefComponent<Mesh, any>;
    pointLight: ForwardRefComponent<Object3D, any>;
    directionalLight: ForwardRefComponent<Object3D, any>;
    spotLight: ForwardRefComponent<Object3D, any>;
    ambientLight: ForwardRefComponent<Object3D, any>;
    perspectiveCamera: ForwardRefComponent<Object3D, any>;
    orthographicCamera: ForwardRefComponent<Object3D, any>;
  };
}
