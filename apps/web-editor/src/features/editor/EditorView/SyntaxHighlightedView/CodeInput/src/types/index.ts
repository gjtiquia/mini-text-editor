import Prism from 'prismjs';

export type CodeInputProps = {
  prismJS: typeof Prism;
  value: string;
  language: string;
  onChange: (value: string) => void;
  placeholder?: string;

  containerRef: React.RefObject<HTMLDivElement>
};
