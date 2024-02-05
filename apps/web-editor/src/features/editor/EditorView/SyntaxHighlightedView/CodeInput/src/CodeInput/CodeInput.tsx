import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
} from 'react';
import styles from './styles.module.css';
import { CodeInputProps } from '../types';
import { handleEnterKey, handleTabKey } from '../utils';

export const CodeInput: React.FC<CodeInputProps> = (props) => {

  const outerWrapperDivElement = useRef<HTMLDivElement>(null);
  const wrapperDivElement = useRef<HTMLDivElement>(null);
  const preElement = useRef<HTMLPreElement>(null);
  const textAreaElement = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {

    updateOuterWrapperDivBackgroundColor();

  }, []);

  useEffect(() => {

    // Commented because we want to stop the infinite resize loop
    // if (!textAreaElement.current)
    //   return;
    // new ResizeObserver(setElementSizes).observe(textAreaElement.current)

    setElementSizes();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    codeTokens();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.language]);

  function updateOuterWrapperDivBackgroundColor() {
    if (!outerWrapperDivElement.current || !preElement.current)
      return;

    const preElementBackgroundColor = window.getComputedStyle(preElement.current).backgroundColor;
    outerWrapperDivElement.current.style.backgroundColor = preElementBackgroundColor;
  }

  function setElementSizes() {

    console.log("setElementSizes: Running...");

    updateOuterWrapperDivBackgroundColor();

    // Basically... in the orignal code, the wrapper size depends on inner textarea size
    // Everything is derived from textarea
    // But! I want the textarea size to derive from outer outer outer div
    // So.... to hack it, I passed the div reference as props and calculated it on the fly

    // But... outer div size is also dependent on the inner children... so feedback loop and expands infinitely...

    if (textAreaElement.current && props.containerRef.current) {

      const { height, width } = getContainerSize();

      console.log("container size", { height, width })

      textAreaElement.current.style.width = `${width}px`;
      textAreaElement.current.style.height = `${height}px`;
    }


    if (preElement.current && wrapperDivElement.current && outerWrapperDivElement.current) {

      const { height, width } = getTextareaSize();

      preElement.current.style.width = `${width}px`;
      preElement.current.style.height = `${height}px`;
      wrapperDivElement.current.style.width = `${width}px`;
      wrapperDivElement.current.style.height = `${height}px`;

      // (GJ): Commented because not sure why this is needed?
      // calculate what 1rem is in pixels
      // const rem = parseFloat(
      //   window.getComputedStyle(document.documentElement).fontSize
      // );
      // outerWrapperDivElement.current.style.width = `${width + rem}px`;
      // outerWrapperDivElement.current.style.height = `${height + rem}px`;

      outerWrapperDivElement.current.style.width = `${width}px`;
      outerWrapperDivElement.current.style.height = `${height}px`;
    }
  }

  function getTextareaSize() {
    if (textAreaElement.current) {
      const { height, width } = textAreaElement.current.getBoundingClientRect();
      return { height, width };
    }
    return {
      height: 0,
      width: 0,
    };
  }

  function getContainerSize() {
    if (props.containerRef.current) {
      const { height, width } = props.containerRef.current.getBoundingClientRect();
      return { height, width };
    }

    return {
      height: 0,
      width: 0,
    };
  }

  function syncScroll() {
    if (preElement.current === null || textAreaElement.current === null) return;

    preElement.current.scrollTop = textAreaElement.current.scrollTop;
    preElement.current.scrollLeft = textAreaElement.current.scrollLeft;

    // Prevents a scrolling issue when the user manually resizes the wrapper
    if (textAreaElement.current.scrollTop > preElement.current.scrollTop) {
      textAreaElement.current.scrollTop = preElement.current.scrollTop;
    }

    if (textAreaElement.current.scrollLeft > preElement.current.scrollLeft) {
      textAreaElement.current.scrollLeft = preElement.current.scrollLeft;
    }
  }

  const codeTokens = () => {

    try {
      if (props.prismJS.languages[props.language]) {

        const tokens = props.prismJS.highlight(
          props.value,
          props.prismJS.languages[props.language],
          props.language
        );

        return tokens;

      } else {

        return props.prismJS.util.encode(props.value).toString();
      }

    } catch (e) {
      console.error(e);
    }
  };

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    let input_element = textAreaElement.current!;
    let code = input_element.value;
    if (event.key === 'Tab') {
      handleTabKey(event, input_element, code);
      props.onChange(input_element.value);
    }
    if (event.key === 'Enter') {
      handleEnterKey(event, input_element);
      props.onChange(input_element.value);
    }
  }

  async function handleInput(e: ChangeEvent<HTMLTextAreaElement>) {
    props.onChange((e.target as HTMLTextAreaElement).value);
  }


  return (
    <div
      ref={outerWrapperDivElement}

      style={{
        // padding: '1rem', // FOUND THE UNWANTED PADDING
        boxSizing: `border-box`,
      }}

      className={styles['outer-wrapper']}
    >
      <div
        ref={wrapperDivElement}

        className={styles.wrap}
      >
        <textarea
          ref={textAreaElement}

          className="resize-none"
          spellCheck={false}

          onKeyDown={handleKeyDown}
          onInput={handleInput}
          onScroll={syncScroll}

          // An attempt to replace the ResizeObserver
          // onResize={() => setElementSizes()}

          placeholder={props.placeholder}
          value={props.value}
        ></textarea>

        <pre
          ref={preElement!}
          className={`language-${props.language}`}
          aria-hidden={true}
        >
          <div
            dangerouslySetInnerHTML={{ __html: codeTokens() || '' }}
            className="code-highlighted"
          />
        </pre>
      </div>
    </div>
  );
};

export default CodeInput;
