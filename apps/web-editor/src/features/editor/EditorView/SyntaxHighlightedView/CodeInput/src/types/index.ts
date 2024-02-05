import Prism from 'prismjs';

export type CodeInputProps = {
  prismJS: typeof Prism;
  value: string;
  language: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoHeight?: boolean;

  // containerRef: React.RefObject<HTMLDivElement>
  containerSize: { height: string, width: string }
};
